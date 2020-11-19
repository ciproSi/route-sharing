<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Route;

class Water extends Model
{
    use HasFactory;

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}
