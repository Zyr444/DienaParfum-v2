import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Akun" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-white mb-2">Selamat Datang</h2>
                <p className="text-xs text-gray-500">Masuk untuk melihat voucher eksklusif Anda</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-500 bg-green-950/20 border border-green-500/20 rounded-xl p-3 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-[#111] border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-white rounded-xl placeholder-gray-700"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Masukkan alamat email..."
                    />

                    <InputError message={errors.email} className="mt-2 text-xs text-red-500" />
                </div>

                <div className="mt-5">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-[#111] border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-white rounded-xl placeholder-gray-700"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukkan password..."
                    />

                    <InputError message={errors.password} className="mt-2 text-xs text-red-500" />
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="bg-[#111] border-gray-800 text-[#D4AF37] focus:ring-0 rounded"
                        />
                        <span className="ms-2 text-xs text-gray-400">
                            Ingat Saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs text-gray-500 hover:text-[#D4AF37] transition-colors"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>

                <div className="mt-8">
                    <PrimaryButton className="w-full py-3.5 bg-gradient-to-r from-[#FDE08B] via-[#D4AF37] to-[#AA8529] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center gap-2 border-0" disabled={processing}>
                        Masuk
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-900 pt-6">
                Belum memiliki akun?{' '}
                <Link href={route('register')} className="text-[#D4AF37] hover:underline font-semibold">
                    Daftar Sekarang
                </Link>
            </div>
        </GuestLayout>
    );
}
