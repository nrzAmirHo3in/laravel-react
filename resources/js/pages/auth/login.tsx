import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    phone: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        phone: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // ولیدیشن ساده شماره تلفن قبل از ارسال
        const phonePattern = /^09\d{9}$/;
        if (!phonePattern.test(data.phone)) {
            setData('phone', data.phone); // برای نمایش خطا
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="ورود به حساب کاربری" description="شماره تلفن و رمز عبور خود را وارد کنید"  className="border p-5 rounded-md shadow">
            <Head title="ورود" />

            <form className="flex flex-col gap-6" onSubmit={submit} dir='rtl'>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="09123456789"
                            pattern="^09\d{9}$"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">رمز عبور</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="mr-auto text-sm" tabIndex={5}>
                                    فراموشی رمز عبور؟
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="رمز عبور"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">مرا به خاطر بسپار</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        ورود
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    حساب کاربری ندارید؟{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        ثبت نام
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
