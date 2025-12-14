# Laravel + React Starter (Laravel-React)

<div align="center">

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net)

</div>

<div align="center">
  A minimal full-stack starter combining PHP Laravel backend and TypeScript/JavaScript React frontend for building API-driven web applications — with built-in Auth API, phone SMS login/verification, and Persian (Farsi) font support.
</div>

## 🇮🇷 نسخه فارسی (اول)

این مخزن یک استارتر ساده فول‌استک است که بک‌اند آن با Laravel (PHP) و فرانت‌اند آن با React (TypeScript/JavaScript) ساخته شده است.
این پروژه به صورت پیش‌فرض:

- API و Auth API نصب و آماده‌اند
- بخش ورود/ثبت‌نام با SMS موبایل اضافه شده
- فونت فارسی (Persian font) اضافه و تنظیم شده تا تجربه کاربری مناسب برای زبان فارسی داشته باشید
- 
## ✨ Features

- 🔐 **Authentication APIs** - Register, login, logout, refresh token, password reset
- 📱 **Phone SMS verification / login flow** - Capability to send verification codes to mobile phones
- 🌍 **Persian font and RTL-friendly** - Base styling optimized for right-to-left languages
- ⚛️ **TypeScript-ready React frontend** - With modern React features and type safety
- 🏗️ **API-driven architecture** - Clean separation between Laravel API and React frontend
- 🚀 **Ready-to-customize boilerplate** - Perfect foundation for production applications
- 🇮🇷 **Native Persian/Farsi support** - Optimized for Iranian developers and users

## 🛠️ Requirements

### Backend (Laravel)
- PHP 8.1+
- Composer
- MySQL / PostgreSQL or other supported database

### Frontend (React)
- Node.js 16+
- npm or yarn

## 🚀 Installation

### Backend Setup (Laravel)

```bash
# 1. Clone the repository
git clone https://github.com/nrzAmirHo3in/laravel-react.git
cd laravel-react

# 2. Install node dependencies
npm install

# 3. Install PHP dependencies
composer install

# 4. Copy and edit environment file
cp .env.example .env
```

Edit `.env` and set `DB_*`, `APP_URL`

```bash
# 4. Generate application key
php artisan key:generate

# 5. Run migrations and seeders
php artisan migrate --seed

# 6. Start the server (for local development)
composer run dev
```

> Or you can run start file with ```sh start.sh```

### Environment Variables

#### Laravel Backend
```
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react
DB_USERNAME=root
DB_PASSWORD=
```

## 📡 API Endpoints

This project includes preinstalled authentication API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ping` | Test ping without token |
| GET | `/api/auth/ping` | Test ping with token |

> Check the backend routes file (`routes/api.php`) for the exact routes and middlewares.

## 📖 Persian Font & RTL Support

The frontend includes Persian font and basic RTL adjustments. If you need alternate fonts, replace font files in `resources/css/fonts` (or where fonts are stored) and update CSS accordingly.

## 🌐 Deployment Tips

- Serve Laravel with php-fpm + Nginx or shared hosting
- Build frontend for production: `npm run build` (or `yarn build`) and serve the build folder
- You can integrate the built assets into Laravel `public` folder or host frontend separately
- Use HTTPS in production and configure environment variables securely
- Consider queuing SMS sending (Laravel queue) for production reliability

## 🔒 Security Best Practices

- Never commit your `.env` file with secrets
- Use strong keys & rotate SMS/API keys regularly
- Rate-limit SMS endpoints to avoid abuse
- Use HTTPS, CSP and secure cookies in production
- Implement proper validation and sanitization for all user inputs

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Create issues for bug reports and new feature requests in Persian or English.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support / تماس

- If you want support in Persian, add an Issue with label "question" and write in Persian.
- For general support, create an issue in English.

## 🙏 Acknowledgements

- Built as a minimal starter for API-driven web apps with Persian support and SMS auth flow
- Inspired by the need for full-stack solutions with native Persian/Farsi support
- Appreciation to the Laravel and React communities for their excellent documentation and resources

## 🧑‍💻 Author

- **Amir Ho3in** - [nrzAmirHo3in](https://github.com/nrzAmirHo3in)

## 🏷️ Keywords

laravel, react, typescript, php, full-stack, starter, api, auth, sms, persian, farsi, rtl, authentication, mobile-verfication

---

<div align="center">

⭐ If you find this project useful, please give it a star! It helps the project reach more developers.

</div>

