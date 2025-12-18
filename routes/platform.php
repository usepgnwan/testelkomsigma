<?php
use App\Http\Controllers\User;
use App\Http\Controllers\Genre;
use App\Http\Controllers\Movies;
Route::prefix('platform')->group(function () {
    Route::get('data-user', [User::class, 'create'])->name('userget');
    Route::get('data-user/{user}', [User::class, 'show'])->name('usergetid'); 
    Route::post('data-user', [User::class, 'store'])->name('userstore');
    Route::put('data-user/{user}', [User::class, 'update'])->name('userupdate');
    Route::delete('data-user/{user}', [User::class, 'delete'])->name('userdelete');
    
    Route::get('data-genre', [Genre::class, 'create'])->name('genre');
    Route::post('data-genre', [Genre::class, 'store'])->name('genresyn');

    Route::get('data-movies', [Movies::class, 'create'])->name('movies');
    Route::post('data-movies', [Movies::class, 'store'])->name('moviessyn');
    
});