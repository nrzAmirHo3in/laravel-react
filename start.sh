#!/usr/bash
composer i
npm i
php artisan migrate
cp .env.example .env
php artisan key:generate