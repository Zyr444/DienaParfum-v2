<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Parent categories
        $categories = [
            [
                'title' => "Men's Fragrance",
                'slug' => 'mens-fragrance',
                'is_parent' => true,
                'parent_id' => null,
                'status' => 'active',
            ],
            [
                'title' => "Women's Fragrance",
                'slug' => 'womens-fragrance',
                'is_parent' => true,
                'parent_id' => null,
                'status' => 'active',
            ],
            [
                'title' => 'Unisex Fragrance',
                'slug' => 'unisex-fragrance',
                'is_parent' => true,
                'parent_id' => null,
                'status' => 'active',
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }

        // Sub categories
        $parentMens = Category::where('slug', 'mens-fragrance')->first();
        $parentWomens = Category::where('slug', 'womens-fragrance')->first();

        if ($parentMens) {
            $subCategories = [
                ['title' => 'Cologne', 'slug' => 'mens-cologne', 'parent_id' => $parentMens->id],
                ['title' => 'Eau de Toilette', 'slug' => 'mens-eau-de-toilette', 'parent_id' => $parentMens->id],
                ['title' => 'Eau de Parfum', 'slug' => 'mens-eau-de-parfum', 'parent_id' => $parentMens->id],
            ];

            foreach ($subCategories as $sub) {
                Category::firstOrCreate(
                    ['slug' => $sub['slug']],
                    $sub + ['is_parent' => false, 'status' => 'active']
                );
            }
        }

        if ($parentWomens) {
            $subCategories = [
                ['title' => 'Eau de Toilette', 'slug' => 'womens-eau-de-toilette', 'parent_id' => $parentWomens->id],
                ['title' => 'Eau de Parfum', 'slug' => 'womens-eau-de-parfum', 'parent_id' => $parentWomens->id],
                ['title' => 'Perfume', 'slug' => 'womens-perfume', 'parent_id' => $parentWomens->id],
            ];

            foreach ($subCategories as $sub) {
                Category::firstOrCreate(
                    ['slug' => $sub['slug']],
                    $sub + ['is_parent' => false, 'status' => 'active']
                );
            }
        }
    }
}
