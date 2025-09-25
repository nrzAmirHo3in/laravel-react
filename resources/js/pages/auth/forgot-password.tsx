import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ phone: string }>>({
        phone: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // ولیدیشن ساده شماره تلفن
        const phonePattern = /^09\d{9}$/;
        if (!phonePattern.test(data.phone)) {
            setData('phone', data.phone); // برای نمایش خطا
            return;
        }

        post(route('password.email'));
    };

    return (
        <AuthLayout title="فراموشی رمز عبور" description="شماره تلفن خود را وارد کنید تا لینک بازنشانی رمز عبور برایتان ارسال شود"  className="border p-5 rounded-md shadow">
            <Head title="فراموشی رمز عبور" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6" dir='rtl'>
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <Input
                            id="phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={data.phone}
                            autoFocus
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="09123456789"
                            pattern="^09\d{9}$"
                        />

                        <InputError message={errors.phone} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            ارسال لینک بازنشانی رمز عبور
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>یا بازگشت به </span>
                    <TextLink href={route('login')}>صفحه ورود</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
