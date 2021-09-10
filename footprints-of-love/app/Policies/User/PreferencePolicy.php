<?php

namespace App\Policies\User;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PreferencePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, User $preferenceUser)
    {
        return $user->id == $preferenceUser->id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user, User $preferenceUser)
    {
        return $user->id == $preferenceUser->id;
    }

}
