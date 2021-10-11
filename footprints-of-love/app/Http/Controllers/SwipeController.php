<?php

namespace App\Http\Controllers;

use App\Models\Swipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SwipeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        Auth::user()->swipes()->create([
            'target_user_id' => $request->input('target_user_id'),
            'liked' => $request->input('liked')
        ]);

        return response()->json(['message' => 'Swiped'], 200);
    }
}
