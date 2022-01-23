<?php

namespace App\Http\Resources\User\Preference;

use Illuminate\Http\Resources\Json\JsonResource;

class DistanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'value' => $this->distance,
            'is_important' => $this->is_important
        ];
    }
}
