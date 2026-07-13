<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;

class Content extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = [
        'title',
        'visibility',
        'description',
        'paragraph',
        'image',
        'created_by',
        'type',
        'is_published',
        'order',
        'likes',
        'slug'
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
        ->generateSlugsFrom('title')
        ->saveSlugsTo('slug');     // ← Ini yang diperbaiki
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    // Scope Visibility (perbaikan kecil)
    public function scopeVisibleTo($query, $viewer = null)
    {
        if (!$viewer) {
            return $query->where('visibility', 'public');
        }

        return $query->where(function ($q) use ($viewer) {
            $q->where('visibility', 'public')
              ->orWhere('created_by', $viewer->id)           // ← Diubah jadi created_by
              ->orWhere(function ($q) use ($viewer) {
                  $q->where('visibility', 'followers')
                    ->whereHas('user.followers', fn($f) => 
                        $f->where('follower_id', $viewer->id)
                    );
              });
        });
    }
}