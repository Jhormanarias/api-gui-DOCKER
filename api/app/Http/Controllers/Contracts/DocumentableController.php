<?php

namespace App\Http\Controllers\Contracts;

use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Relations\Relation;

trait DocumentableController
{
    public function addPicture(Request $request, int $id)
    {

        try{
            $model = new Picture($request->all());
            $model->pictureable_type = $this->model;
            $model->pictureable_id = $id;
            $model->save();
            $alias = $this->model::find($id);
            $pictureable = $alias->picture;

            //$alias = $model->getMorphClass();
            //$class = Relation::getMorphedModel($alias);
            Log::info('Modelo: '. $model);
            Log::info('$this->model: '. $this->model);
            Log::info('Request: '. $request);
            Log::info('Alias: '. $alias);
            Log::info('class: '. User::class);
            Log::info('Relacion: '. $pictureable);

            
        //return successful response
        return response()->json(['picture' => $model, 'message' => 'CREATED'], 201);}
        catch(\Exception $e){
            return response()->json(
                [
                    'message' => $e,
                ],
                422
            );
        }


        //$model = $this->model::find($id);
    }
}