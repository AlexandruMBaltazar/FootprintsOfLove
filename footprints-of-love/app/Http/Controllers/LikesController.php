<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\ShowResource;
use App\Models\Swipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;


class LikesController extends Controller
{
    public function whoLikesYou(Request $request): AnonymousResourceCollection
    {
        $users = User::query()->whereHas('swipes', function ($query) {
            return $query
                ->doesntHave('match')
                ->where('target_user_id', Auth::id())
                ->where('liked', true);
        })->simplePaginate(5);

        return ShowResource::collection($users);
    }

    public function likedUsers(Request $request): AnonymousResourceCollection
    {
       $users = User::query()->whereHas('targetSwipes', function ($query) {
            return $query
                ->doesntHave('match')
                ->where('user_id', Auth::id())
                ->where('liked', true);
        })->simplePaginate(5);

        return ShowResource::collection($users);
    }

    public function dislikedUsers(Request $request): AnonymousResourceCollection
    {
        $users = User::query()->whereHas('targetSwipes', function ($query) {
            return $query
                ->doesntHave('match')
                ->where('user_id', Auth::id())
                ->where('liked', false);
        })->simplePaginate(5);

        return ShowResource::collection($users);
    }
}
