<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Dog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'breed'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
