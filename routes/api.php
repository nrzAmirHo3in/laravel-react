<?php

use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return ['message' => 'pong'];
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/auth/ping', function () {
        return ['message' => 'Auth Pong'];
    });
});