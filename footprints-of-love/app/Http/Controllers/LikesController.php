<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\ShowResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LikesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        $users = User::likes($request->type)->with('detail')->simplePaginate(5);

        return ShowResource::collection($users);
    }
}
