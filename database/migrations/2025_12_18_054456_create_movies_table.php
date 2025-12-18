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
        Schema::create('movies', function (Blueprint $table) {
            $table->id(); 
            $table->string('title');
            $table->string('slug');
            $table->string('category')->nullable();
            $table->string('original_title')->nullable();
            $table->string('original_language', 5)->nullable();
            $table->text('overview')->nullable(); 
            $table->boolean('adult')->default(false); 
            $table->string('backdrop_path')->nullable();
            $table->string('poster_path')->nullable();  
            $table->float('popularity')->default(0); 
            $table->date('release_date')->nullable(); 
            $table->boolean('video')->default(false); 
            $table->float('vote_average')->default(0);
            $table->integer('vote_count')->default(0); 
            $table->timestamp("date_sycn");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
