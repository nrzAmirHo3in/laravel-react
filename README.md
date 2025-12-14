# Laravel + React Starter (Laravel-React)
A minimal full-stack starter combining a PHP Laravel backend and a TypeScript/JavaScript React frontend for building API-driven web apps — with built-in Auth API, phone SMS login/verification section, and Persian (Farsi) font support.

نسخه فارسی (اول)
----------------
این مخزن یک استارتر ساده فول‌استک است که بک‌اند آن با Laravel (PHP) و فرانت‌اند آن با React (TypeScript/JavaScript) ساخته شده است. 
این پروژه به صورت پیش‌فرض:
- API و Auth API نصب و آماده‌اند
- بخش ورود/ثبت‌نام با SMS موبایل اضافه شده
- فونت فارسی (Persian font) اضافه و تنظیم شده تا تجربه کاربری مناسب برای زبان فارسی داشته باشید

ویژگی‌ها
- API-driven architecture (Laravel API + React frontend)
- Authentication APIs (register, login, logout, refresh token, password reset)
- Phone SMS verification / login flow (قابلیت ارسال کد به موبایل)
- Persian font and RTL-friendly base styling
- Typescript-ready React frontend
- Ready-to-customize boilerplate for production

Short description (for GitHub repo description)
- Persian: استارتر ساده لاراول + ری‌اکت با API، احراز هویت و پشتیبانی از ورود با پیامک و فونت فارسی
- English: Minimal Laravel + React starter with preinstalled API & Auth, SMS phone login support, and Persian font

Quick demo (replace with your own screenshots)
![Screenshot placeholder](./docs/screenshot.png)

Requirements / ملزومات
- PHP 8.1+ (or your project's required PHP version)
- Composer
- Node.js 16+ and npm or yarn
- MySQL / PostgreSQL or other supported DB
- (Optional) SMS provider account (e.g., Twilio, Kavenegar, or local SMS gateway)

Installation — Backend (Laravel)
1. Clone the repo:
   git clone https://github.com/nrzAmirHo3in/laravel-react.git
   cd laravel-react

2. Install PHP dependencies:
   composer install

3. Copy and edit environment file:
   cp .env.example .env
   Edit .env and set DB_* and APP_URL, and SMS provider variables (see below).

4. Generate app key:
   php artisan key:generate

5. Run migrations and seeders:
   php artisan migrate --seed

6. Start the Laravel server (local dev):
   php artisan serve

Environment variables (important ones)
- APP_URL=http://localhost:8000
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=laravel_react
- DB_USERNAME=root
- DB_PASSWORD=

SMS provider (example placeholders):
- SMS_PROVIDER=twilio
- SMS_ACCOUNT_SID=your_twilio_sid
- SMS_AUTH_TOKEN=your_twilio_token
- SMS_FROM=+1234567890

(If you use a local Iranian provider like Kavenegar, replace placeholders accordingly. Keep API keys secret.)

Installation — Frontend (React)
1. Move to frontend folder (adjust path if different):
   cd frontend
2. Install dependencies:
   npm install
   # or
   yarn
3. Copy environment example:
   cp .env.example .env
   # Set API base URL, e.g. REACT_APP_API_URL=http://localhost:8000/api
4. Start dev server:
   npm run dev
   # or
   yarn dev

API and Auth
This project includes preinstalled API and Auth API endpoints (example endpoint names — update to match your code):
- POST /api/auth/register — Register a new user
- POST /api/auth/login — Login with email/password
- POST /api/auth/logout — Logout
- POST /api/auth/refresh — Refresh token
- POST /api/auth/request-sms — Request SMS code for phone login
- POST /api/auth/verify-sms — Verify SMS code and login/register

Check the backend routes file (routes/api.php) for the exact routes and middlewares.

Persian font & RTL
- The frontend includes a Persian font and basic RTL adjustments. If you need alternate fonts, replace font files in `frontend/public/fonts` (or where fonts are stored) and update CSS accordingly.

Deployment tips
- Serve Laravel with php-fpm + Nginx or shared hosting
- Build frontend for production: npm run build (or yarn build) and serve the build folder; you can also integrate the built assets into Laravel `public` folder or host frontend separately
- Use HTTPS in production and configure environment variables securely
- Consider queuing SMS sending (Laravel queue) for production reliability

Security & best practices
- Never commit your .env with secrets
- Use strong keys & rotate SMS/API keys
- Rate-limit SMS endpoints to avoid abuse
- Use HTTPS, CSP and secure cookies in production

License
I recommend MIT for open source permissive licensing. To add:
   curl -L https://opensource.org/licenses/MIT -o LICENSE
Or create a LICENSE file with the standard MIT template.

How to make the repo public (so all people can see it)
1. GitHub website:
   - Go to your repository page -> Settings -> General -> Danger Zone -> Change repository visibility -> Make public.
   - Confirm by typing the repo name when prompted.
2. GitHub CLI:
   - Install GitHub CLI (gh) and authenticate:
     gh auth login
   - Run:
     gh repo edit nrzAmirHo3in/laravel-react --visibility public

Add topics/tags (recommended)
- laravel
- react
- typescript
- php
- full-stack
- starter
- api
- auth
- sms
- persian
- farsi
- rtl

Contributing
- Create issues for bug reports and new feature requests in Persian or English.
- Use standard GitHub flow: fork -> branch -> PR -> review

Support / تماس
- If you want support in Persian, add an Issue with label "question" and write in Persian.

Acknowledgements
- Built as a minimal starter for API-driven web apps with Persian support and SMS auth flow.

Contact
- GitHub: https://github.com/nrzAmirHo3in

---

If you'd like, I can:
- Make a ready-to-add LICENSE file (MIT) and provide the content.
- Add example .env.example snippets with SMS provider examples (Twilio and Kavenegar) and sample curl commands to test SMS endpoints.
- Translate sections or expand API docs (route list, request/response examples) in Persian.
