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

}