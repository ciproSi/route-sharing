<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Route;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['title',
                           'author'
                           ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}
