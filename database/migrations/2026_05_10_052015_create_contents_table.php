<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('contents', function (Blueprint $table) {
        $table->id();
        
        $table->string('title');
        $table->text('description')->nullable();
        $table->longText('paragraph')->nullable();
        $table->string('image')->nullable();
        $table->string('video_url')->nullable();        // kalau ada embed video
        
        $table->foreignId('content_id')
              ->constrained()
              ->onDelete('cascade');
        
        $table->foreignId('created_by')
              ->constrained('users')
              ->onDelete('cascade');
        
        $table->string('type');                         // video, text, quiz, pdf
        $table->boolean('is_published')->default(false);
        $table->integer('order')->default(0);
        $table->integer('likes')->default(0);
        
        $table->timestamps();
        
        // Index untuk performa
        $table->index(['content_id', 'order']);
    
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
