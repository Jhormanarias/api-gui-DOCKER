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

    

}
