<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Review;
use App\Models\Water;
use App\Models\Image;
use App\Models\Surface;
use App\Models\Sport;
use App\Models\PointOfInterest;

class Route extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function waters()
    {
        return $this->hasMany(Image::class);
    }

    public function sports()
    {
        return $this->belongsToMany(Sport::class);
    }

    public function surfaces()
    {
        return $this->belongsToMany(Surface::class);
    }
}
