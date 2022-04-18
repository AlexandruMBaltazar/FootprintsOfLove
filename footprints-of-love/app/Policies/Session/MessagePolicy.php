<?php

namespace App\Policies\Session;

use App\Models\Session;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

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
        return $session->users()->where('users.id', $user->id)->exists() &&
            $session->sessionUser()->whereDoesntHave('blockedBy', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->whereDoesntHave('blockedAccounts', function ($query) use ($user) {
                $query->where('blocked_user_id', $user->id);
            })->exists();
    }
}
