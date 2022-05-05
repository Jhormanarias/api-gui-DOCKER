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
        $this->middleware('auth');
    }

    public function index()
    {
        $datos = $this->model::all()->whereNull('comment_id');

        return response()->json($datos);
    }

    public function store(Request $request)
    {
        $rules = [
            'comment' => 'required|max:255'
        ];
        $this->validate($request, $rules);

        return parent::store($request);
    }
    
    
}
