<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'preferenceable_id'
    ];

    public function preferenceable(): MorphTo
    {
        return $this->morphTo();
    }
}
