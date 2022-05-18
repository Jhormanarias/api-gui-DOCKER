<?php

namespace App\Models;

use App\Observers\PostObserver;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    use PostObserver;

    protected $table = 'post';

    protected $fillable = ['users_id','title','body'];

    /* protected $with = ['comentarios']; */
    
    public function comentarios(){
        return $this->hasMany(Comment::class, 'post_id')->whereNull('comment_id');
    }

    public function picture()
    {
        return $this->morphOne(Picture::class, 'pictureable');
    }
}
