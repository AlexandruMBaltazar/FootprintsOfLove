<?php

namespace App\Observers;

use App\Models\Matches;
use App\Models\Session;
use App\Models\Swipe;
use App\Notifications\SwipeLike;

class SwipeObserver
{
    /**
     * Handle the Swipe "created" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function created(Swipe $swipe)
    {
        //
    }

    /**
     * Handle the Swipe "created" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function saved(Swipe $swipe)
    {
        $otherSwipe = Swipe::query()->where([
            'user_id' => $swipe->target_user_id,
            'target_user_id' => $swipe->user_id,
            'liked' => true
        ])->first();

        if ($swipe->liked) {
            if ($otherSwipe) {
                //Create a match
                $swipe->match()->create();
                $otherSwipe->match()->create();

                //Create a session for the matched users
                $session = Session::create();
                $swipe->user->sessions()->attach($session->id);
                $otherSwipe->user->sessions()->attach($session->id);
            } else {
                $swipe->load('user.profilePhoto', 'targetUser');
                $swipe->targetUser->notify(new SwipeLike($swipe));
            }
        }
    }

    /**
     * Handle the Swipe "updated" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function updated(Swipe $swipe)
    {
        //
    }

    /**
     * Handle the Swipe "deleted" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function deleted(Swipe $swipe)
    {
        //
    }

    /**
     * Handle the Swipe "restored" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function restored(Swipe $swipe)
    {
        //
    }

    /**
     * Handle the Swipe "force deleted" event.
     *
     * @param  \App\Models\Swipe  $swipe
     * @return void
     */
    public function forceDeleted(Swipe $swipe)
    {
        //
    }
}
