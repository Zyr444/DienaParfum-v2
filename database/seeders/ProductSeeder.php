<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 11 local perfume images, rotated across all 30 products
        $allImages = [
            '/images/elysian_scent.png',
            '/images/oud_imperial.png',
            '/images/midnight_rose.png',
            '/images/santal_majuscule.png',
            '/images/noir_crystal.png',
            '/images/royal_gold.png',
            '/images/rose_velvet.png',
            '/images/ocean_breeze.png',
            '/images/forest_essence.png',
            '/images/amber_sun.png',
            '/images/midnight_lavender.png',
        ];

        $categories = ['sweet', 'strong', 'vanilla'];
        $faker = \Faker\Factory::create();

        $aromaNames = [
            'Orchid & Midnight Jasmine', 'Ancient Agarwood', 'Amber & Black Pepper',
            'Sandalwood & Cacao', 'Silver Reflections', 'Carrara Legacy',
            'Crimson Silk', 'Morning Stone', 'Misty Emerald', 'Teardrop Horizon',
            'Violet Lavender', 'Imperial Elixir', 'Celestial Aura', 'Velvet Soul',
            'Divine Dreams', 'Radiant Spirit', 'Sacred Grace', 'Infinite Light',
            'Royal Scent', 'Pure Mist', 'Midnight Glow', 'Golden Heart',
            'Mystic Essence', 'Bergamot Noir', 'Neroli Bloom', 'Vetiver Smoke',
            'Cardamom Spice', 'Tonka Vanilla', 'Leather Oud', 'Rose Absolute'
        ];

        $notes = ['Bergamot', 'Patchouli', 'Neroli', 'Vetiver', 'Cardamom', 'Ylang-Ylang', 'Tonka Bean', 'Leather', 'Jasmine', 'Oud', 'Rose', 'Vanilla', 'Sandalwood', 'Musk'];

        $products = [];

        for ($i = 0; $i < 30; $i++) {
            $note1 = $faker->randomElement($notes);
            $note2 = $faker->randomElement($notes);

            $products[] = [
                'name'        => "Diena Parfume | " . $aromaNames[$i],
                'description' => "A masterfully crafted signature scent by Diena Parfume, blending top notes of {$note1} with base notes of {$note2} for a truly unique and unforgettable experience.",
                'price'       => $faker->numberBetween(18, 60) * 100000,
                'image'       => $allImages[$i % count($allImages)],
                'stock'       => $faker->numberBetween(5, 25),
                'category'    => $categories[$i % 3],
            ];
        }

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
