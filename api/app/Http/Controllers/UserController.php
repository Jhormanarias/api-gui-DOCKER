<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ResourceController;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends ResourceController
{
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
        $this->validate($request, $rules);

        return parent::store($request);
    }
}
