import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#070707] justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[30%] right-[10%] w-40 h-40 bg-[#AA8529]/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 mb-8 flex flex-col items-center">
                <Link href="/" className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black/50 hover:border-[#D4AF37] transition-all">
                        <span className="text-3xl font-serif text-[#D4AF37] leading-none">D</span>
                    </div>
                    <span className="text-xl font-serif tracking-[0.3em] uppercase text-white mt-2">Diena Parfum</span>
                </Link>
            </div>

            <div className="z-10 w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-md border border-[#D4AF37]/20 p-8 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                {children}
            </div>
        </div>
    );
}
