<?php

namespace App\Http\Controllers\api;
use Illuminate\Support\Facades\Storage;
use phpGPX\phpGPX;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use phpGPX\Models\GpxFile;
use App\Models\Route;
use App\Models\Activity;
use App\Http\Controllers\Controller;
use App\Models\Image;
use ImageHandler;
class RouteController extends Controller
{
    
    public function create ()
    {
        return view('routes.create');
    }

    public function store (Request $request)
    {
        
        // TO DO: back end validation
        $this->validate($request, [
            'routeName' => 'required',
            'GPXFile' => 'required'
            
        ]);

        $route_name = $request->input('routeName');
        $original_extension = $request->file('GPXFile')->getClientOriginalExtension();

        //unique name of the gpx file based on time() and route name (url endoded) with original extension (which needs to be gpx)
        $name_to_be_saved = Str::slug($route_name) . '_' . microtime(true) . '.' . $original_extension;
        $path = $request->file('GPXFile')->storeAs('public/gpx', $name_to_be_saved);
        $gpx_file_url = './storage/gpx/' . $name_to_be_saved;

        // parsing gpx file to get length and cumulative elevation
        $gpx = new phpGPX();
        $file = $gpx->load($gpx_file_url);
        $stats = $file->tracks[0]->stats->toArray();

        // find the first trackpoint of the route
        $start_coordinates = $this->getStartCoordinates($gpx_file_url);

        // saving the route to db
        $route = new Route;
        $route->name = $route_name;
        $route->url = $name_to_be_saved;
        $route->lat = $start_coordinates[0];
        $route->lon = $start_coordinates[1];
        $route->length = $stats['distance'];
        $route->user_id = $request->input('userID');
        $route->elevation_gain = $stats['cumulativeElevationGain'];
        $route->save();
        $route_id = $route->id;

        return response(compact('path','stats', 'route_id'), 200)
                  ->header('Content-Type', 'application/json');
        
    }
    
    public function view ($id)
    {
        
        $route = Route::with(['images', 'activities', 'user'])->findOrFail($id);

        return response(compact('route'), 200)
                  ->header('Content-Type', 'application/json');
    }

    // this API endpoint expecting lon and lat coordinates in the query string as a center geopoint for searching the DB
    public function getAll (Request $request)
    {
        // get lon and lat values from query string
        $lon = $request->query('lon');
        $lat = $request->query('lat');
        $user = intval($request->query('usr')); 

        // the api return all routes if there is a all=true in query, or just specific user routes, if usr query is bigger then 0
        if ($request->query('all') == 'true') {
            $routes = Route::get();
        } else if ($user > 0 ) {
            $routes = Route::where('user_id', '=', $user)->get();
        } else {
            $routes = Route::
                        whereBetween('lat', [$lat - 0.5, $lat + 0.5])
                        ->whereBetween('lon', [$lon - 0.5, $lat + 0.5])
                        ->get();
        }

        return response(compact('routes', 'lon', 'lat', 'user'), 200)
                  ->header('Content-Type', 'application/json');

    }
    
    // API called to update existing route - gpx file, elevation and distance can't be updated here!
    public function update ($id, Request $request)
    {
        
        // TO DO: validation needs to be finished!
        $this->validate($request, [
            'difficulty' => 'required | numeric | min:1 | max: 5',
            'description' => 'string'
        ]);

        //TO DO: image uploads needs to be finished - resizing
        
        //save route imgs on server and filesname to DB
        $images = $request->file('routeImages');    
        $allowed_extensions = ['jpg', 'png', 'jpeg', 'bmp', 'JPG', 'PNG', 'BMP', 'JPEG'];
        
        if ($request->hasFile('routeImages')) {
            
            // validation for images (file extension)
            foreach ($images as $image) {
                $original_extension = $image->getClientOriginalExtension();
                
                if (in_array($original_extension, $allowed_extensions) === false) {
                    return response('Invalid file type.', 400)
                        ->header('Content-Type', 'application/json');
                }
            }

            // saving of images
            foreach ($images as $image) {
                
                // we resize the picture and we actually do it before the image is save to server
                // ImageHandle is just our own alias (see app.php) for intervention/image as we use Image model here
                $img = ImageHandler::make($image->getRealPath());
                
                //read exif data and orientate the image
                $img->orientate();

                // read exif data
                $exif = $img->exif();
                
                // resize the longer edge to max 1000, prevent upsize, constrain aspect ratio
                $img->resize(1000, 1000, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                
                $img->save();
                
                // save picture to the disk
                $path = $image->store('public/users-images');
                
                // extract just the file name from the path for DB purposes
                $file_name = substr($path, 20, strlen($path) - 20);

                $lon = '';
                $lat = '';
                
                // check if the image is geotagged, calculate the coordinates in decimal format and save them to lon, lat variables
                if (isset($exif['GPSLatitude']) && isset($exif['GPSLongitude'])) {
                    
                    $location =  $this->getPictureLocationFromExifData($exif['GPSLatitude'], $exif['GPSLongitude']);
                    $lon = $location[0];
                    $lat = $location[1];

                }
                
                $image = new Image;
                $image->img_url = $file_name;
                $image->route_id = $id;
                $image->lon = $lon;
                $image->lat = $lat;
                $image->source = 'author';
                $image->save();
            }
        }
        
        $route = Route::findOrFail($id);
        $route->description = $request->input('description');
        $route->visibility = $request->input('visibility');
        $route->difficulty = $request->input('difficulty');
        $route->save();

        // we are getting activities as json encoded array, we need to decode it first to pass it then directly do sync()
        $activities = json_decode($request->input('activities'));
        $route->activities()->sync($activities);

        return response(compact('route', 'activities', 'exif', 'lon', 'lat'), 200)
                  ->header('Content-Type', 'application/json');
    
    }

    private function getStartCoordinates($file_url)
    {
        $file_handle = fopen($file_url, 'r');
        $startCoordinates = [];

        do {
            $loop = true;
            $start_coordinates = [];
            $line = fgets($file_handle);
            
            $res = strpos($line, '<trkpt lat="');
            
            // stop the looping while we find first occurence of track point, save the lat and lon
            if ($res) {
                $lat = substr($line, strpos($line, 'lat') + 5, 9);
                $lon = substr($line, strpos($line, 'lon') + 5, 9);
                array_push($start_coordinates, $lat, $lon);          

                $loop = false;
            }

        } while ($loop);

        fclose($file_handle);
        return $start_coordinates;
    }

    private function getPictureLocationFromExifData($GPSLatitude, $GPSLongitude)
    {
            list($num, $dec) = explode('/', $GPSLatitude[0]); 
            $lat_d = $num / $dec;

            list($num, $dec) = explode('/', $GPSLatitude[1]); 
            $lat_m = $num / $dec;

            list($num, $dec) = explode('/', $GPSLatitude[2]); 
            $lat_s = $num / $dec;

            $lat = $lat_d + $lat_m / 60 + $lat_s / 3600;

            list($num, $dec) = explode('/', $GPSLongitude[0]);
            $lon_d = $num / $dec;

            list($num, $dec) = explode('/', $GPSLongitude[1]);
            $lon_m = $num / $dec;

            list($num, $dec) = explode('/', $GPSLongitude[2]);
            $lon_s = $num / $dec;

            $lon = $lon_d + $lon_m / 60 + $lon_s / 3600;

            return [$lon, $lat];

    }

}
