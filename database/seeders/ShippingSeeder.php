<?php

namespace Database\Seeders;

use App\Models\Shipping;
use Illuminate\Database\Seeder;

class ShippingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shippings = [
            [
                'type' => 'Standard Shipping',
                'description' => 'Delivery in 5-7 business days',
                'cost' => 25000,
                'status' => 'active',
            ],
            [
                'type' => 'Express Shipping',
                'description' => 'Delivery in 2-3 business days',
                'cost' => 50000,
                'status' => 'active',
            ],
            [
                'type' => 'Overnight Shipping',
                'description' => 'Delivery next business day',
                'cost' => 100000,
                'status' => 'active',
            ],
            [
                'type' => 'Pickup',
                'description' => 'Free pickup at our store',
                'cost' => 0,
                'status' => 'active',
            ],
        ];

        foreach ($shippings as $shipping) {
            Shipping::firstOrCreate(
                ['type' => $shipping['type']],
                $shipping
            );
        }
    }
}
