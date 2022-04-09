<?php

namespace App\Http\Requests;

use App\Http\Requests\FormRequest;
use App\Models\BlockedAccount;

class BlockAccountRequest extends FormRequest
{
    protected $model = BlockedAccount::class;

    public function rulesPost()
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
            ],
        ];
    }
}
