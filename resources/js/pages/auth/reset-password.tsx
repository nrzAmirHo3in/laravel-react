import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    phone: string;
}

type ResetPasswordForm = {
    token: string;
    phone: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, phone }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        phone: phone,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="بازنشانی رمز عبور" description="لطفاً رمز عبور جدید خود را وارد کنید"  className="border p-5 rounded-md shadow">
            <Head title="بازنشانی رمز عبور" />

            <form onSubmit={submit} dir='rtl'>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <Input
                            id="phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={data.phone}
                            className="mt-1 block w-full"
                            readOnly
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="رمز عبور جدید"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">تأیید رمز عبور</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="تأیید رمز عبور"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        بازنشانی رمز عبور
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
