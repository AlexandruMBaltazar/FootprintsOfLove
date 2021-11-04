<?php

namespace App\Http\Controllers\Session;

use App\Events\Session\MessageCreated;
use App\Http\Requests\Session\MessageRequest;
use App\Http\Resources\Session\MessageResource;
use App\Models\Session;
use App\Models\Session\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param Session $session
     * @return MessageResource
     */
    public function __invoke(MessageRequest $request, Session $session): MessageResource
    {
        $this->authorize('create', [Message::class, $session]);

        $message = Message::create([
            'user_id' => Auth::id(),
            'session_id' => $session->id,
            'message' => $request->input('message')
        ]);

        broadcast(new MessageCreated($message))->toOthers();

        return new MessageResource($message);
    }
}
