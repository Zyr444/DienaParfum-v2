import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-white mb-2">Daftar Akun Baru</h2>
                <p className="text-xs text-gray-500">Buat akun untuk mendapatkan promo & voucher eksklusif</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-[#111] border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-white rounded-xl placeholder-gray-700"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nama lengkap Anda..."
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-xs text-red-500" />
                </div>

                <div className="mt-5">
                    <InputLabel htmlFor="email" value="Email" className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-[#111] border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-white rounded-xl placeholder-gray-700"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Email aktif Anda..."
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Minimal 8 karakter..."
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-xs text-red-500" />
                </div>

                <div className="mt-5">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-[#111] border-gray-800 focus:border-[#D4AF37] focus:ring-[#D4AF37] text-white rounded-xl placeholder-gray-700"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        placeholder="Ulangi password..."
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-xs text-red-500"
                    />
                </div>

                <div className="mt-8">
                    <PrimaryButton className="w-full py-3.5 bg-gradient-to-r from-[#FDE08B] via-[#D4AF37] to-[#AA8529] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center gap-2 border-0" disabled={processing}>
                        Daftar Akun
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-900 pt-6">
                Sudah memiliki akun?{' '}
                <Link href={route('login')} className="text-[#D4AF37] hover:underline font-semibold">
                    Masuk
                </Link>
            </div>
        </GuestLayout>
    );
}
