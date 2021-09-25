<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(User $user): AnonymousResourceCollection
    {
        $photos = $user->photos()
            ->orderBy('created_at', 'DESC')
            ->get();

        return PhotoResource::collection($photos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return PhotoResource
     */
    public function store(PhotoRequest $request, User $user): PhotoResource
    {
        $this->authorize('create', [Photo::class, $user]);
        $location = sprintf('photos/%s-%s', $user->getTable(), $user->id);
        $path = Storage::putFile($location, $request->file('photo'));

        $photo = $user->photos()->create([
            'name' => $request->file('photo')->getClientOriginalName(),
            'location' => $path
        ]);

        return new PhotoResource($photo);
    }

    /**
     * Display the specified resource.
     *
     * @param Photo $photo
     * @return PhotoResource
     */
    public function show(Photo $photo): PhotoResource
    {
        return new PhotoResource($photo);
    }

    /**
     * Update the specified resource in storage.
     * @param Photo $photo
     * @return PhotoResource
     */
    public function update(PhotoRequest $request, Photo $photo): PhotoResource
    {
        $this->authorize('update', $photo);

        //If we update to a new profile photo then remove the previous one
        if ($request->has('is_profile_photo')) {
            Auth::user()->photos()
                ->where('is_profile_photo', true)->update(['is_profile_photo' => false]);
        }

        $photo->update($request->fillable());

        return new PhotoResource($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Photo $photo
     * @return PhotoResource
     */
    public function destroy(Photo $photo): PhotoResource
    {
        $this->authorize('delete', $photo);

        $photo->delete();
        Storage::delete($photo->location);

        return new PhotoResource($photo);
    }
}
