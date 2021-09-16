<?php

namespace App\Traits\Search;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait UserDetails
{
    public function scopeSearch(Builder $query): Builder
    {
        $user = Auth::user()->load('preferences');

        return $query
            ->whereIn('gender_id', $this->getPreference(User\Detail\Gender::class, $user))
            ->whereIn('body_type_id', $this->getPreference(User\Detail\BodyType::class, $user));
//            ->whereIn('child_id', $this->getPreference(User\Detail\Child::class, $user));
//            ->orWhereIn('diet_id', $this->getPreference(User\Detail\Diet::class, $user))
//            ->orWhereIn('drink_id', $this->getPreference(User\Detail\Drink::class, $user))
//            ->orWhereIn('education_id', $this->getPreference(User\Detail\Education::class, $user))
//            ->orWhereIn('employment_id', $this->getPreference(User\Detail\Employment::class, $user))
//            ->orWhereIn('ethnicity_id', $this->getPreference(User\Detail\Ethnicity::class, $user))
//            ->orWhereIn('language_id', $this->getPreference(User\Detail\Language::class, $user))
//            ->orWhereIn('pet_id', $this->getPreference(User\Detail\Pet::class, $user))
//            ->orWhereIn('politics_id', $this->getPreference(User\Detail\Politics::class, $user))
//            ->orWhereIn('relationship_id', $this->getPreference(User\Detail\Relationship::class, $user))
//            ->orWhereIn('religion_id', $this->getPreference(User\Detail\Religion::class, $user))
//            ->orWhereIn('sign_id', $this->getPreference(User\Detail\Sign::class, $user))
//            ->orWhereIn('smoke_id', $this->getPreference(User\Detail\Smoke::class, $user));
    }

    private function getPreference(string $type, User $user): array
    {
        return $user->preferences->where('preferenceable_type', $type)->pluck('preferenceable_id')->toArray();
    }
}
