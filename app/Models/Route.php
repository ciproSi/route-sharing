<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Activity;
use App\Models\Image;
use App\Models\User;
use App\Models\Review;
class Route extends Model
{
    use HasFactory;

    public function activities ()
    {
        return $this->belongsToMany(Activity::class);
    }

    public function images ()
    {
        return $this->hasMany(Image::class);
    }

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews ()
    {
        return $this->hasMany(Review::class);
    }
}
