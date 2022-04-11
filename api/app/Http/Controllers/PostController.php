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
        $this->middleware('auth');
    }

    public function index()
    {

        return $this->model::all()->load('comentarios');
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|unique:post|max:255',
            'body' => 'required',
        ];
        $this->validate($request, $rules);

        return parent::store($request);
    }
}
