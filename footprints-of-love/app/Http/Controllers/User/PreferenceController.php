<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\PreferenceRequest;
use App\Http\Resources\User\PreferenceResource;
use App\Models\User;
use App\Models\User\Preference;
use Illuminate\Http\Response;

class PreferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return PreferenceResource
     */
    public function index(User $user)
    {
        $this->authorize('viewAny', [Preference::class, $user]);

        $preferences = $user->preferences()
            ->with('preferenceable')
            ->get();

        return new PreferenceResource($preferences);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param PreferenceRequest $request
     * @param User $user
     * @return PreferenceResource
     */
    public function store(PreferenceRequest $request, User $user): PreferenceResource
    {
        $this->authorize('create', [Preference::class, $user]);

        if ($request->has('preference_ids')) {
            $model = 'App\Models\User\Detail\\'. $request->input('preference_type');

            User\Preference::query()
                ->where('preferenceable_type', $model)
                ->where('user_id', $user->id)
                ->delete();

            $user->importances()->updateOrCreate(
                ['preferenceable_type' => $model],
                [
                    'preferenceable_type' => $model,
                    'is_important' => $request->input('is_important')
                ]
            );

            foreach ($request->input('preference_ids') as $id) {
                $model = $model::findOrFail($id);
                $model->preferences()->create([
                    'user_id' => $user->id,
                ]);
            }
        }

        if ($request->has('height')) {
            $user->heightPreference()->updateOrCreate(
                ['user_id' => optional($user->heightPreference)->user_id],
                [
                    'min' => $request->input('height.min'),
                    'max' => $request->input('height.max'),
                    'is_important' => $request->input('is_important')
                ]
            );
        }

        if ($request->has('age')) {
            $user->agePreference()->updateOrCreate(
                ['user_id' => optional($user->agePreference)->user_id],
                [
                    'min' => $request->input('age.min'),
                    'max' => $request->input('age.max'),
                    'is_important' => $request->input('is_important')
                ]
            );
        }

        if ($request->has('distance')) {
            $user->distancePreference()->updateOrCreate(
                ['user_id' => optional($user->distancePreference)->user_id],
                [
                    'distance' => $request->input('distance'),
                    'is_important' => $request->input('is_important')
                ]
            );
        }

        $preferences = $user->preferences()
            ->with(['preferenceable', 'user.importances'])
            ->get();

        return new PreferenceResource($preferences);
    }
}
