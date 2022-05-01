<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'profile_photo' => new PhotoResource($this->photos()->where('is_profile_photo', true)->first()),
            'age' => $this->detail ? $this->detail->age : null,
            'boarding_completed' => $this->boarding_completed,
        ];
    }
}
