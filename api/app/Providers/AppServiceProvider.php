<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /* public function boot()
    {
        Relation::morphMap([
            'user' => User::class,
        ]);
    } */
    
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
