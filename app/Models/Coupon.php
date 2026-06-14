<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'code',
        'type',
        'value',
        'status',
        'expires_at',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'expires_at' => 'datetime',
    ];
}
