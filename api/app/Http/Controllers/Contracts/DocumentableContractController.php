<?php

namespace App\Http\Controllers\Contracts;

use Illuminate\Http\Request;

interface DocumentableContractController 
{
    public function addPicture(Request $request, int $id);
}