<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlockAccountRequest;
use App\Http\Resources\BlockedAccountResource;
use App\Models\BlockedAccount;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class BlockedAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $blockedAccounts = Auth::user()->blockedAccounts()->with('blockedUser')
            ->orderByDesc('created_at')
            ->simplePaginate(1);

        return BlockedAccountResource::collection($blockedAccounts);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return BlockedAccountResource
     */
    public function store(BlockAccountRequest $request): BlockedAccountResource
    {
        $blockedAccount = Auth::user()->blockedAccounts()->create([
            'blocked_user_id' => $request->input('user_id')
        ]);

        $blockedAccount->load('blockedUser');

        return new BlockedAccountResource($blockedAccount);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BlockedAccount  $blockedAccount
     * @return \Illuminate\Http\Response
     */
    public function show(BlockedAccount $blockedAccount)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BlockedAccount  $blockedAccount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockedAccount $blockedAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BlockedAccount  $blockedAccount
     * @return BlockedAccountResource
     */
    public function destroy(BlockedAccount $blockedAccount): BlockedAccountResource
    {
        $blockedAccount->delete();

        $blockedAccount->load('blockedUser');

        return new BlockedAccountResource($blockedAccount);
    }
}
