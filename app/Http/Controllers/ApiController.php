<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Dog;
use Illuminate\Support\Facades\Storage;
use ImageHandler;

class ApiController extends Controller
{
    public function dogsApi($id)
    {
        $user_id = $id;
        $dogs = Dog::where('user_id', $user_id)->get();


        return [
            'dogs' => $dogs,
        ];
    }

    public function dog($id, Request $request)
    {

        $this->validate($request, [
            'name' => 'string | max: 100',
            'breed' => 'string | max: 100'
        ]);
        
        $name = $request->input('name');
        $breed = $request->input('breed');
        $image = $request->file('dogImage');  
        
        $img = ImageHandler::make($image->getRealPath());
        $img->orientate();
        $exif = $img->exif();
        $img->resize(1000, 1000, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        
        $img->save();
        
        // save picture to the disk
        $path = $img->store('public/users-images');
        
        $allowed_extensions = ['jpg', 'png', 'jpeg', 'bmp'];
        
        if ($request->hasFile('dogImage')) {
            
            // validation for images (file extension)

                $original_extension = $image->getClientOriginalExtension();
                
                if (in_array($original_extension, $allowed_extensions) === false) {
                    return response('Invalid file type.', 400)
                        ->header('Content-Type', 'application/json');
                }
            }

            // saving of images
                //$path = $image->store('public/users-images');
                
                $file_name = substr($path, 20, strlen($path) - 20);
                // Croppa::render(Croppa::url($path, 800, null));
            $dog = new Dog;
            $dog->user_id = $id;
            $dog->name = $name;
            $dog->breed = $breed;
            $dog->image = $file_name;
            $dog->save();

            return response(compact('name', 'breed', 'file_name'), 200)
                  ->header('Content-Type', 'application/json');


    }

    public function profilePicture($id, Request $request)
    {
        $image = $request->file('userPhoto'); 

        $img = ImageHandler::make($image->getRealPath());
        $img->orientate();
        $exif = $img->exif();
        $img->resize(1000, 1000, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        
        $img->save();

        $path = $img->store('public/users-images');
        
        $allowed_extensions = ['jpg', 'png', 'jpeg', 'bmp'];
        
        if ($request->hasFile('dogImage')) {
            
            // validation for images (file extension)

                $original_extension = $image->getClientOriginalExtension();
                
                if (in_array($original_extension, $allowed_extensions) === false) {
                    return response('Invalid file type.', 400)
                        ->header('Content-Type', 'application/json');
                }
            }
        $file_name = substr($path, 20, strlen($path) - 20);

        $user = User::where('user_id', $id)->get();
        $user->photo = $file_name;
        $user->save();
    }
}