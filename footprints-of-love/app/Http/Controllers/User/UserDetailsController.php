<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserDetailsRequest;
use App\Http\Resources\User\UserDetailsResource;
use App\Models\User;
use App\Models\User\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserDetailsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param UserDetailsRequest $request
     * @param User $user
     * @return UserDetailsResource
     */
    public function store(UserDetailsRequest $request, User $user): UserDetailsResource
    {
        $detail = $user->detail()->create($request->fillable());

        return new UserDetailsResource($detail);
    }

    /**
     * Display the specified resource.
     *
     * @param UserDetail $detail
     * @return UserDetailsResource
     */
    public function show(User $user): UserDetailsResource
    {
        $detail = $user->detail()
            ->with(['bodyType', 'child', 'diet', 'drink', 'education', 'employment',
                'ethnicity', 'gender', 'language', 'pet', 'politics', 'relationship',
                'religion', 'sign', 'smoke'])
            ->first();

        return new UserDetailsResource($detail);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param UserDetailsRequest $request
     * @param UserDetail $detail
     * @return UserDetailsResource
     */
    public function update(UserDetailsRequest $request, UserDetail $detail): UserDetailsResource
    {
        $this->authorize('update', $detail);

        $detail->update($request->fillable());

        return new UserDetailsResource($detail);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
