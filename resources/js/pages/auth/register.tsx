import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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

    // نمایش خطاها با toast
    useEffect(() => {
        if (errors.name) toast.error(errors.name);
        if (errors.phone) {
            const message = errors.phone === 'The phone has already been taken.' 
                ? 'این شماره تلفن قبلاً ثبت شده است'
                : errors.phone;
            toast.error(message);
        }
        if (errors.verification_code) toast.error(errors.verification_code);
        if (errors.password) toast.error(errors.password);
        if (errors.password_confirmation) toast.error(errors.password_confirmation);
    }, [errors]);

    const sendVerificationCode = async () => {
        const phonePattern = /^09\d{9}$/;
        if (!phonePattern.test(data.phone)) {
            toast.error('لطفاً شماره تلفن معتبر وارد کنید (مثال: 09123456789)');
            return;
        }

        setSendingCode(true);
        try {
            await post(route('send-phone-verification'), {
                data: { phone: data.phone },
                preserveScroll: true,
                onSuccess: () => {
                    setCodeSent(true);
                    toast.success('کد تایید به شماره شما ارسال شد');
                },
                onError: (errors) => {
                    if (errors.phone) {
                        toast.error(errors.phone);
                    } else {
                        toast.error('خطا در ارسال کد تایید');
                    }
                }
            });
        } finally {
            setSendingCode(false);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // ولیدیشن‌های کلاینت
        const phonePattern = /^09\d{9}$/;
        if (!phonePattern.test(data.phone)) {
            toast.error('شماره تلفن باید با 09 شروع شود و 11 رقم باشد');
            return;
        }

        if (data.password.length < 6) {
            toast.error('رمز عبور باید حداقل 6 کاراکتر باشد');
            return;
        }

        if (data.password !== data.password_confirmation) {
            toast.error('رمز عبور و تأیید رمز عبور مطابقت ندارند');
            return;
        }

        if (!data.verification_code) {
            toast.error('لطفاً کد تایید را وارد کنید');
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation', 'verification_code'),
            onSuccess: () => {
                toast.success('حساب کاربری با موفقیت ایجاد شد!');
            },
            onError: (errors) => {
                if (errors.message) {
                    toast.error(errors.message);
                }
            },
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
                            autoFocus
                            tabIndex={1}
                            autoComplete="off"
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
                                tabIndex={2}
                                autoComplete="off"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing || codeSent}
                                placeholder="09123456789"
                            />
                            <Button type="button" onClick={sendVerificationCode} disabled={sendingCode || codeSent || processing}>
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
                                tabIndex={3}
                                value={data.verification_code}
                                onChange={(e) => setData('verification_code', e.target.value)}
                                placeholder="کد تایید"
                                disabled={processing}
                            />
                            <InputError message={errors.verification_code} />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input
                            id="password"
                            type="password"
                            tabIndex={4}
                            autoComplete="off"
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
                            tabIndex={5}
                            autoComplete="off"
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