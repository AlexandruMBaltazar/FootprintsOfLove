<?php

namespace App\Traits\Search;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait UserDetails
{
    public function scopeSearchByImportantPreferences(Builder $query): Builder
    {
        $user = Auth::user()->load(['preferencesImportance', 'heightPreference', 'agePreference']);
        $importantPreferences = $this->getImportantPreferences($user)->toArray();

        return $query
            ->when(Arr::exists($importantPreferences, User\Detail\Gender::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('gender_id', $importantPreferences[User\Detail\Gender::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\BodyType::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('body_type_id', $importantPreferences[User\Detail\BodyType::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Child::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('child_id', $importantPreferences[User\Detail\Child::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Diet::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('diet_id', $importantPreferences[User\Detail\Diet::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Drink::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('drink_id', $importantPreferences[User\Detail\Drink::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Education::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('education_id', $importantPreferences[User\Detail\Education::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Employment::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('employment_id', $importantPreferences[User\Detail\Employment::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Ethnicity::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('ethnicity_id', $importantPreferences[User\Detail\Ethnicity::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Language::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('language_id', $importantPreferences[User\Detail\Language::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Pet::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('pet_id', $importantPreferences[User\Detail\Pet::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Politics::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('politics_id', $importantPreferences[User\Detail\Politics::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Relationship::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('relationship_id', $importantPreferences[User\Detail\Relationship::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Religion::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('religion_id', $importantPreferences[User\Detail\Religion::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Sign::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('sign_id', $importantPreferences[User\Detail\Sign::class]);
            })
            ->when(Arr::exists($importantPreferences, User\Detail\Smoke::class), function (Builder $query) use ($importantPreferences) {
                $query->whereIn('smoke_id', $importantPreferences[User\Detail\Smoke::class]);
            })
            ->when($user->heightPreference->is_important, function (Builder $query) use ($user) {
                $query->whereBetween('height', [$user->heightPreference->min, $user->heightPreference->max]);
            })
            ->when($user->agePreference->is_important, function (Builder $query) use ($user) {
                $query->whereBetween('age', [$user->agePreference->min, $user->agePreference->max]);
            });
    }

    private function getImportantPreferences(User $user)
    {
        $preferences = $user->preferencesImportance
            ->where('is_important', true);

        return $preferences->mapToGroups(function ($preference, $key) {
            return [$preference['preferenceable_type'] => $preference['preferenceable_id']];
        });
    }
}
