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
            'body_type' => DetailResource::collection($this->ofType(BodyType::class)),
            'child' => DetailResource::collection($this->ofType(Child::class)),
            'diet' => DetailResource::collection($this->ofType(Diet::class)),
            'drink' => DetailResource::collection($this->ofType(Drink::class)),
            'education' => DetailResource::collection($this->ofType(Education::class)),
            'employment' => DetailResource::collection($this->ofType(Employment::class)),
            'ethnicity' => DetailResource::collection($this->ofType(Ethnicity::class)),
            'gender' => DetailResource::collection($this->ofType(Gender::class)),
            'language' => DetailResource::collection($this->ofType(Language::class)),
            'pet' => DetailResource::collection($this->ofType(Pet::class)),
            'politics' => DetailResource::collection($this->ofType(Politics::class)),
            'relationship' => DetailResource::collection($this->ofType(Relationship::class)),
            'religion' => DetailResource::collection($this->ofType(Religion::class)),
            'sign' => DetailResource::collection($this->ofType(Sign::class)),
            'smoke' => DetailResource::collection($this->ofType(Smoke::class)),
            'age' => new VariablePreferenceResource($request->user()->agePreference),
            'height' => new VariablePreferenceResource($request->user()->heightPreference),
        ];
    }

    private function ofType(string $type)
    {
        return $this->where('preferenceable_type', $type)->pluck('preferenceable');
    }
}
