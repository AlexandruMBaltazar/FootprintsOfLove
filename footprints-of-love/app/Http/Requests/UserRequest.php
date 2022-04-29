<?php

namespace App\Http\Requests;

use App\Http\Requests\FormRequest;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

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

            'email' => [
                'sometimes',
                'unique:users,email',
                'email'
            ],

            'password' => [
                'sometimes',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
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
