<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Exception;

abstract class ResourceController extends Controller
{
    protected $model;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* $datos = $this->model::all()->whereNull('comment_id');

        return response()->json($datos); */
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $model = new $this->model($request->all());
            $this->validate($request, [
                'id' => 'numeric'
            ]);
            $model->save();

        return $model;
        }
        catch(\Exception $e){
            return response()->json(
                [
                    'message' => $e,
                ],
                422
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos = $this->model::find($id);

        return response()->json($datos);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try{
            $data = $this->model::find($id);
            $data->delete();

            return response()->json(
                [
                    'message' => '$Dato eliminado',
                    'message' => $data
                ],
                200
            );
            /* return response('', 204); */
        }
        catch(\Exception $e)
        {
            return response()->json(
                [
                    'message' => $e,
                ],
                409
            );
        }
        
    }


    /* return response()->json(
        [
            'message' => $e,
        ],
        409
    );
 */


    /* public function softDelete($id)
    {

        $data = $this->model::destroy($id);
        if ($data) {
            $response = 'Successfully deleted';
        } else {

            $response = 'Error deleted';

        }
        return response($response);
    } */
}
