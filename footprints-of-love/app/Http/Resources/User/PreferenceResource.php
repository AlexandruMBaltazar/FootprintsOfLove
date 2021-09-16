<?php

namespace App\Http\Resources\User;

use App\Http\Resources\User\Detail\DetailResource;
use App\Http\Resources\User\Preference\VariablePreferenceResource;
use App\Http\Resources\UserResource;
use App\Models\User\Detail\BodyType;
use App\Models\User\Detail\Child;
use App\Models\User\Detail\Diet;
use App\Models\User\Detail\Drink;
use App\Models\User\Detail\Education;
use App\Models\User\Detail\Employment;
use App\Models\User\Detail\Ethnicity;
use App\Models\User\Detail\Gender;
use App\Models\User\Detail\Language;
use App\Models\User\Detail\Pet;
use App\Models\User\Detail\Politics;
use App\Models\User\Detail\Relationship;
use App\Models\User\Detail\Religion;
use App\Models\User\Detail\Sign;
use App\Models\User\Detail\Smoke;
use Illuminate\Http\Resources\Json\JsonResource;

class PreferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user' => new UserResource($request->user()),
            'body_type' => [
                'values' => DetailResource::collection($this->ofType(BodyType::class)),
                'is_important' => $this->ofImportanceType(BodyType::class)
            ],
            'child' => [
                'values' => DetailResource::collection($this->ofType(Child::class)),
                'is_important' => $this->ofImportanceType(Child::class)
            ],
            'diet' => [
                'values' => DetailResource::collection($this->ofType(Diet::class)),
                'is_important' => $this->ofImportanceType(Diet::class)
            ],
            'drink' => [
                'values' => DetailResource::collection($this->ofType(Drink::class)),
                'is_important' => $this->ofImportanceType(Drink::class)
            ],
            'education' => [
                'values' => DetailResource::collection($this->ofType(Education::class)),
                'is_important' => $this->ofImportanceType(Education::class)
            ],
            'employment' => [
                'values' => DetailResource::collection($this->ofType(Employment::class)),
                'is_important' => $this->ofImportanceType(Employment::class)
            ],
            'ethnicity' => [
                'values' => DetailResource::collection($this->ofType(Ethnicity::class)),
                'is_important' => $this->ofImportanceType(Ethnicity::class)
            ],
            'gender' => [
                'values' => DetailResource::collection($this->ofType(Gender::class)),
                'is_important' => $this->ofImportanceType(Gender::class)
            ],
            'language' => [
                'values' => DetailResource::collection($this->ofType(Language::class)),
                'is_important' => $this->ofImportanceType(Language::class)
            ],
            'pet' => [
                'values' => DetailResource::collection($this->ofType(Pet::class)),
                'is_important' => $this->ofImportanceType(Pet::class)
            ],
            'politics' => [
                'values' => DetailResource::collection($this->ofType(Politics::class)),
                'is_important' => $this->ofImportanceType(Politics::class)
            ],
            'relationship' => [
                'values' => DetailResource::collection($this->ofType(Relationship::class)),
                'is_important' => $this->ofImportanceType(Relationship::class)
            ],
            'religion' => [
                'values' => DetailResource::collection($this->ofType(Religion::class)),
                'is_important' => $this->ofImportanceType(Religion::class)
            ],
            'sign' => [
                'values' => DetailResource::collection($this->ofType(Sign::class)),
                'is_important' => $this->ofImportanceType(Sign::class)
            ],
            'smoke' => [
                'values' => DetailResource::collection($this->ofType(Smoke::class)),
                'is_important' => $this->ofImportanceType(Smoke::class)
            ],
            'age' => new VariablePreferenceResource($request->user()->agePreference),
            'height' => new VariablePreferenceResource($request->user()->heightPreference),
        ];
    }

    private function ofType(string $type)
    {
        return $this->where('preferenceable_type', $type)->pluck('preferenceable');
    }

    private function ofImportanceType(string $type): bool
    {
        if ($preference = $this->where('preferenceable_type', $type)->first()) {
            return $preference->getIsImportant();
        }

        return false;
    }
}
