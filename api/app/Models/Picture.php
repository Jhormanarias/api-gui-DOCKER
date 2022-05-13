<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{

    protected $table = 'pictures';

    protected $fillable = ['fileName', 'fileWeight'];


    public function pictureable()
    {
        return $this->morphTo();
    }

}
