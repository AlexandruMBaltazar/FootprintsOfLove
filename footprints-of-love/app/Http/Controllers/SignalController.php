<?php

namespace App\Http\Controllers;

use App\Events\CloseSignalCall;
use App\Events\MakeSignalCall;
use App\Http\Resources\User\ShowResource;
use App\Models\User;
use Illuminate\Http\Request;

class SignalController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return bool
     */
    public function placeCall(Request $request): bool
    {
        $signal['type'] = $request->input('type');
        $signal['user'] = (new ShowResource(User::query()->findOrFail($request->input('userId'))))
            ->toArray($request);
        $signal['otherUser'] = (new ShowResource(User::query()->findOrFail($request->input('otherUserId'))))
            ->toArray($request);
        $signal['data'] = $request->input('data');

        broadcast(new MakeSignalCall($signal))->toOthers();

        return true;
    }

    public function closeCall(Request $request)
    {
        $data['user_id'] = $request->input('user_id');
        broadcast(new CloseSignalCall($data))->toOthers();

        return true;
    }
}
