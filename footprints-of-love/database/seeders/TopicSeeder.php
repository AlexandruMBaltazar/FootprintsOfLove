<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Topic::factory()->createMany([
            ['name' => 'About me'],
            ['name' => 'Aspirations'],
            ['name' => 'Talents'],
            ['name' => 'Hobbies']
        ]);
    }
}
