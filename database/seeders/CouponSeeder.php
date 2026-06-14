<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupons = [
            [
                'code' => 'WELCOME10',
                'type' => 'percent',
                'value' => 10,
                'status' => 'active',
            ],
            [
                'code' => 'SAVE50K',
                'type' => 'fixed',
                'value' => 50000,
                'status' => 'active',
            ],
            [
                'code' => 'SUMMER20',
                'type' => 'percent',
                'value' => 20,
                'status' => 'active',
            ],
            [
                'code' => 'LOYALTY100K',
                'type' => 'fixed',
                'value' => 100000,
                'status' => 'active',
            ],
        ];

        foreach ($coupons as $coupon) {
            Coupon::firstOrCreate(
                ['code' => $coupon['code']],
                $coupon
            );
        }
    }
}
