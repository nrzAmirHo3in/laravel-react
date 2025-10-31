<?php

use App\Http\Controllers\API\PingController;
use Illuminate\Support\Facades\Route;

Route::get('/ping', [PingController::class, 'ping']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/auth/ping', [PingController::class, 'AuthPing']);
});
