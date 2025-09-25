import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    phone: string;
    verification_code: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        phone: '',
        verification_code: '',
        password: '',
        password_confirmation: '',
    });

    const [codeSent, setCodeSent] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);

    const sendVerificationCode = async () => {
        const phonePattern = /^09\d{9}$/;
        if (!phonePattern.test(data.phone)) {
            alert('لطفاً شماره تلفن معتبر وارد کنید.');
            return;
        }

        setSendingCode(true);
        try {
            await post(route('send-phone-verification'), {
                data: { phone: data.phone },
                preserveScroll: true,
            });
            setCodeSent(true);
            alert('کد تایید به شماره شما ارسال شد.');
        } finally {
            setSendingCode(false);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation', 'verification_code'),
        });
    };

    return (
        <AuthLayout title="ساخت حساب کاربری" description="جزئیات خود را وارد کنید تا حساب کاربری ایجاد شود" className="border p-5 rounded-md shadow">
            <Head title="ثبت‌نام" />
            <form className="flex flex-col gap-6" onSubmit={submit} dir='rtl'>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">نام و نام خانوادگی</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="نام کامل"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <div className="flex gap-2">
                            <Input
                                id="phone"
                                type="tel"
                                required
                                tabIndex={2}
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing || codeSent}
                                placeholder="09123456789"
                            />
                            <Button type="button" onClick={sendVerificationCode} disabled={sendingCode || codeSent}>
                                {sendingCode ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'ارسال کد'}
                            </Button>
                        </div>
                        <InputError message={errors.phone} />
                    </div>

                    {codeSent && (
                        <div className="grid gap-2">
                            <Label htmlFor="verification_code">کد تایید شماره تلفن</Label>
                            <Input
                                id="verification_code"
                                type="text"
                                required
                                tabIndex={3}
                                value={data.verification_code}
                                onChange={(e) => setData('verification_code', e.target.value)}
                                placeholder="کد تایید"
                            />
                            <InputError message={errors.verification_code} />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="رمز عبور"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">تأیید رمز عبور</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={5}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="تأیید رمز عبور"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        ساخت حساب
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    حساب کاربری دارید؟{' '}
                    <TextLink href={route('login')} tabIndex={7}>
                        ورود
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
