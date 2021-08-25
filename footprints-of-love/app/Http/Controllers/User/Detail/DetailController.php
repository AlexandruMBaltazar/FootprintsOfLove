<?php

namespace App\Http\Controllers\User\Detail;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\Detail\DetailResource;
use App\Models\User\Detail\BodyType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DetailController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request)
    {
        $model = 'App\Models\User\Detail\\'. $request->input('detail');

        return DetailResource::collection($model::all());
    }
}
