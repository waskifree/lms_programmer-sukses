<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use App\Models\Like;


class Content extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = [
        'title',
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
            ->generateSlugsFrom('title')      // dari kolom title
            ->saveSlugsTo('slug')             // simpan ke kolom slug
            ->usingLanguage('id')             // bahasa Indonesia
            ->allowDuplicateSlugs()           // boleh duplikat (opsional)
            ->usingSeparator('-');
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
}