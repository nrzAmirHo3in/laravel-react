<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Ichtrojan\Otp\Otp;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    protected $otp;

    public function __construct()
    {
        $this->otp = new Otp();
    }
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }
    // ارسال کد تایید
    public function sendPhoneVerification(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'regex:/^09\d{9}$/', 'unique:users,phone'],
        ]);

        $otpData = $this->otp->generate($request->phone, 'numeric', 5);

        // اینجا باید SMS ارسال کنی
        // SmsService::send($request->phone, "کد تایید شما: " . $otpData->token);

        return back()->with('success', 'کد تایید ارسال شد.');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|regex:/^09\d{9}$/|unique:users,phone',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // اعتبارسنجی OTP
        $verify = $this->otp->validate($request->phone, $request->verification_code);

        if (!$verify->status) {
            throw ValidationException::withMessages([
                'verification_code' => [$verify->message],
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
