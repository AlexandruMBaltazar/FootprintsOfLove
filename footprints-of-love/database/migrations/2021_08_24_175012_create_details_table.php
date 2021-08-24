<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('body_type_id')->constrained('body_types');
            $table->foreignId('child_id')->constrained('children');
            $table->foreignId('diet_id')->constrained('diets');
            $table->foreignId('drink_id')->constrained('drinks');
            $table->foreignId('education_id')->constrained('education');
            $table->foreignId('employment_id')->constrained('employments');
            $table->foreignId('ethnicity_id')->constrained('ethnicities');
            $table->string('height');
            $table->foreignId('language_id')->constrained('languages');
            $table->foreignId('pet_id')->constrained('pets');
            $table->foreignId('politics_id')->constrained('politics');
            $table->foreignId('relationship_id')->constrained('relationships');
            $table->foreignId('sign_id')->constrained('signs');
            $table->foreignId('smoke_id')->constrained('smokes');
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
        Schema::dropIfExists('details');
    }
}
