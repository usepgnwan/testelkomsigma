<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $guarded = ["id"];
    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'genre_movies');
    }
}
