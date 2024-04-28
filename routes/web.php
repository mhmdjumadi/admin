<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/projects', [App\Http\Controllers\ProjectController::class, 'index'])->middleware(['auth', 'verified'])->name('project');
Route::get('/projects/{id}', [App\Http\Controllers\ProjectController::class, 'detail'])->middleware(['auth', 'verified'])->name('project.detail');
Route::delete('/projects/{id}', [App\Http\Controllers\ProjectController::class, 'delete'])->middleware(['auth', 'verified'])->name('project.delete');
Route::post('/projects', [App\Http\Controllers\ProjectController::class, 'store'])->middleware(['auth', 'verified'])->name('project.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
