#!/usr/bash
composer i
npm i
php artisan migrate
php artisan key:generate