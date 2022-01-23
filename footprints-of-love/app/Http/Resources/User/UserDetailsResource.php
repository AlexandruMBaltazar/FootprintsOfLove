<?php

namespace App\Http\Resources\User;

use App\Http\Resources\LocationResource;
use App\Http\Resources\User\Detail\DetailResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailsResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'body_type' => new DetailResource($this->bodyType),
            'child' => new DetailResource($this->child),
            'diet' => new DetailResource($this->diet),
            'drink' => new DetailResource($this->drink),
            'education' => new DetailResource($this->education),
            'employment' => new DetailResource($this->employment),
            'ethnicity' => new DetailResource($this->ethnicity),
            'gender' => new DetailResource($this->gender),
            'height' => $this->height,
            'language' => new DetailResource($this->language),
            'pet' => new DetailResource($this->pet),
            'politics' => new DetailResource($this->politics),
            'relationship' => new DetailResource($this->relationship),
            'religion' => new DetailResource($this->religion),
            'sign' => new DetailResource($this->sign),
            'smoke' => new DetailResource($this->smoke),
            'location' => new LocationResource($this->user->location),
            'dob' => $this->dob,
            'age' => $this->age,
        ];
    }
}
