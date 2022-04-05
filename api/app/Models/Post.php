<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';

    protected $fillable = ['users_id','title','body'];

    /* protected $with = ['comentarios']; */
    
    public function comentarios(){
        return $this->hasMany(Comment::class, 'post_id')->whereNull('comment_id');
    }
}
