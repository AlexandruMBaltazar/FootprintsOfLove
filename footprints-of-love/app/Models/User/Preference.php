<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'preferenceable_id'
    ];

    public function getIsImportant()
    {
        return $this->user->importances
            ->where('preferenceable_type', $this->preferenceable_type)->first()->is_important;
    }

    public function preferenceable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
