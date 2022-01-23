<?php

namespace App\Providers;

use Geocoder\Geocoder;
use Geocoder\Provider\TomTom\TomTom;
use Geocoder\StatefulGeocoder;
use Http\Adapter\Guzzle7\Client;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Geocoder::class, function ($app) {
            $httpClient = new Client();
            $provider = new TomTom($httpClient, env('TOMTOM_API_KEY'));
            return new StatefulGeocoder($provider);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
