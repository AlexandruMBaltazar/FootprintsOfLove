<?php

namespace App\Observers;

use App\Models\Matches;
use App\Models\Swipe;

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
        $otherSwipe = Swipe::query()->where([
            'user_id' => $swipe->target_user_id,
            'target_user_id' => $swipe->user_id,
            'liked' => true
        ])->first();

        if ($swipe->liked && $otherSwipe) {
            $swipe->match()->create();
            $otherSwipe->match()->create();
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
        Matches::query()->where('swipe_id', $swipe->id)->delete();
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
