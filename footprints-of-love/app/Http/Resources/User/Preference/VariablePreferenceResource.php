<?php

namespace App\Http\Resources\User\Preference;

use Illuminate\Http\Resources\Json\JsonResource;

class VariablePreferenceResource extends JsonResource
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
            'min' => $this->min,
            'max' => $this->max
        ];
    }
}
