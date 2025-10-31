<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class PingController extends Controller
{
    public function ping()
    {
        return response()->json(['message' => 'pong']);
    }
    public function AuthPing()
    {
        return response()->json(['message' => 'Auth pong']);
    }
}
