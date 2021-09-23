<?php

namespace App\Filters\User;

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class FilterByNonImportantPreferences
{

    protected User $filteredUser;
    protected User $user;
    protected int $total = 0;

    public function __construct(User $user)
    {
        $this->filteredUser = $user;
        $this->user = Auth::user()->load(['preferencesImportance', 'heightPreference', 'agePreference']);
    }

    public function meetsThreshold()
    {
        $preferences = $this->getNonImportantPreferences($this->user);
        $isHeightImportant = $this->user->heightPreference->is_important;
        $isAgeImportant = $this->user->agePreference->is_important;

        $percentageWorth = 100 / (count($preferences) + (!$isHeightImportant ? 1 : 0) + (!$isAgeImportant ? 1 : 0));

        $preferences
            ->when(Arr::exists($preferences, User\Detail\BodyType::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->body_type_id ,$preferences[User\Detail\BodyType::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Child::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->child_id ,$preferences[User\Detail\Child::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Diet::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->diet_id ,$preferences[User\Detail\Diet::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Drink::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->drink_id ,$preferences[User\Detail\Drink::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Education::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->education_id ,$preferences[User\Detail\Education::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Employment::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->employment_id ,$preferences[User\Detail\Employment::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Ethnicity::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->ethnicity_id ,$preferences[User\Detail\Ethnicity::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Language::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->language_id ,$preferences[User\Detail\Language::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Pet::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->pet_id ,$preferences[User\Detail\Pet::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Politics::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->politics_id ,$preferences[User\Detail\Politics::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Relationship::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->relationship_id ,$preferences[User\Detail\Relationship::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Religion::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->religion_id ,$preferences[User\Detail\Religion::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Sign::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->sign_id ,$preferences[User\Detail\Sign::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(Arr::exists($preferences, User\Detail\Smoke::class), function ($preferences) use ($percentageWorth) {
                $this->total += in_array($this->filteredUser->detail->smoke_id ,$preferences[User\Detail\Smoke::class]->all()) ? $percentageWorth : 0;
                return $preferences;
            })
            ->when(!$isHeightImportant, function ($preferences) use ($percentageWorth) {
                if ($this->filteredUser->height >=  $this->user->heightPreference->min
                    && $this->filteredUser->height <=  $this->user->heightPreference->max) {
                    $this->total += $percentageWorth;
                }
                return $preferences;
            })
            ->when(!$isAgeImportant, function ($preferences) use ($percentageWorth) {
                if ($this->filteredUser->age >=  $this->user->agePreference->min
                    && $this->filteredUser->age <=  $this->user->agePreference->max) {
                    $this->total += $percentageWorth;
                }
                return $preferences;
            });


        return $this->total > User\Preference\Importance::THRESHOLD;
    }

    private function getNonImportantPreferences(User $user): Collection
    {
        $preferences = $user->preferencesImportance
            ->where('is_important', false);

        return $preferences->mapToGroups(function ($preference) {
            return [
                $preference['preferenceable_type'] => $preference['preferenceable_id'],
            ];
        });
    }
}
