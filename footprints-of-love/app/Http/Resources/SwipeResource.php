<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SwipeResource extends JsonResource
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
            'target_user' => new UserResource($this->targetUser),
            'liked' => $this->liked,
            'matched' => $this->match()->exists()
        ];
    }
}
