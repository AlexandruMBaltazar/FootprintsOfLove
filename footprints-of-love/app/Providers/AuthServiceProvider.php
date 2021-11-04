<?php

namespace App\Providers;

use App\Models\Photo;
use App\Models\Session\Message;
use App\Models\User;
use App\Models\User\UserDetail;
use App\Models\User\Preference;
use App\Policies\PhotoPolicy;
use App\Policies\Session\MessagePolicy;
use App\Policies\User\PreferencePolicy;
use App\Policies\User\UserDetailsPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        UserDetail::class => UserDetailsPolicy::class,
        User::class => UserPolicy::class,
        Photo::class => PhotoPolicy::class,
        Preference::class => PreferencePolicy::class,
        Message::class => MessagePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
