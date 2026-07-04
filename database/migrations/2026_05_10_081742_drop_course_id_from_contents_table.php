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
        Schema::table('contents', function (Blueprint $table) {
             // hapus foreign key dulu kalau ada
            $table->dropForeign(['content_id']);

            // lalu hapus kolom
            $table->dropColumn('content_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
          Schema::table('contents', function (Blueprint $table) {
            $table->unsignedBigInteger('content_id')->nullable();
        });
    }
};
