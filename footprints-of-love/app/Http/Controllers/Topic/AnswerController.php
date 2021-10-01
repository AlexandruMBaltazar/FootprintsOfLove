<?php

namespace App\Http\Controllers\Topic;

use App\Http\Controllers\Controller;
use App\Http\Resources\Topic\AnswerResource;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AnswerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param Topic $topic
     * @return AnswerResource
     */
    public function __invoke(Request $request, Topic $topic)
    {
        $answer = $topic->answers()->updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'user_id' => Auth::id(),
                'value' => $request->input('value'),
            ]
        );

        $answer->load('user', 'topic');

        return new AnswerResource($answer);
    }
}
