<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('body_type_id')->nullable()->constrained('body_types');
            $table->foreignId('child_id')->nullable()->constrained('children');
            $table->foreignId('diet_id')->nullable()->constrained('diets');
            $table->foreignId('drink_id')->nullable()->constrained('drinks');
            $table->foreignId('education_id')->nullable()->constrained('education');
            $table->foreignId('employment_id')->nullable()->constrained('employments');
            $table->foreignId('ethnicity_id')->nullable()->constrained('ethnicities');
            $table->foreignId('gender_id')->nullable()->constrained('genders');
            $table->string('height')->nullable();
            $table->foreignId('language_id')->nullable()->constrained('languages');
            $table->foreignId('pet_id')->nullable()->constrained('pets');
            $table->foreignId('politics_id')->nullable()->constrained('politics');
            $table->foreignId('relationship_id')->nullable()->constrained('relationships');
            $table->foreignId('religion_id')->nullable()->constrained('religions');
            $table->foreignId('sign_id')->nullable()->constrained('signs');
            $table->foreignId('smoke_id')->nullable()->constrained('smokes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');
    }
}
