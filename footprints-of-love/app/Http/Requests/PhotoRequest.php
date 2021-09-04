<?php

namespace App\Http\Requests;

use App\Http\Requests\FormRequest;
use App\Models\Photo;

class PhotoRequest extends FormRequest
{
    protected $model = Photo::class;

    public function rulesPost()
    {
        return [
            'photo' => [
                'mimes:jpg,png',
            ],
        ];
    }

}
