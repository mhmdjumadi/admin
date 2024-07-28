<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::resource('/projects', App\Http\Controllers\ProjectController::class);
    Route::get('api/projects', [App\Http\Controllers\ProjectController::class, 'indexAPI']);
});