<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Contracts\DocumentableContractController;
use App\Http\Controllers\Contracts\DocumentableController;
use App\Http\Controllers\ResourceController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/* use Illuminate\Support\Facades\Hash; de otra manera para encriptar password*/

class UserController extends ResourceController implements DocumentableContractController
{
    use DocumentableController;
    protected $model = User::class;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ];
        /* $request['password']=Hash::make($request->password);   de otra manera para encriptar password*/
        $request['password']=app('hash')->make($request->password);
        $this->validate($request, $rules);

        return parent::store($request);
    }


    public function update(Request $request, $id)
    {
        $rules = ['id' => 'numeric'];
        $this->validate($request, $rules);
        /* $user = User::find(1);
        $picture = $user->picture;
        Log::info('Relacion polimorfica uno a uno: '. $picture); */
        return parent::update($request, $id);
    }


    public function photoProfile(Request $request)
    {
        /* try{
            $model = new $this->model();
            $this->validate($request, [
                'id' => 'numeric'
            ]);
            Log::info('modelo: '. $model);
            $model->save($request);
        //return successful response
        return response()->json(['user' => $model, 'message' => 'CREATED'], 201);}
        catch(\Exception $e){
            return response()->json(
                [
                    'message' => $e,
                ],
                422
            );
        } */




        /* $userProfile = User::find(3);
        $userProfile->picture->save(['fileName' => 'fileTest.jpg', 'fileWeight'=> '245kb']);

        return response()->json(['user' => $userProfile, 'message' => 'UPDATED'], 201); */

        /* $comentario = new Comment;
        $comentario->id=$request->id;
        $comentario->comment=$request->comment;
        $comentario->comment_id=$request->comment_id;
        $comentario->post_id=$request->post_id;
        $comentario->user_id=$request->user_id;
        $comentario->save();
        return response()->json($request); */
    }

}
