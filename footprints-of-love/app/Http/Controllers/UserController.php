<?php

namespace App\Http\Controllers;

use App\Filters\User\FilterByNonImportantPreferences;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\User\DiscoverResource;
use App\Http\Resources\User\ShowResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Paginator\CollectionPaginator;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Builder;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'api'])->except('store');
    }

    /**
     * Display a listing of the resource.
     *
     * @return DiscoverResource
     */
    public function index()
    {
        $users = User::with('profilePhoto', 'detail', 'location', 'answers.topic')
            ->whereHas('detail', function (Builder $query) {
                $query->searchByImportantPreferences();
            })
            ->when(optional(Auth::user()->distancePreference)->is_important
                && optional(Auth::user()->distancePreference)->distance > 0, function ($query) {
                return $query->whereHas('location', function (Builder $query) {
                    $query->isWithinMaxDistance();
                });
            })
        ->where('id', '!=', Auth::id())
        ->lazy()->filter(function ($user) {
            if (!$user->isSwiped()) {
                return \app()->makeWith(FilterByNonImportantPreferences::class, ['user' => $user])
                    ->meetsThreshold();
            }

            return false;
        });

        return new DiscoverResource(CollectionPaginator::paginate($users));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response($user, \Symfony\Component\HttpFoundation\Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return ShowResource
     */
    public function show(User $user): ShowResource
    {
        $user->load(['sessions' => function ($query) {
            $query->whereHas('users', function ($query) {
                $query->where('users.id', Auth::id());
            });
        }]);

        return new ShowResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param User $user
     * @return UserResource
     * @throws AuthorizationException
     */
    public function update(UserRequest $request, User $user): UserResource
    {
        $this->authorize('update', $user);

        if ($request->input('password')) {
            $user->update([
                'password' => Hash::make($request->input('password'))
            ]);
        } else {
            $user->update($request->fillable());
        }

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($user)
    {
        //
    }
}
