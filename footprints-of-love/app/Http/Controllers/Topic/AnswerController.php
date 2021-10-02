<?php

namespace App\Http\Controllers\Topic;

use App\Http\Controllers\Controller;
use App\Http\Requests\Topic\AnswerRequest;
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
     * @param AnswerRequest $request
     * @param Topic $topic
     * @return AnswerResource
     */
    public function __invoke(AnswerRequest $request, Topic $topic): AnswerResource
    {
        $answer = $topic->answers()->updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'user_id' => Auth::id(),
                'value' => $request->input('value'),
            ]
        );

        return new AnswerResource($answer);
    }
}
