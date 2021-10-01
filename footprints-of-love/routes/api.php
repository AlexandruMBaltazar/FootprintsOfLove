<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Topic\AnswerController;
use App\Http\Controllers\User\Detail\DetailController;
use App\Http\Controllers\User\PreferenceController;
use App\Http\Controllers\User\UserDetailsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('forgot', [PasswordController::class, 'forgot']);
Route::post('login', [AuthController::class, 'login']);
Route::post('reset', [PasswordController::class, 'reset']);

Route::resource('users', UserController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('topics/{topic}/answers', AnswerController::class);

    Route::get('details', DetailController::class);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::resource('users.photos', PhotoController::class)->shallow();

    Route::get('user', [AuthController::class, 'user']);

    Route::prefix('users/{user}')->group(function () {
        Route::post('/details', [UserDetailsController::class, 'store']);
        Route::get('/details', [UserDetailsController::class, 'show']);

        Route::post('/preferences', [PreferenceController::class, 'store']);
        Route::get('/preferences', [PreferenceController::class, 'index']);
    });
    Route::put('/details/{detail}', [UserDetailsController::class, 'update']);
});

