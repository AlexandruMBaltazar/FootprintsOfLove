<?php

namespace App\Http\Resources;

use App\Http\Resources\Topic\AnswerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            'name' => $this->name,
            'answer' => new AnswerResource($this->answers->first()),
        ];
    }
}
