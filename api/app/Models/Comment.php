<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    protected $table = 'comment';

    protected $fillable = ['comment','comment_id','post_id','users_id'];

    protected $with = ['comentarios.comentarios'];

    protected $dates = ['deleted_at'];

    public function comentarios(){
        return $this->hasMany(Comment::class, 'comment_id');
    }
    
    /* protected $hidden = [];  */


}
