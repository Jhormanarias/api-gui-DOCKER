<?php

namespace App\Http\Controllers\Contracts;

use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

trait DocumentableController
{
    public function addPicture(Request $request, int $id)
    {

        try {
            $model = $this->model::find($id);

            //obtenemos el campo file definido en el formulario
            $file = $request->file('photo');

            //obtenemos el nombre del archivo
            $fileExtension = $file->getClientOriginalExtension();
            $fileName = 'UserProfile_'.$model->name.'.'.$fileExtension;


            //Obtenemos el peso del archivo
            $fileSizeBytes = $file->getSize();
            $fileSizeMegaBytes = number_format($fileSizeBytes / 1048576,2) . ' Mb';
            
            if ($request->hasFile('photo')) {
                $model->picture()->create(['fileName'=>$fileName, 'fileWeight'=> $fileSizeMegaBytes]);
                
                //indicamos el destino en el que guardaremos la imagen
                
                $destinationPath = storage_path('images');
                $request->file('photo')->move($destinationPath, $fileName);
                Log::info('Extension: '. $fileExtension);
            }

            //$model = $this->model::find($id);
            //$model->picture()->create($request->all());


            //return successful response
            return $model;
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => $e,
                ],
                422
            );
        }
    }
}
