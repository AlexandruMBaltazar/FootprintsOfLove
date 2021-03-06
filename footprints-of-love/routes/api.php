<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\BlockedAccountController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Session\MessageController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SignalController;
use App\Http\Controllers\SwipeController;
use App\Http\Controllers\Topic\AnswerController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\User\Detail\DetailController;
use App\Http\Controllers\User\PreferenceController;
use App\Http\Controllers\User\UserDetailsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Broadcast;
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
Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::post('forgot', [PasswordController::class, 'forgot']);
Route::post('login', [AuthController::class, 'login']);
Route::post('reset', [PasswordController::class, 'reset']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('call/placeCall', [SignalController::class, 'placeCall']);
    Route::post('call/closeCall', [SignalController::class, 'closeCall']);

    Route::resource('blocked-accounts', BlockedAccountController::class);

    Route::get('details', DetailController::class);

    Route::resource('location', LocationController::class);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('sessions', SessionController::class);

    Route::prefix('sessions/{session}')->group(function () {
        Route::post('/messages', [MessageController::class, 'store']);
        Route::get('/messages', [MessageController::class, 'index']);
    });

    Route::get('swipes/users', LikesController::class);

    Route::resource('swipes', SwipeController::class);

    Route::get('user', [AuthController::class, 'user']);

    Route::post('topics/{topic}/answers', AnswerController::class);

    Route::resource('users.photos', PhotoController::class)->shallow();

    Route::resource('users.notifications', NotificationController::class)->shallow();
    Route::delete('sessions/{session}/notifications', [NotificationController::class, 'destroyMessageNotifications']);

    Route::prefix('users/{user}')->group(function () {
        Route::post('/details', [UserDetailsController::class, 'store']);
        Route::get('/details', [UserDetailsController::class, 'show']);

        Route::post('/preferences', [PreferenceController::class, 'store']);
        Route::get('/preferences', [PreferenceController::class, 'index']);

        Route::get('/topics', TopicController::class);
    });
    Route::put('/details/{detail}', [UserDetailsController::class, 'update']);
});

Route::resource('users', UserController::class);

