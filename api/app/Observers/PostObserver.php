<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Log;

/**
 * Observes the Post model
 */

trait PostObserver
{
   protected static function boot()
   {
      parent::boot();

      static::created(function ($post){
         Log::info('Se ha creado un nuevo Post: ', [$post]);
      });
   }










    /**
     * Handle the Post "store" event.
     *
     * @param  \App\Post  $user
     * @return void
     */
    /* public function created(Post $post)
    {
       Log::info('Algo se subió en el modelo: ', [$post]);
    } */

}