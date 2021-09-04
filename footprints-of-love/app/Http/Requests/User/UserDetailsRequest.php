<?php

namespace App\Http\Requests\User;


use App\Http\Requests\FormRequest;
use App\Models\User\UserDetail;

class UserDetailsRequest extends FormRequest
{
    protected $model = UserDetail::class;

    public function rulesPost()
    {
        return [
            'body_type_id' => "sometimes|exists:body_types,id",
            'child_id' => "sometimes|exists:children,id",
            'diet_id' => "sometimes|exists:diets,id",
            'drink_id' => "sometimes|exists:drinks,id",
            'education_id' => "sometimes|exists:education,id",
            'employment_id' => "sometimes|exists:employments,id",
            'ethnicity_id' => "sometimes|exists:ethnicities,id",
            'gender_id' => "sometimes|exists:genders,id",
            'height' => "sometimes",
            'language_id' => "sometimes|exists:languages,id",
            'pet_id' => "sometimes|exists:pets,id",
            'politics_id' => "sometimes|exists:politics,id",
            'relationship_id' => "sometimes|exists:relationships,id",
            'religion_id' => "sometimes|exists:religions,id",
            'sign_id' => "sometimes|exists:signs,id",
            'smoke_id' => "sometimes|exists:smokes,id",
            'dob' => "required",
        ];
    }

    public function rulesPut()
    {
        return [
            'body_type_id' => "nullable|exists:body_types,id",
            'child_id' => "nullable|exists:children,id",
            'diet_id' => "nullable|exists:diets,id",
            'drink_id' => "nullable|exists:drinks,id",
            'education_id' => "nullable|exists:education,id",
            'employment_id' => "nullable|exists:employments,id",
            'ethnicity_id' => "nullable|exists:ethnicities,id",
            'gender_id' => "nullable|exists:genders,id",
            'height' => "nullable",
            'language_id' => "nullable|exists:languages,id",
            'pet_id' => "nullable|exists:pets,id",
            'politics_id' => "nullable|exists:politics,id",
            'relationship_id' => "nullable|exists:relationships,id",
            'religion_id' => "nullable|exists:signs,id",
            'sign_id' => "nullable|exists:smokes,id",
            'smoke_id' => "nullable|exists:smokes,id",
            'dob' => "sometimes",
        ];
    }
}
