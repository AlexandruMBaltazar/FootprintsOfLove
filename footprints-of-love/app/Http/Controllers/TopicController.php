<?php

namespace App\Http\Controllers;

use App\Http\Resources\TopicResource;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request, User $user): AnonymousResourceCollection
    {
        $topics = Topic::with(['answers' => function (HasMany $query) use ($user) {
            $query->where('user_id', $user->id);
        }])->get();

        return TopicResource::collection($topics);
    }
}
