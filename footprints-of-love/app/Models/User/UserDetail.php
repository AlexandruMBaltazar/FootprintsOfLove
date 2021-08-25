<?php

namespace App\Models\User;

use App\Models\User;
use App\Models\User\Detail\BodyType;
use App\Models\User\Detail\Child;
use App\Models\User\Detail\Diet;
use App\Models\User\Detail\Drink;
use App\Models\User\Detail\Education;
use App\Models\User\Detail\Employment;
use App\Models\User\Detail\Ethnicity;
use App\Models\User\Detail\Gender;
use App\Models\User\Detail\Language;
use App\Models\User\Detail\Pet;
use App\Models\User\Detail\Politics;
use App\Models\User\Detail\Relationship;
use App\Models\User\Detail\Religion;
use App\Models\User\Detail\Sign;
use App\Models\User\Detail\Smoke;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDetail extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body_type_id',
        'child_id',
        'diet_id',
        'drink_id',
        'education_id',
        'employment_id',
        'ethnicity_id',
        'gender_id',
        'height',
        'language_id',
        'pet_id',
        'politics_id',
        'relationship_id',
        'religion_id',
        'sign_id',
        'smoke_id',
        'dob'
    ];


    //Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bodyType(): BelongsTo
    {
        return $this->belongsTo(BodyType::class);
    }

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    public function diet(): BelongsTo
    {
        return $this->belongsTo(Diet::class);
    }

    public function drink(): BelongsTo
    {
        return $this->belongsTo(Drink::class);
    }

    public function education(): BelongsTo
    {
        return $this->belongsTo(Education::class);
    }

    public function employment(): BelongsTo
    {
        return $this->belongsTo(Employment::class);
    }

    public function ethnicity(): BelongsTo

    {
        return $this->belongsTo(Ethnicity::class);
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }

    public function pet(): BelongsTo
    {
        return $this->belongsTo(Pet::class);
    }

    public function politics(): BelongsTo
    {
        return $this->belongsTo(Politics::class);
    }

    public function relationship(): BelongsTo
    {
        return $this->belongsTo(Relationship::class);
    }

    public function religion(): BelongsTo
    {
        return $this->belongsTo(Religion::class);
    }

    public function sign(): BelongsTo
    {
        return $this->belongsTo(Sign::class);
    }

    public function smoke(): BelongsTo
    {
        return $this->belongsTo(Smoke::class);
    }
}
