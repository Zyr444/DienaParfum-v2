# Gunakan base image PHP versi 8.3
FROM php:8.3-cli

# Install dependencies yang dibutuhkan Laravel dan Node.js untuk React
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Bersihkan cache instalasi
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install ekstensi PHP untuk database
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set folder kerja di dalam container
WORKDIR /var/www

# Copy seluruh file project Diena Parfum ke dalam container
COPY . .

# Expose port 8000 untuk Laravel dan 5173 untuk Vite/React
EXPOSE 8000
EXPOSE 5173

# Perintah default saat container dijalankan
CMD php artisan serve --host=0.0.0.0 --port=8000