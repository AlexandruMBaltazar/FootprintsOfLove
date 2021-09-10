<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

interface HasPreferences
{
    public function preferences(): MorphMany;
}
