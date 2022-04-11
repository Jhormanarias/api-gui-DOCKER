<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ResourceController;
use App\Models\User;
use Illuminate\Http\Request;
/* use Illuminate\Support\Facades\Hash; de otra manera para encriptar password*/

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
        /* $request['password']=Hash::make($request->password);   de otra manera para encriptar password*/
        $request['password']=app('hash')->make($request->password);
        $this->validate($request, $rules);

        return parent::store($request);
    }
}
