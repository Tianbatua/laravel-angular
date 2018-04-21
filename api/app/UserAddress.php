<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'user_addresses';

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'address', 'province', 'city', 'country', 'postal_code'
    ];
}
