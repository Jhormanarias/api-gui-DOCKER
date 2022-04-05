<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ResourceController;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends ResourceController
{
    protected $model = Comment::class;

    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        $datos = $this->model::all()->whereNull('comment_id');

        return response()->json($datos);
    }

    
    
    /* public function store(Request $request)
    {

        $comentario = new Comment;

        $comentario->id=$request->id;
        $comentario->comment=$request->comment;
        $comentario->comment_id=$request->comment_id;
        $comentario->post_id=$request->post_id;
        $comentario->user_id=$request->user_id;

        $comentario->save();


        return response()->json($request);
    } */

    /* public function show($id)
    {

        $comentario = Comment::find($id);

        return response()->json($comentario);
    } */


    //
}
