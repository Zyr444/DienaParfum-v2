<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Hapus kolom lama jika ada
            if (Schema::hasColumn('products', 'category')) {
                $table->dropColumn('category');
            }
            
            // Tambah kolom baru hanya jika belum ada
            if (!Schema::hasColumn('products', 'title')) {
                $table->string('title')->after('name')->nullable();
            }
            
            if (!Schema::hasColumn('products', 'slug')) {
                $table->string('slug')->unique()->after('title')->nullable();
            }
            
            if (!Schema::hasColumn('products', 'summary')) {
                $table->text('summary')->nullable()->after('description');
            }
            
            if (!Schema::hasColumn('products', 'original_price')) {
                $table->decimal('original_price', 10, 2)->nullable()->after('price');
            }
            
            if (!Schema::hasColumn('products', 'category_id')) {
                $table->foreignId('category_id')->nullable()->after('stock')->constrained('categories')->onDelete('set null');
            }
            
            if (!Schema::hasColumn('products', 'brand_id')) {
                $table->foreignId('brand_id')->nullable()->after('category_id')->constrained('brands')->onDelete('set null');
            }
            
            if (!Schema::hasColumn('products', 'photo')) {
                $table->string('photo')->nullable()->after('image');
            }
            
            if (!Schema::hasColumn('products', 'sku')) {
                $table->string('sku')->unique()->nullable()->after('photo');
            }
            
            if (!Schema::hasColumn('products', 'status')) {
                $table->enum('status', ['active', 'inactive'])->default('active')->after('sku');
            }
            
            if (!Schema::hasColumn('products', 'added_by')) {
                $table->unsignedBigInteger('added_by')->nullable()->after('status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor('categories');
            $table->dropConstrainedForeignIdFor('brands');
            $table->dropUnique(['slug']);
            $table->dropUnique(['sku']);
            $table->dropColumn(['title', 'slug', 'original_price', 'summary', 'category_id', 'brand_id', 'sku', 'status', 'added_by']);
            $table->string('category')->nullable();
        });
    }
};
