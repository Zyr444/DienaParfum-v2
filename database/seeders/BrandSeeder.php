<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['title' => 'Chanel', 'slug' => 'chanel'],
            ['title' => 'Dior', 'slug' => 'dior'],
            ['title' => 'Guerlain', 'slug' => 'guerlain'],
            ['title' => 'Hermes', 'slug' => 'hermes'],
            ['title' => 'Lancome', 'slug' => 'lancome'],
            ['title' => 'Prada', 'slug' => 'prada'],
            ['title' => 'Versace', 'slug' => 'versace'],
            ['title' => 'Yves Saint Laurent', 'slug' => 'yves-saint-laurent'],
        ];

        foreach ($brands as $brand) {
            Brand::firstOrCreate(
                ['slug' => $brand['slug']],
                $brand + ['status' => 'active']
            );
        }
    }
}
