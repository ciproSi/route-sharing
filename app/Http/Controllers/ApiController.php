<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{
    public function userDetail($id)
    {
        $user_id = $id;
        $user = User::findOrFail($user_id);

        $dogs = $user->dogs;

        return [
            'user' => $user,
            'dogs' => $dogs,
        ];
    }

    public function dog($id, Request $request)
    {
        

        //$user = User::findOrFail($id);
        
        //$user->dogs()->create($request->all());
        return response(compact('request'), 200)
        ->header('Content-Type', 'application/json');
    }
}