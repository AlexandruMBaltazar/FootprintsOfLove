<?php

namespace App\Models\User\Detail;

use App\Contracts\HasPreferences;
use App\Models\User\Preference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Diet extends Model implements HasPreferences
{
    use HasFactory;

    public function preferences(): MorphMany
    {
        return $this->morphMany(Preference::class, 'preferenceable');
    }
}
