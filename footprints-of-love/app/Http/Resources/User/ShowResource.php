<?php

namespace App\Http\Resources\User;

use App\Http\Resources\PhotoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'age' => $this->detail->age,
            'profile_photo' => new PhotoResource($this->photos()->where('is_profile_photo', true)->first()),
            'is_liked' => $this->isLiked(),
            'is_matched' => $this->isMatched(),
            'session_id' => $this->sessions->first() !== null ? $this->sessions->first()->id : null
        ];
    }
}
