<?php

namespace App\Models\User\Preference;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Importance extends Model
{
    use HasFactory;

    public const THRESHOLD = 50;

    protected $fillable = [
        'user_id',
        'preferenceable_type',
        'is_important'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_important' => 'boolean',
    ];
}
