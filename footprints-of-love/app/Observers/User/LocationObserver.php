<?php

namespace App\Observers\User;

use App\Models\User\Location;
use Illuminate\Support\Facades\Auth;

class LocationObserver
{
    /**
     * Handle the Location "created" event.
     *
     * @param  \App\Models\User\Location  $location
     * @return void
     */
    public function created(Location $location)
    {
        //
    }

    /**
     * Handle the Location "updated" event.
     *
     * @param  \App\Models\User\Location  $location
     * @return void
     */
    public function updated(Location $location)
    {
        //
    }

    /**
     * Handle the Location "deleted" event.
     *
     * @param  \App\Models\User\Location  $location
     * @return void
     */
    public function deleted(Location $location)
    {
        //When the user location is deleted, delete the distance preference as well
        Auth::user()->distancePreference->delete();
    }

    /**
     * Handle the Location "restored" event.
     *
     * @param  \App\Models\User\Location  $location
     * @return void
     */
    public function restored(Location $location)
    {
        //
    }

    /**
     * Handle the Location "force deleted" event.
     *
     * @param  \App\Models\User\Location  $location
     * @return void
     */
    public function forceDeleted(Location $location)
    {
        //
    }
}
