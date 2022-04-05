<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment', function (Blueprint $table) {
            $table->id();
            $table->text('comment');
            $table->bigInteger('comment_id')->nullable();
            $table->bigInteger('post_id')->unsigned();
            $table->bigInteger('users_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('post');
            $table->foreign('users_id')->references('id')->on('users');
            $table->softDeletes();
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment');
    }
};
