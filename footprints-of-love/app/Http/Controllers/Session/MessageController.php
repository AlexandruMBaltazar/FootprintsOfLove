<?php

namespace App\Http\Controllers\Session;

use App\Events\Session\MessageCreated as MessageCreatedEvent;
use App\Http\Requests\Session\MessageRequest;
use App\Http\Resources\Session\MessageResource;
use App\Models\Session;
use App\Notifications\Session\Message as MessageNotification;
use App\Models\Session\Message;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;
use const http\Client\Curl\AUTH_ANY;


class MessageController extends Controller
{
    public function index(Session $session): AnonymousResourceCollection
    {
        $this->authorize('create', [Message::class, $session]);

        $messages = $session->messages;

        return MessageResource::collection($messages);
    }

    /**
     * Store incoming message and broadcast it.
     *
     * @param MessageRequest $request
     * @param Session $session
     * @return MessageResource
     * @throws AuthorizationException
     */
    public function store(MessageRequest $request, Session $session): MessageResource
    {
        $this->authorize('create', [Message::class, $session]);

        $message = Message::create([
            'user_id' => Auth::id(),
            'session_id' => $session->id,
            'message' => $request->input('message')
        ]);

        $session->update([
            'updated_at' => Carbon::now()->toDateTimeString()
        ]);

        $user = $session->users()->where('users.id', '!=', Auth::id())->first();
        $user->notify(new MessageNotification($message));

        return new MessageResource($message);
    }
}
