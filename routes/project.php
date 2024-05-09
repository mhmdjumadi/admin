<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::resource('/projects', App\Http\Controllers\ProjectController::class);
});