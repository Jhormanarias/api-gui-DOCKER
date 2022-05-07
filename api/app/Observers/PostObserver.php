<?php

namespace App\Observers;

use Illuminate\Support\Facades\Log;

/**
 * Observes the Post model
 */

trait PostObserver
{
   protected static function boot()
   {
      parent::boot();

      static::created(function ($post) {
         Log::info('Se ha creado un nuevo Post: ', [$post->title]);
         $docRef = app('firebase.firestore')->database()->collection('notificaciones')-> newDocument();
         $docRef->set([
            'createdAt' => $post->created_at,
            'title' => $post->title,
            'body' => $post->body,
            'user_id' => $post->users_id
         ]);
      });
   }


   /* function setup_dataset(): void
   {
      // Create the Cloud Firestore client
      $db = new FirestoreClient([
         'projectId' => "chat-react-firebase-e9def",
      ]);
      # [START fs_add_data_1]
      # [START firestore_setup_dataset_pt1]
      $docRef = $db->collection('notificaciones')->document('pruebaParaCuandoBorreTodo');
      $docRef->set([
         'createdAt' => $post->created_at,
         'title' => $post->title,
         'body' => $post->body,
         'user_id' => $post->users_id
      ]);
      Log::info('Added data to the lovelace document in the users collection.' . PHP_EOL);
      # [END firestore_setup_dataset_pt1]
      # [END fs_add_data_1]
      
   } */
}
