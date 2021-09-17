<?php

namespace App\Models;

use App\Models\User\AgePreference;
use App\Models\User\HeightPreference;
use App\Models\User\Preference;
use App\Models\User\Preference\Importance;
use App\Models\User\UserDetail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'boarding_completed',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'boarding_completed' => 'boolean',
    ];

    public function detail(): HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }

    public function preferences(): HasMany
    {
        return $this->hasMany(Preference::class);
    }

    public function heightPreference(): HasOne
    {
        return $this->hasOne(HeightPreference::class);
    }

    public function agePreference(): HasOne
    {
        return $this->hasOne(AgePreference::class);
    }

    public function importances(): HasMany
    {
        return $this->hasMany(Importance::class);
    }

    public function preferencesImportance(): HasMany
    {
        return $this->hasMany(Preference::class)
            ->join('importances', function ($join) {
                $join->on('preferences.user_id', 'importances.user_id');
                $join->on('preferences.preferenceable_type', 'importances.preferenceable_type');
            });
    }
}
