<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;

class Category extends Model
{
    use HasFactory;
    use HasSlug;
    protected $fillable = ['name', 'slug'];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')      // dari kolom name
            ->saveSlugsTo('slug')             // simpan ke kolom slug
            ->usingLanguage('id')             // bahasa Indonesia
            ->allowDuplicateSlugs()           // boleh duplikat (opsional)
            ->usingSeparator('-')
            ->doNotGenerateSlugsOnUpdate();
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
