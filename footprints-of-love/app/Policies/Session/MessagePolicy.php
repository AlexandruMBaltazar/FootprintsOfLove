<?php

namespace App\Policies\Session;

use App\Models\Session;
use App\Models\Session\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user, Session $session)
    {
        return $session->users()->where('users.id', $user->id)->exists();
    }

}
