<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Support\Str;


class Movies extends Model
{
    protected $guarded = ["id"];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movies) {
            $movies->slug = static::generateUniqueSlug($movies->title);
        });

        static::updating(function ($movies) {
            $movies->slug = static::generateUniqueSlug($movies->title, $movies->id);
        });
    }
 
    protected static function generateUniqueSlug($title, $ignoreId = null)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;

        $count = 1;
        while (static::where('slug', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_movies','movie_id','genre_id');
    }
}
