<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Location extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'city',
        'country',
        'lat',
        'long',
    ];

    public function scopeIsWithinMaxDistance($query) {
        Auth::user()->load('distancePreference', 'location');

        if (Auth::user()->distancePreference && Auth::user()->location) {
            $latitude = Auth::user()->location->lat;
            $longitude = Auth::user()->location->long;
            $distance = Auth::user()->distancePreference->distance;

            $haversine = "(6371 * acos(cos(radians($latitude))
                     * cos(radians(locations.lat))
                     * cos(radians(locations.long)
                     - radians($longitude))
                     + sin(radians($latitude))
                     * sin(radians(locations.lat))))";
            return $query
                ->whereRaw("{$haversine} < ?", [$distance]);
        }

        return $query;
    }
}
