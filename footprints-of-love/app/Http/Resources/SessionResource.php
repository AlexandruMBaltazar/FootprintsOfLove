<?php

namespace App\Http\Resources;

use App\Http\Resources\Session\MessageResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
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
            'id' => $this->id,
            'profile_photo' => new PhotoResource($this->sessionUser->first()->profilePhoto),
            'latest_message' => new MessageResource($this->latestMessage),
            'first_name' => $this->sessionUser->first()->first_name
        ];
    }
}
