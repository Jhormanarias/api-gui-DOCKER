<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{

    protected $table = 'pictures';

    protected $fillable = ['file_name', 'file_extension' , 'file_size_Mb' , 'url' ];


    public function pictureable()
    {
        return $this->morphTo();
    }

}
