<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//import auth facades
use Illuminate\Support\Facades\Auth;

class AuthController extends ResourceController
{
    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
        //validate incoming request 
        $rules=[
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];
        $this->validate($request, $rules);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales invalidas'], 401);
        }

        return $this->respondWithToken($token);
    }
}