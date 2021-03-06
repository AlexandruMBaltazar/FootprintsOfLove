<?php

namespace App\Models;

use App\Models\Topic\Answer;
use App\Models\User\AgePreference;
use App\Models\User\DistancePreference;
use App\Models\User\HeightPreference;
use App\Models\User\Location;
use App\Models\User\Preference;
use App\Models\User\Preference\Importance;
use App\Models\User\UserDetail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
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

    public function isSwiped()
    {
        return Auth::user()->swipes()
            ->where('target_user_id', $this->id)
            ->exists();
    }

    public function isLiked()
    {
        if ($this->isSwiped()) {
            return Auth::user()->swipes()
                ->where('target_user_id', $this->id)
                ->where('liked', true)
                ->exists();
        }

        return null;
    }

    public function isMatched()
    {
        return !Auth::user()->matches->pluck('swipe')->where('target_user_id', $this->id)->isEmpty();
    }

    public function isBlocked()
    {
        return Auth::user()->blockedAccounts()->where('blocked_user_id', $this->id)->exists();
    }

    //Scopes
    public function scopeLikes($query, $type)
    {
        match ($type) {
            "likedUsers" => $query->whereHas('targetSwipes', function ($query) {
                return $query
                    ->doesntHave('match')
                    ->where('user_id', Auth::id())
                    ->where('liked', true);
            }),
            "dislikedUsers" => $query->whereHas('targetSwipes', function ($query) {
                return $query
                    ->doesntHave('match')
                    ->where('user_id', Auth::id())
                    ->where('liked', false);
            }),
            default => $query->orderBy(Swipe::select('created_at')
                ->whereColumn('users.id', 'swipes.user_id')->where('target_user_id', Auth::id()), 'desc')
                ->whereHas('swipes', function ($query) {
                return $query
                    ->doesntHave('match')
                    ->where('target_user_id', Auth::id())
                    ->where('liked', true);
            })
        };
    }

    //Relationships
    public function blockedAccounts(): HasMany
    {
        return $this->hasMany(BlockedAccount::class);
    }

    public function blockedBy(): HasMany
    {
        return $this->hasMany(BlockedAccount::class, 'blocked_user_id');
    }

    public function detail(): HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }

    public function profilePhoto(): HasOne
    {
        return $this->hasOne(Photo::class)->where('is_profile_photo', true);
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

    public function distancePreference(): HasOne
    {
        return $this->hasOne(DistancePreference::class);
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

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    public function swipes(): HasMany
    {
        return $this->hasMany(Swipe::class, 'user_id');
    }

    public function targetSwipes(): HasMany
    {
        return $this->hasMany(Swipe::class, 'target_user_id');
    }

    public function matches(): HasManyThrough
    {
        return $this->hasManyThrough(Matches::class, Swipe::class, 'user_id', 'swipe_id', 'id', 'id');
    }

    public function sessions(): BelongsToMany
    {
        return $this->belongsToMany(Session::class);
    }

    public function location(): HasOne
    {
        return $this->hasOne(Location::class);
    }
}
