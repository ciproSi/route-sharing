<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    public function view ()
    {
        $activities = Activity::get();

        return response(compact('activities'), 200)
                  ->header('Content-Type', 'application/json');
    }
}
