<?php

use App\Models\Session;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('sessions.{session}', function ($user, Session $session) {
    if ($session->users()->where('users.id', $user->id)->exists()) {
        return [
          'id' => $user->id,
          'first_name' => $user->first_name,
        ];
    }

    return false;
});

Broadcast::channel('Video.Channel.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('agora-online-channel', function ($user) {
    return ['id' => $user->id, 'name' => $user->first_name];
});
