<?php

namespace App\Http\Controllers;

use App\Http\Requests\SwipeRequest;
use App\Http\Resources\SwipeResource;
use App\Models\Swipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SwipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SwipeRequest $request
     * @return SwipeResource
     */
    public function store(SwipeRequest $request): SwipeResource
    {
        $swipe = Auth::user()->swipes()->create([
            'target_user_id' => $request->input('target_user_id'),
            'liked' => $request->input('liked')
        ]);

        $swipe->load('user', 'targetUser', 'match');

        return new SwipeResource($swipe);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Swipe $swipe
     * @return Response
     */
    public function update(Request $request, Swipe $swipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Swipe $swipe
     * @return Response
     */
    public function destroy(Swipe $swipe)
    {
        //
    }
}
