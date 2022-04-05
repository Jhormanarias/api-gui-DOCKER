<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ResourceController;
use App\Models\Post;
use Illuminate\Http\Request;


class PostController extends ResourceController
{
    protected $model = Post::class;


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

        return $this->model::all()->load('comentarios');
    }

    public function store(Request $request)
    {
        $this->validate($request,[
            'title' => 'required|unique:post|max:255',
            'body' => 'required',
        ]);

        return parent::store($request);
    }
}
