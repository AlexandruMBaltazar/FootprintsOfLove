<?php

namespace App\Http\Requests\Topic;

use App\Http\Requests\FormRequest;
use App\Models\Topic\Answer;

class AnswerRequest extends FormRequest
{
    protected $model = Answer::class;

    public function rulesPost()
    {
        return [
            'value' => [
                'sometimes',
                'string',
                'max:65535',
                'nullable'
            ],
        ];
    }
}
