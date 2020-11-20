<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Route;

class Activity extends Model
{
    use HasFactory;

    public function routes ()
    {
        return $this->belongsToMany(Route::class);
    }
}
