<?php

namespace App\Http\Controllers;

use App\Http\Resources\SessionResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function __invoke(): AnonymousResourceCollection
    {
        $sessions = Auth::user()->sessions()->with('sessionUser.profilePhoto', 'latestMessage')
            ->orderByDesc('updated_at')
            ->get();

        return SessionResource::collection($sessions);
    }
}
