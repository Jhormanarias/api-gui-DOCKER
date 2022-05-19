<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});


// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
    // Matches "/api/register
    $router->post('login', 'AuthController@login');
    $router->get("getUser", "AuthController@user");
    $router->get("getPhotoProfile", "UserController@getPhotoProfile");
    $router->post("createuser", "UserController@store");
    $router->post("createpictureprofile/{id}", "UserController@addPicture");
    $router->post("createpicturepost/{id}", "PostController@addPicture");
    $router->get("allposts", "PostController@index");
    $router->get("post/{id}", "PostController@show");
    $router->post("createpost", "PostController@store");
    $router->get("comment/{id}", "CommentController@show");
    $router->get("allcomments", "CommentController@index");
    $router->post("createcomment", "CommentController@store");
    $router->delete("deletecomment/{id}", "CommentController@delete");
});




//Grupo de rutas con variable $controller para no escribor el controlador manualmente
/* function resource($prefix, $controller, $router)
{
    $router->group(["prefix" => $prefix], function ($router) use ($controller) {
        $router->get("/", $controller . "Controller@index");
        $router->post("/", $controller . "Controller@store");
        $router->get("/{id}", $controller . "Controller@show");
        $router->put("/{model_id}", $controller . "Controller@update");
        $router->post("/{model_id}", $controller . "Controller@update");
        $router->patch("/{model_id}", $controller . "Controller@update");
        $router->delete("/{model_id}", $controller . "Controller@delete");
    });
}

resource("post", "Post", $router); */
