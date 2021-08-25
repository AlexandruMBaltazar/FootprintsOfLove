<?php

namespace App\Policies\User;

use App\Models\User;
use App\Models\User\UserDetail;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserDetailsPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param UserDetail $userDetail
     * @return bool
     */
    public function update(User $user, UserDetail $userDetail): bool
    {
        return $user->id == $userDetail->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param  \App\Models\UserDetail  $userDetail
     * @return Response|bool
     */
    public function delete(User $user, UserDetail $userDetail)
    {
        //
    }
}
