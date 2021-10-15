<?php

namespace App\Http\Requests;

use App\Models\Swipe;
use App\Http\Requests\FormRequest;

class SwipeRequest extends FormRequest
{
    protected $model = Swipe::class;

    public function rulesPost()
    {
        return [
            'target_user_id' => [
                'required',
                'exists:users,id',
            ],
            'liked' => [
                'required',
                'boolean'
            ]
        ];
    }
}
