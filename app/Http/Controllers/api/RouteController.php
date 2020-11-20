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
        
        // parsing gpx file to get length and cumulative elevation
        $gpx = new phpGPX();
        $file = $gpx->load('./storage/gpx/' . $name_to_be_saved);
        $stats = $file->tracks[0]->stats->toArray();

        // saving the route to db
        $route = new Route;
        $route->name = $route_name;
        $route->url = $name_to_be_saved;
        $route->length = $stats['distance'];
        $route->elevation_gain = $stats['cumulativeElevationGain'];
        $route->save();
        $route_id = $route->id;

        return response(compact('path','stats', 'route_id'), 200)
                  ->header('Content-Type', 'application/json');
        
    }
    
    public function view ($id)
    {
        
        $route = Route::findOrFail($id);

        return response(compact('route'), 200)
                  ->header('Content-Type', 'application/json');
    }

    public function getAll ()
    {
        $routes = Route::get();

        return response(compact('routes'), 200)
                  ->header('Content-Type', 'application/json');

    }
    
    // API called to update existing route - gpx file, elevation and distance can't be updated here!
    public function update ($id, Request $request)
    {
        
        // TO DO: validation needs to be finished!
        $this->validate($request, [
            'difficulty' => 'required | numeric | min:1 | max: 5',
            'description' => 'string',
            'routeImage' => 'required | mimes:jpeg,bmp,png,jpg'
        ]);

        //TO DO: image uploads needs to be finished - resizing
        //save route img on server
        $path = $request->file('routeImage')->store('public/users-images');

        // save path to image to db, source is to determine if the image was uploaded by author or by somebody writing review of route
        $image = new Image;
        $image->img_url = $path;
        $image->route_id = $id;
        $image->source = 'author';
        $image->save();
        
        $route = Route::findOrFail($id);
        $route->description = $request->input('description');
        $route->visibility = $request->input('visibility');
        $route->difficulty = $request->input('difficulty');

        // $route->images()->saveMany([
        //     new Image(['img_url' => $path, 'source' => 'author']),
        // ]);

        $route->save();

        // we are getting activities as json encoded array, we need to decode it first to pass it then directly do sync()
        $activities = json_decode($request->input('activities'));
        $route->activities()->sync($activities);

        //save route img
        $path = $request->file('routeImage')->store('public/users-images');

        return response(compact('route', 'activities', 'path'), 200)
                  ->header('Content-Type', 'application/json');
    }

}
