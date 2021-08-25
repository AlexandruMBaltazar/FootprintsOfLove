<?php

namespace App\Http\Requests;

use App\Http\Requests\FormRequest;
use App\Models\User;

class UserRequest extends FormRequest
{
    protected $model = User::class;

    public function rulesPut()
    {
        return [
            'first_name' => [
                'sometimes',
                'string'
            ],

            'last_name' => [
                'sometimes',
                'string'
            ],

            'boarding_completed' => [
                'sometimes',
                'boolean'
            ],
        ];
    }
}
