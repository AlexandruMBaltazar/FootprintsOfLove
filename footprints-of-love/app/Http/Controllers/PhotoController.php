<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\UploadedFile;
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
     * Remove the specified resource from storage.
     *
     * @param Photo $photo
     * @return PhotoResource
     */
    public function destroy(Photo $photo): PhotoResource
    {
        $photo->delete();
        Storage::delete($photo->location);

        return new PhotoResource($photo);
    }
}
