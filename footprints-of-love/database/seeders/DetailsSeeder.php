<?php

namespace Database\Seeders;

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
use Illuminate\Database\Seeder;

class DetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Details
        Gender::factory()->createMany([
            ['value' => 'Woman'],
            ['value' => 'Male'],
        ]);

        Relationship::factory()->createMany([
            ['value' => 'Monogamous'],
            ['value' => 'Non-monogamous'],
            ['value' => 'Open to either'],
        ]);

        BodyType::factory()->createMany([
            ['value' => 'Thin'],
            ['value' => 'Overweight'],
            ['value' => 'Average build'],
            ['value' => 'Fit'],
            ['value' => 'Jacked'],
            ['value' => 'A little extra'],
            ['value' => 'Curvy'],
            ['value' => 'Full figured'],
        ]);

        Ethnicity::factory()->createMany([
            ['value' => 'Asian'],
            ['value' => 'Black'],
            ['value' => 'Hispanic / Latin'],
            ['value' => 'Indian'],
            ['value' => 'Middle Eastern'],
            ['value' => 'Native American'],
            ['value' => 'Pacific Islander'],
            ['value' => 'White'],
            ['value' => 'Other'],
        ]);

        Politics::factory()->createMany([
            ['value' => 'Politically liberal'],
            ['value' => 'Politically moderate'],
            ['value' => 'Politically conservative'],
            ['value' => 'Other political beliefs'],
        ]);

        Language::factory()->createMany([
            ['value' => 'English'],
            ['value' => 'Afrikaans'],
            ['value' => 'Albanian'],
            ['value' => 'Arabic'],
            ['value' => 'Armenian'],
            ['value' => 'Belarusian'],
            ['value' => 'Cebuano'],
            ['value' => 'Chinese'],
            ['value' => 'Chinese (Cantonese)'],
            ['value' => 'Chinese (Mandarin)'],
            ['value' => 'C++'],
            ['value' => 'Croatian'],
            ['value' => 'Czech'],
            ['value' => 'Danish'],
            ['value' => 'Dutch'],
            ['value' => 'Estonian'],
            ['value' => 'Finnish'],
            ['value' => 'French'],
            ['value' => 'Georgian'],
            ['value' => 'German'],
            ['value' => 'Greek'],
            ['value' => 'Gujarati'],
            ['value' => 'Hebrew'],
            ['value' => 'Hindi'],
            ['value' => 'Hungarian'],
            ['value' => 'Icelandic'],
            ['value' => 'Indonesian'],
            ['value' => 'Italian'],
            ['value' => 'Japanese'],
            ['value' => 'Korean'],
            ['value' => 'Latvian'],
            ['value' => 'Lithuanian'],
            ['value' => 'Malay'],
            ['value' => 'Norwegian'],
            ['value' => 'Other language'],
            ['value' => 'Polish'],
            ['value' => 'Portuguese'],
            ['value' => 'Punjabi'],
            ['value' => 'Romanian'],
            ['value' => 'Russian'],
            ['value' => 'Serbian'],
            ['value' => 'Slovak'],
            ['value' => 'Slovenian'],
            ['value' => 'Spanish'],
            ['value' => 'Swahili'],
            ['value' => 'Swedish'],
            ['value' => 'Tagalog'],
            ['value' => 'Thai'],
            ['value' => 'Turkish'],
            ['value' => 'Ukrainian'],
            ['value' => 'Urdu'],
            ['value' => 'Vietnamese'],
            ['value' => 'Yiddish'],
        ]);

        Education::factory()->createMany([
            ['value' => 'High school'],
            ['value' => 'Trade/tech school'],
            ['value' => 'In college'],
            ['value' => 'Undergraduate degree'],
            ['value' => 'In grad school'],
            ['value' => 'Graduate degree'],
        ]);

        Employment::factory()->createMany([
            ['value' => 'Employed full-time'],
            ['value' => 'Employed part-time'],
            ['value' => 'Freelance worker'],
            ['value' => 'Self-employed'],
            ['value' => 'Unemployed'],
            ['value' => 'Retired'],
        ]);

        Religion::factory()->createMany([
            ['value' => 'Agnosticism'],
            ['value' => 'Atheism'],
            ['value' => 'Christianity'],
            ['value' => 'Judaism'],
            ['value' => 'Catholicism'],
            ['value' => 'Islam'],
            ['value' => 'Hinduism'],
            ['value' => 'Buddhism'],
            ['value' => 'Sikh'],
            ['value' => 'Other religion'],
        ]);

        Sign::factory()->createMany([
            ['value' => 'Aquarius'],
            ['value' => 'Pisces'],
            ['value' => 'Aries'],
            ['value' => 'Taurus'],
            ['value' => 'Gemini'],
            ['value' => 'Cancer'],
            ['value' => 'Leo'],
            ['value' => 'Virgo'],
            ['value' => 'Libra'],
            ['value' => 'Scorpio'],
            ['value' => 'Sagittarius'],
            ['value' => 'Capricorn'],
        ]);

        Smoke::factory()->createMany([
            ['value' => 'Smokes cigarettes regularly'],
            ['value' => 'Smokes cigarettes sometimes'],
            ['value' => "Doesn't smoke cigarettes"],
        ]);

        Drink::factory()->createMany([
            ['value' => 'Drinks often'],
            ['value' => 'Drinks sometimes'],
            ['value' => "Doesn’t drink"],
        ]);

        Diet::factory()->createMany([
            ['value' => 'Omnivore'],
            ['value' => 'Vegetarian'],
            ['value' => 'Vegan'],
            ['value' => 'Gluten Free'],
            ['value' => 'Pescatarian'],
            ['value' => 'Ketogenic'],
        ]);

        Child::factory()->createMany([
            ['value' => "Doesn't have kids but might want them"],
            ['value' => "Doesn't have kids but wants them"],
            ['value' => "Doesn't have kids and doesn't want them"],
            ['value' => "Has kid(s) and doesn't want more"],
            ['value' => "Has kid(s) and might want more"],
            ['value' => "Has kid(s) and wants more"],
        ]);

        Pet::factory()->createMany([
            ['value' => "Doesn't have pet(s)"],
            ['value' => "Has other pet(s)"],
            ['value' => "Has cat(s)"],
            ['value' => "Has dog(s)"],
        ]);
    }
}
