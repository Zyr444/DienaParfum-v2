import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ coupons = [] }) {
    const user = usePage().props.auth.user;
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Pelanggan
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome banner */}
                    <div className="relative overflow-hidden bg-black rounded-2xl p-8 mb-8 border border-[#D4AF37]/30 shadow-xl">
                        {/* Gold decorative gradient overlay */}
                        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Diena Parfum Club ✦</span>
                            <h1 className="text-3xl font-serif text-white mt-2 mb-3">Selamat Datang Kembali, {user.name}!</h1>
                            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                                Terima kasih telah menjadi pelanggan setia Diena Parfum. Jelajahi penawaran eksklusif dan voucher diskon khusus Anda di bawah ini untuk berbelanja koleksi aroma premium kami.
                            </p>
                            <div className="mt-6">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#FDE08B] to-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
                                >
                                    Belanja Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Vouchers Section */}
                    <div>
                        <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-[#D4AF37]">✦</span> Voucher & Diskon Spesial Untukmu
                        </h3>

                        {coupons.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
                                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 text-sm">Saat ini belum ada voucher aktif yang tersedia.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {coupons.map((coupon) => (
                                    <div 
                                        key={coupon.id} 
                                        className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors"
                                    >
                                        {/* Ticket side notches */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-r-full border-y border-r border-gray-200 z-10"></div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-l-full border-y border-l border-gray-200 z-10"></div>
                                        
                                        <div className="p-6 pb-4 flex gap-5 items-start">
                                            {/* Voucher icon / percentage box */}
                                            <div className="w-16 h-16 bg-black text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg flex flex-col items-center justify-center font-bold text-center flex-shrink-0">
                                                <span className="text-lg leading-none">
                                                    {coupon.type === 'percent' ? `${Math.floor(coupon.value)}%` : 'Rp'}
                                                </span>
                                                <span className="text-[9px] uppercase tracking-widest mt-1">
                                                    {coupon.type === 'percent' ? 'Off' : 'Disc'}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                                                    {coupon.type === 'percent' ? 'Potongan Persentase' : 'Potongan Harga'}
                                                </span>
                                                <h4 className="text-xl font-bold font-serif text-gray-900 mt-0.5">
                                                    {coupon.type === 'percent' 
                                                        ? `Diskon ${Math.floor(coupon.value)}%` 
                                                        : `Diskon ${formatRupiah(coupon.value)}`
                                                    }
                                                </h4>
                                                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                                                    Gunakan kode voucher ini pada saat melakukan checkout via WhatsApp untuk mengaktifkan potongan harga.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-dashed border-gray-200 mx-6"></div>

                                        {/* Code Copy Area */}
                                        <div className="p-4 bg-gray-50/50 px-6 flex justify-between items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-wider text-gray-400">Kode Voucher</span>
                                                <span className="font-mono text-sm font-bold text-gray-800 tracking-wider select-all">
                                                    {coupon.code}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(coupon.code)}
                                                className={`px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-widest transition-all ${
                                                    copiedCode === coupon.code
                                                        ? 'bg-green-600 text-white shadow-sm'
                                                        : 'bg-black text-white hover:bg-gray-800'
                                                }`}
                                            >
                                                {copiedCode === coupon.code ? 'Tersalin ✓' : 'Salin Kode'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
