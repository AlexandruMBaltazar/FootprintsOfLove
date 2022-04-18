<?php

namespace App\Http\Controllers;

use App\Http\Resources\SessionResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function __invoke(): AnonymousResourceCollection
    {
        $sessions = Auth::user()->sessions()
            ->whereDoesntHave('sessionUser.blockedBy', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->whereDoesntHave('sessionUser.blockedAccounts', function ($query) {
                $query->where('blocked_user_id', Auth::id());
            })
            ->with('sessionUser.profilePhoto', 'latestMessage')
            ->orderByDesc('updated_at')
            ->simplePaginate(9);

        return SessionResource::collection($sessions);
    }
}
