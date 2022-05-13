<?php

use Illuminate\Support\Facades\Storage;

return[

    'local' => [

        'driver' => 'local',
        
        'root' => '/storage/pictures',
        
    ],
    'links' => [
        Storage::public_path('storage') => storage_path('app/public'),
        Storage::public_path('images') => storage_path('app/images'),
    ],
];
