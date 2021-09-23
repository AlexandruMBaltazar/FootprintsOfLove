<?php

namespace Database\Factories\User;

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
use App\Models\User\UserDetail;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Lang;

class UserDetailFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $bodyTypesIds = BodyType::all()->pluck('id')->toArray();
        $childIds = Child::all()->pluck('id')->toArray();
        $dietIds = Diet::all()->pluck('id')->toArray();
        $drinkIds = Drink::all()->pluck('id')->toArray();
        $educationIds = Education::all()->pluck('id')->toArray();
        $employmentIds = Employment::all()->pluck('id')->toArray();
        $ethnicityIds = Ethnicity::all()->pluck('id')->toArray();
        $genderIds = Gender::all()->pluck('id')->toArray();
        $languageIds = Language::all()->pluck('id')->toArray();
        $petIds = Pet::all()->pluck('id')->toArray();
        $politicsIds = Politics::all()->pluck('id')->toArray();
        $relationshipIds = Relationship::all()->pluck('id')->toArray();
        $religionIds = Religion::all()->pluck('id')->toArray();
        $signIds = Sign::all()->pluck('id')->toArray();
        $smokeIds = Smoke::all()->pluck('id')->toArray();


        return [
            'user_id' => User::factory()->create()->id,
            'body_type_id' => rand(1,2),
            'child_id' => 2,
            'diet_id' => $dietIds[array_rand($dietIds)],
            'drink_id' => $drinkIds[array_rand($drinkIds)],
            'education_id' => $educationIds[array_rand($educationIds)],
            'employment_id' => $employmentIds[array_rand($employmentIds)],
            'ethnicity_id' => $ethnicityIds[array_rand($ethnicityIds)],
            'gender_id' => 1,
            'height' => $this->faker->numberBetween(145, 200),
            'language_id' => 5,
            'pet_id' => $petIds[array_rand($petIds)],
            'politics_id'=> $politicsIds[array_rand($politicsIds)],
            'relationship_id' => $relationshipIds[array_rand($relationshipIds)],
            'religion_id' => $religionIds[array_rand($religionIds)],
            'sign_id' => $signIds[array_rand($signIds)],
            'smoke_id' => 3,
            'dob' => $this->faker->date,
            'age' => $this->faker->numberBetween(18, 99)
        ];
    }
}
