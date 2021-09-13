<?php

namespace App\Http\Requests\User;

use App\Http\Requests\FormRequest;
use App\Models\User\Preference;
use Illuminate\Validation\Rule;

class PreferenceRequest extends FormRequest
{
    protected $model = Preference::class;

    public function rulesPost()
    {
        return [
            'preference_type' => [
                'required_without_all:height,age',
                Rule::in(['BodyType', 'Child', 'Diet', 'Drink', 'Education', 'Employment', 'Ethnicity', 'Gender', 'Language',
                    'Pet', 'Politics', 'Relationship', 'Religion', 'Sign', 'Smoke']),
            ],

            'preference_ids' => [
                'sometimes',
                'present',
                'array'
            ],

            'height' => [
                'required_without_all:preference_ids,age,preference_type',
                'array'
            ],
            'height.*.min' => [
                'min:145',
                'max:200'
            ],
            'height.*.max' => [
                'min:145',
                'max:200'
            ],

            'age' => [
                'required_without_all:preference_ids,height,preference_type',
                'array'
            ],
            'age.*.min' => [
                'min:18',
                'max:99'
            ],
            'age.*.max' => [
                'min:18',
                'max:99'
            ],
        ];
    }
}
