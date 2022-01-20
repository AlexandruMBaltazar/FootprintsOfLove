<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Models\User\Location;
use Geocoder\Dumper\GeoArray;
use Geocoder\Geocoder;
use Geocoder\Query\GeocodeQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Geocoder $geocoder)
    {
        $result = $geocoder->geocodeQuery(GeocodeQuery::create(
            "$request->city, $request->country"
        ));

        $dumper = new GeoArray();
        $location = $dumper->dump($result->first());

        if (!array_key_exists('locality', $location['properties'])) {
            return response(['message' => 'We couldn’t find that location!']);
        }

        return response($dumper->dump($result->first()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return LocationResource
     */
    public function store(Request $request): LocationResource
    {
        $location = Auth::user()->location()->updateOrCreate(
            ['user_id' => Auth::id()],
            ['city' => $request->city, 'country' => $request->country, 'lat' => $request->lat, 'long' => $request->long]
        );

        return new LocationResource($location);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Location $location
     * @return LocationResource
     */
    public function destroy(Location $location): LocationResource
    {
        $location->delete();

        return new LocationResource($location);
    }
}
