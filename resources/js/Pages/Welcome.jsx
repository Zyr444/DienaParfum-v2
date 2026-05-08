import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import { translations } from '../translations';

// Helper component for Gold Dust Particles & Smoke
const SmokeParticles = ({ isFront = false }) => {
    // Generate stable random values using useMemo so they don't break on re-render
    const particles = useMemo(() => {
        return Array.from({ length: isFront ? 15 : 25 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 80 + 10; // 10% to 90%
            const top = Math.random() * 40 + 60; // 60% to 100%
            const driftY = (Math.random() * 150 + 100) * -1; // -100px to -250px (move up)
            const driftX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20); // drift left/right
            const duration = Math.random() * 5 + 5; // 5s to 10s
            const delay = Math.random() * 5;
            const maxOpacity = Math.random() * 0.6 + 0.3;
            
            return { id: i, size, left, top, driftX, driftY, duration, delay, maxOpacity };
        });
    }, [isFront]);

    return (
        <div className={`absolute inset-0 overflow-visible pointer-events-none mix-blend-screen ${isFront ? 'z-20' : 'z-0'}`}>
            {/* Volumetric background smoke clouds (only behind) */}
            {!isFront && (
                <>
                    <motion.div 
                        animate={{ x: [-20, 20, -20], y: [10, -30, 10], opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-[#D4AF37]/20 rounded-full blur-[80px]"
                    />
                    <motion.div 
                        animate={{ x: [30, -10, 30], y: [-20, 20, -20], opacity: [0.1, 0.3, 0.1], scale: [1.2, 0.9, 1.2] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute bottom-[20%] right-[5%] w-[350px] h-[250px] bg-[#AA8529]/25 rounded-full blur-[90px]"
                    />
                </>
            )}

            {/* Drifting Gold Embers/Dust */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                        y: p.driftY, 
                        x: p.driftX,
                        opacity: [0, p.maxOpacity, p.maxOpacity, 0],
                        scale: [0, 1, 1, 0]
                    }}
                    transition={{ 
                        duration: p.duration, 
                        delay: p.delay, 
                        repeat: Infinity, 
                        ease: "easeOut" 
                    }}
                    className="absolute bg-[#FDE08B] rounded-full blur-[1px]"
                    style={{ 
                        left: `${p.left}%`, 
                        top: `${p.top}%`, 
                        width: p.size, 
                        height: p.size, 
                        boxShadow: '0 0 10px rgba(253,224,139,0.9)' 
                    }}
                />
            ))}
        </div>
    );
};
export default function Welcome({ auth, laravelVersion, phpVersion, products }) {
        const [language, setLanguage] = useState('id');
    const t = translations[language];

    // Toggle Handlers
    const toggleLanguage = () => setLanguage(lang => lang === 'id' ? 'en' : 'id');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);
    const [openFaq, setOpenFaq] = useState(null);
    const [isNavScrolled, setIsNavScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsNavScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const categories = ['all', 'sweet', 'strong', 'vanilla'];

    const filteredProducts = products.filter(p => {
        const matchCat = selectedCategory === 'all' ? true : p.category === selectedCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const testimonials = [
        { name: "Aisyah R.", city: "Jakarta", rating: 5, text: "Aromanya luar biasa tahan lama, sudah lebih dari 12 jam masih tercium! Packaging-nya pun sangat premium dan elegan." },
        { name: "Budi S.", city: "Bandung", rating: 5, text: "Diena Parfum is my go-to. Oud Imperial benar-benar seperti parfum Dubai yang saya coba dulu. Worth every penny!" },
        { name: "Citra M.", city: "Surabaya", rating: 5, text: "Dikirim cepat, aroma Midnight Rose sangat seducing. Dapat banyak pujian dari teman-teman. Pasti repeat order!" },
        { name: "Dito A.", city: "Yogyakarta", rating: 5, text: "Sempat ragu pesan online, tapi ternyata kualitasnya melampaui ekspektasi. Elysian Scent jadi favorit saya!" },
        { name: "Eka P.", city: "Medan", rating: 5, text: "Santal Majuscule cocok banget untuk daily wear. Hangat, soft, dan tidak terlalu tajam. Sangat recommend!" },
    ];

    const faqs = [
        { q: "Berapa lama ketahanan aroma Diena Parfum?", a: "Produk kami menggunakan konsentrasi minyak esensial premium yang dapat bertahan 8-14 jam di kulit, tergantung jenis kulit dan kondisi cuaca." },
        { q: "Apakah produk Diena Parfum original?", a: "Ya, 100% original. Setiap produk kami dibuat dari bahan-bahan terpilih yang diimport langsung dari supplier terpercaya di Prancis dan Timur Tengah." },
        { q: "Bagaimana cara pemesanan?", a: "Cukup tambahkan produk ke keranjang, lalu klik tombol 'Checkout via WhatsApp'. Pesanan Anda akan langsung terhubung ke admin kami." },
        { q: "Apakah tersedia COD?", a: "Ya, kami melayani COD untuk wilayah Jabodetabek. Untuk luar kota, tersedia pengiriman via JNE, J&T, dan SiCepat." },
        { q: "Apakah bisa request sample?", a: "Saat ini kami belum menyediakan layanan sample. Namun Anda bisa chat langsung dengan admin kami untuk konsultasi aroma sebelum membeli." },
    ];

    const addToCart = (product) => {
        setCart(prev => {
            const currentQty = prev[product.id]?.quantity || 0;
            if (currentQty < product.stock) {
                return {
                    ...prev,
                    [product.id]: {
                        product: product,
                        quantity: currentQty + 1
                    }
                };
            }
            return prev;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId]) {
                newCart[productId].quantity -= 1;
                if (newCart[productId].quantity <= 0) {
                    delete newCart[productId];
                }
            }
            return newCart;
        });
    };

    const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const handleWhatsAppCheckout = () => {
        if (cartItemCount === 0) return;
        
        let message = "Halo Diena Parfum, saya mau pesan:\n\n";
        Object.values(cart).forEach(item => {
            message += `- ${item.product.name} (${item.quantity}x) = ${formatRupiah(item.product.price * item.quantity)}\n`;
        });
        message += `\n*Total: ${formatRupiah(cartTotal)}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6289531222146?text=${encodedMessage}`, '_blank');
    };

    // Countdown Timer — target: 3 days from now
    const [countdown, setCountdown] = useState({ h: '00', m: '00', s: '00' });
    useEffect(() => {
        const target = new Date();
        target.setHours(target.getHours() + 72); // 72 jam
        const saved = localStorage.getItem('diena_promo_end');
        const end = saved ? new Date(saved) : target;
        if (!saved) localStorage.setItem('diena_promo_end', end.toISOString());
        const tick = () => {
            const diff = end - new Date();
            if (diff <= 0) { setCountdown({ h: '00', m: '00', s: '00' }); return; }
            const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
            const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
            setCountdown({ h, m, s });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const GoldLeaf = ({ className, delay = 0, yOffset = 20 }) => (
        <motion.svg 
            animate={{ 
                y: [0, yOffset, 0],
                rotate: [-5, 5, -5],
                scale: [1, 1.05, 1]
            }}
            transition={{ 
                duration: 6 + delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            className={`absolute pointer-events-none drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)] ${className}`}
            width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" 
        >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="url(#goldGradient)"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="#4a3b0c" strokeWidth="1.5"/>
            <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FDE08B"/>
                    <stop offset="0.5" stopColor="#D4AF37"/>
                    <stop offset="1" stopColor="#AA8529"/>
                </linearGradient>
            </defs>
        </motion.svg>
    );

    return (
        <>
            <Head title="Diena Parfum — Parfum Mewah Premium Jakarta">
                <meta name="description" content="Diena Parfum – Koleksi parfum mewah premium dengan aroma tahan lama. Tersedia berbagai pilihan wewangian eksklusif. Pesan via WhatsApp, gratis ongkir Jabodetabek." />
                <meta name="keywords" content="parfum mewah, diena parfum, parfum premium, parfum jakarta, wewangian eksklusif, parfum tahan lama, oud, rose, vanilla" />
                <meta property="og:title" content="Diena Parfum — Parfum Mewah Premium Jakarta" />
                <meta property="og:description" content="Koleksi parfum mewah premium dengan aroma tahan lama 12+ jam. Pesan via WhatsApp, gratis ongkir Jabodetabek." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dienaparfum.com" />
                <meta property="og:image" content="/images/hero-noir.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Diena Parfum — Parfum Mewah Premium" />
                <meta name="twitter:description" content="Koleksi parfum premium terbaik dari Diena Parfum." />
                <link rel="canonical" href="https://dienaparfum.com" />
            </Head>
            <div className={`min-h-screen bg-[#070707] text-white selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden `}>

                {/* ── SPLASH SCREEN ── */}
                <AnimatePresence>
                    {showSplash && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
                            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
                                className="text-center"
                            >
                                <div className="text-7xl font-serif text-[#D4AF37] mb-4 tracking-widest">D</div>
                                <div className="text-xs tracking-[0.6em] text-[#D4AF37]/80 uppercase">Diena Parfum</div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%', transition: { duration: 1.5, delay: 0.4, ease: 'easeInOut' } }}
                                    className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-6"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── PROMO BANNER with Countdown ── */}
                <div className="w-full bg-gradient-to-r from-[#AA8529] via-[#D4AF37] to-[#AA8529] text-black text-center py-2 text-[11px] tracking-[0.15em] uppercase font-semibold z-40 relative flex items-center justify-center gap-4 flex-wrap px-4">
                    <span>{t.promo}</span>
                    <span className="flex items-center gap-1 bg-black/20 px-3 py-0.5 rounded-full text-[10px]">
                        {t.countdownPrefix}
                        <span className="font-mono font-bold">{countdown.h}:{countdown.m}:{countdown.s}</span>
                    </span>
                </div>

                {/* ── STICKY NAVBAR ── */}
                <nav className={`w-full px-8 lg:px-16 flex items-center justify-between z-50 sticky top-0 transition-all duration-300 ${isNavScrolled ? 'py-3 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/10 shadow-lg' : 'py-6 bg-transparent'}`}>
                    <div className="flex items-center gap-3">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4AF37]">
                            <path d="M12 2L15 8C17 9 20 9 22 10C21 13 18 15 15 16C12 17 9 17 6 16C3 15 0 13 0 10C2 9 5 9 7 8L12 2Z" fill="none"/>
                            <path d="M12 22C12 22 10 18 10 15C10 12 12 10 12 10C12 10 14 12 14 15C14 18 12 22 12 22Z" fill="currentColor"/>
                        </svg>
                        <span className="text-xl font-serif tracking-wide text-white">Diena Parfum</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm text-gray-400 font-light tracking-wider">
                        <a href="#" className="text-[#D4AF37] font-medium">{t.nav.home}</a>
                        <a href="#collection" className="hover:text-[#D4AF37] transition-colors">{t.nav.products}</a>
                        <a href="#about" className="hover:text-[#D4AF37] transition-colors">{t.nav.about}</a>
                        <a href="#faq" className="hover:text-[#D4AF37] transition-colors">{t.nav.faq}</a>
                    </div>

                    <div className="flex items-center gap-4">
                                                {/* Toggles */}
                        <div className="flex items-center gap-2 mr-2 pr-4 border-r border-gray-700">
                            <button onClick={toggleLanguage} className="text-xs font-bold text-gray-400 hover:text-[#D4AF37] transition-colors uppercase w-8">
                                {language}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showSearch && (
                                <motion.input
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    type="text"
                                    placeholder={t.nav.search}
                                    value={searchQuery}
                                    onChange={e => { setSearchQuery(e.target.value); setVisibleCount(8); }}
                                    className="bg-[#111] border border-[#D4AF37]/30 text-white text-sm px-4 py-1.5 rounded-full outline-none focus:border-[#D4AF37] transition-colors"
                                    autoFocus
                                />
                            )}
                        </AnimatePresence>
                        <button onClick={() => setShowSearch(s => !s)} className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="px-5 py-1.5 rounded-full border border-gray-700 text-xs tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-gray-300">{t.nav.dashboard}</Link>
                        ) : (
                            <Link href={route('login')} className="px-5 py-1.5 rounded-full border border-gray-700 text-xs tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-gray-300">{t.nav.login}</Link>
                        )}
                    </div>
                </nav>


                {/* Hero Section */}
                <main className="relative px-8 lg:px-16 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
                    
                    {/* Tiny background stars/dust */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"></div>
                        <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-[#FDE08B] rounded-full blur-[2px]"></div>
                        <div className="absolute bottom-[30%] left-[30%] w-2 h-2 bg-[#AA8529] rounded-full blur-[3px]"></div>
                        <div className="absolute top-[10%] right-[40%] w-1 h-1 bg-white rounded-full"></div>
                    </div>

                    {/* Left Column (Text) */}
                    <div className="lg:col-span-5 z-10 flex flex-col justify-center lg:pr-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.2] mb-6 tracking-wide"
                        >
                            {t.hero.title1} <span className="text-[#D4AF37]">{t.hero.titleHighlight1}<br/>{t.hero.title2}</span> {t.hero.title3}<br/> <span className="text-[#D4AF37]">{t.hero.titleHighlight2}</span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md font-light"
                        >
                            {t.hero.desc}
                        </motion.p>
                        
                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.8, delay: 0.4 }}
                             className="flex flex-col gap-16"
                        >
                            <a href="#collection" className="inline-flex items-center gap-4 bg-transparent rounded-full p-1.5 pr-6 w-fit border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 transition-colors">
                                <div className="bg-gradient-to-br from-[#FDE08B] to-[#AA8529] text-black w-8 h-8 rounded-full flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                                <span className="text-xs tracking-wider text-gray-300">{t.hero.btn}</span>
                            </a>

                            {/* Experts / Trust Badges */}
                            <div className="flex items-center gap-6">
                                <h3 className="text-2xl font-serif text-white font-bold tracking-widest">100+</h3>
                                <p className="text-[10px] text-gray-500 max-w-[100px] leading-tight tracking-wide">{t.hero.experts}</p>
                                
                                <svg width="40" height="24" viewBox="0 0 100 60" fill="none" className="text-[#D4AF37] ml-4 opacity-70">
                                    <path d="M10 50 L20 20 L35 35 L50 10 L65 35 L80 20 L90 50 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                                    <circle cx="20" cy="50" r="6" stroke="currentColor" strokeWidth="3"/>
                                    <circle cx="40" cy="50" r="6" stroke="currentColor" strokeWidth="3"/>
                                    <circle cx="60" cy="50" r="6" stroke="currentColor" strokeWidth="3"/>
                                    <circle cx="80" cy="50" r="6" stroke="currentColor" strokeWidth="3"/>
                                </svg>
                            </div>
                        </motion.div>
                    </div>

                    {/* Middle Column (Image) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center py-12 lg:py-0">
                        <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
                            
                            {/* Realistic Smoke and Particle Effects (Behind) */}
                            <div className="absolute inset-0 z-0">
                                <SmokeParticles />
                            </div>
                            
                            {/* The Seamless Image with Built-in Smoke */}
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: [0, -15, 0] 
                                }}
                                transition={{ 
                                    opacity: { duration: 1.5, ease: "easeOut" },
                                    scale: { duration: 1.5, ease: "easeOut" },
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                                }}
                                src="/images/hero-noir.png"
                                alt="Diena Parfum Signature Collection"
                                className="w-[120%] h-[120%] max-w-none object-cover relative z-10 drop-shadow-[0_20px_50px_rgba(212,175,55,0.15)] pointer-events-none"
                                style={{ 
                                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
                                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)' 
                                }}
                            />
                            
                            {/* Drifting Embers (In Front of Bottle) */}
                            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen">
                                {Array.from({ length: 15 }).map((_, i) => {
                                    const size = Math.random() * 3 + 2;
                                    const x = Math.random() * 80 + 10;
                                    const duration = Math.random() * 8 + 6;
                                    const delay = Math.random() * 10;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ x: `${x}%`, y: `${Math.random() * 30 + 70}%`, opacity: 0, scale: 0 }}
                                            animate={{ 
                                                y: `${Math.random() * -30 - 10}%`, 
                                                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                                                scale: [0, 1, 0],
                                                x: [`${x}%`, `${x + (Math.random() > 0.5 ? 15 : -15)}%`]
                                            }}
                                            transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute bg-[#FDE08B] rounded-full blur-[1px]"
                                            style={{ width: size, height: size, boxShadow: '0 0 10px rgba(253,224,139,0.9)' }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Stats) */}
                    <div className="lg:col-span-2 flex flex-col justify-center items-start lg:items-end gap-10 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-800/30 pt-12 lg:pt-0 z-10">
                        <div className="text-left w-full border-b border-gray-800/30 pb-4">
                            <h3 className="text-2xl font-serif text-[#D4AF37] mb-1">100k+</h3>
                            <p className="text-[10px] text-gray-500 tracking-wider">{t.hero.stats.clients}</p>
                        </div>
                        <div className="text-left w-full border-b border-gray-800/30 pb-4">
                            <h3 className="text-2xl font-serif text-[#D4AF37] mb-1">80K+</h3>
                            <p className="text-[10px] text-gray-500 tracking-wider">{t.hero.stats.luxury}</p>
                        </div>
                        <div className="text-left w-full">
                            <h3 className="text-2xl font-serif text-[#D4AF37] mb-1">10y+</h3>
                            <p className="text-[10px] text-gray-500 tracking-wider">{t.hero.stats.experience}</p>
                        </div>
                    </div>


                </main>

                {/* ── BEST SELLER SECTION ── */}
                {products && products.length >= 4 && (
                    <section className="max-w-7xl mx-auto px-6 pt-20 pb-8 relative z-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4">
                                {t.bestSeller.badge}
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">{t.bestSeller.title}</h2>
                            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {products.slice(0, 4).map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setSelectedProduct(product)}
                                    className="relative cursor-pointer group bg-[#0a0a0a] border border-[#222] hover:border-[#D4AF37] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                                >
                                    <div className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">#{i+1} Best Seller</div>
                                    <div className="h-[200px] overflow-hidden flex items-center justify-center p-4 bg-[#0d0d0d]">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover mix-blend-lighten group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="text-[9px] uppercase tracking-widest text-[#D4AF37] mb-0.5">Diena Parfume</div>
                                        <div className="text-sm font-serif text-white truncate">{product.name.includes('|') ? product.name.split('|')[1].trim() : product.name}</div>
                                        <div className="text-[#D4AF37] text-sm font-medium mt-2">{formatRupiah(product.price)}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Product Catalog */}
                <section id="collection" className="max-w-7xl mx-auto px-6 py-24 relative z-10 mt-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">{t.catalog.title}</h2>
                        <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50 mb-6"></div>
                        {searchQuery && (
                            <p className="text-gray-400 text-sm mb-6">{t.catalog.searchResult} <span className="text-[#D4AF37] font-semibold">{filteredProducts.length}</span> {t.catalog.searchFor} "<em>{searchQuery}</em>"</p>
                        )}
                        {/* Category Filter */}
                        <div className="flex justify-center gap-4 mb-12 flex-wrap">
                            {categories.map(cat => (
                                <button
                                    key={t.catalog.categories[cat]}
                                    onClick={() => { setSelectedCategory(cat); setVisibleCount(8); }}
                                    className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest border transition-all duration-300 ${
                                        selectedCategory === cat 
                                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold' 
                                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                    }`}
                                >
                                    {t.catalog.categories[cat]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {visibleProducts && visibleProducts.length > 0 ? (
                            visibleProducts.map((product) => {
                                const cartQty = cart[product.id]?.quantity || 0;
                                const isLowStock = product.stock <= 5;
                                
                                return (
                                    <motion.div 
                                        key={product.id} 
                                        whileHover="hover"
                                        initial="initial"
                                        className="group relative rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md border overflow-hidden flex flex-col transition-all duration-500 bg-[#0a0a0a] border-[#222] hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.02] hover:z-10"
                                    >
                                        {/* Hover Gradient Background */}
                                        <motion.div 
                                            variants={{
                                                initial: { opacity: 0 },
                                                hover: { opacity: 1 }
                                            }}
                                            className="absolute inset-0 bg-gradient-to-b from-[#b3cde0] via-[#e5e5e5] to-[#D4AF37] z-0 transition-opacity duration-500"
                                        ></motion.div>

                                        <div className="relative z-10 flex flex-col h-full transition-colors duration-500">
                                            {/* Image Section */}
                                            <div className="relative h-[280px] overflow-visible flex items-center justify-center p-4" onClick={() => setSelectedProduct(product)} style={{cursor:'pointer'}}>
                                                {isLowStock && (
                                                    <div className="absolute top-3 left-3 z-20 bg-red-600/90 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-bold">
                                                        {t.catalog.lowStock}
                                                    </div>
                                                )}
                                                <motion.img
                                                    variants={{
                                                        initial: { y: 0, scale: 1 },
                                                        hover: { y: -15, scale: 1.15 }
                                                    }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transition-all duration-500 mix-blend-lighten group-hover:mix-blend-multiply"
                                                />
                                            </div>
                                            
                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col flex-grow relative bg-[#111] group-hover:bg-transparent transition-colors duration-500 rounded-br-[3rem]">
                                                <h3 className="text-[15px] font-serif text-white group-hover:text-black mb-2 leading-tight drop-shadow-sm">
                                                    <span className="block font-bold text-[12px] uppercase tracking-[0.2em] mb-1">Diena Parfume</span>
                                                    <span className="block text-[16px] italic opacity-95">{product.name.includes('|') ? product.name.split('|')[1].trim() : product.name}</span>
                                                </h3>
                                                <p className="text-gray-400 group-hover:text-black/80 text-[10px] mb-6 flex-grow leading-relaxed line-clamp-4">
                                                    {product.description}
                                                </p>
                                                
                                                <div className="flex justify-between items-center mb-6">
                                                    <span className="text-base font-medium text-white group-hover:text-black">
                                                        {formatRupiah(product.price)}
                                                    </span>
                                                    <span className={`text-[9px] uppercase tracking-widest border px-2 py-1 rounded-sm ${
                                                        isLowStock
                                                            ? 'border-red-500 text-red-400 group-hover:border-red-600 group-hover:text-red-600'
                                                            : 'border-gray-600 group-hover:border-black/50 group-hover:text-black/80 text-gray-400'
                                                    }`}>
                                                        {isLowStock ? `${t.catalog.left} ${product.stock}` : 'In Stock'}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2 items-center w-full">
                                                    {cartQty > 0 ? (
                                                        <div className="flex items-center justify-between w-full bg-[#1a1a1a] group-hover:bg-black/90 border border-gray-800 group-hover:border-black rounded-sm">
                                                            <button onClick={() => removeFromCart(product.id)} className="px-4 py-2 text-[#D4AF37] hover:bg-white/10 transition-colors">-</button>
                                                            <span className="text-white font-medium text-sm">{cartQty}</span>
                                                            <button onClick={() => addToCart(product)} disabled={cartQty >= product.stock} className="px-4 py-2 text-[#D4AF37] hover:bg-white/10 transition-colors disabled:opacity-50">+</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button 
                                                                onClick={() => addToCart(product)}
                                                                disabled={product.stock === 0}
                                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-gray-700 group-hover:bg-[#111] group-hover:border-transparent group-hover:text-[#D4AF37] text-gray-300 font-semibold uppercase tracking-wider text-[10px] hover:text-[#FDE08B] transition-all duration-300 rounded-sm disabled:opacity-50"
                                                            >
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
                                                                PESAN
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    const name = product.name.includes('|') ? product.name.split('|')[1].trim() : product.name;
                                                                    const text = `${t.cart.shareText} *Diena Parfume - ${name}* seharga ${formatRupiah(product.price)}. Order di: ${window.location.href}`;
                                                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                                                }}
                                                                className="px-3 py-3 border border-gray-700 group-hover:border-black/30 text-gray-400 group-hover:text-black/60 hover:text-[#D4AF37] transition-all rounded-sm"
                                                                title="Bagikan produk"
                                                            >
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                {t.catalog.empty}
                            </div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {visibleCount < filteredProducts.length && (
                        <div className="flex justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setVisibleCount(v => v + 8)}
                                className="px-10 py-3 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-widest uppercase rounded-full hover:bg-[#D4AF37]/10 transition-all"
                            >
                                {t.catalog.loadMore} ({filteredProducts.length - visibleCount} {t.catalog.more})
                            </motion.button>
                        </div>
                    )}
                </section>

                {/* ── TESTIMONIALS SECTION ── */}
                <section className="bg-[#0a0a0a] py-24 border-t border-gray-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">{t.testimonials.title}</h2>
                            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-[#111] border border-[#222] hover:border-[#D4AF37]/40 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300"
                                >
                                    <div className="flex gap-1">
                                        {Array.from({ length: t.rating }).map((_, s) => (
                                            <span key={s} className="text-[#D4AF37] text-sm">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed italic flex-grow">"{t.text}"</p>
                                    <div>
                                        <div className="text-white text-sm font-semibold">{t.name}</div>
                                        <div className="text-[#D4AF37]/60 text-[10px] tracking-widest uppercase">{t.city}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* About Section */}
                <section id="about" className="max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-gray-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                             <img 
                                src="/images/about-anime.png" 
                                alt="About Diena Parfum" 
                                className="w-full aspect-square object-cover rounded-sm border border-gray-800 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl lg:text-4xl font-serif text-[#D4AF37] mb-6">{t.about.title1}</h2>
                            <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                                {t.about.p1}
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-10 text-sm md:text-base">
                                {t.about.p2}
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <h4 className="text-xl font-serif text-white mb-2">{t.about.premium}</h4>
                                    <p className="text-xs text-gray-500">{t.about.premiumDesc}</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif text-white mb-2">{t.about.exclusive}</h4>
                                    <p className="text-xs text-gray-500">{t.about.exclusiveDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-20">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                                    {t.about.artTitle1} <span className="text-[#D4AF37] italic">{t.about.artTitleHighlight}</span>
                                </h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    {t.about.artP1}
                                </p>
                                <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                                    {t.about.artP2}
                                </p>
                                <div className="flex gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-serif text-[#D4AF37] mb-1">100%</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.about.stats.authentic}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-serif text-[#D4AF37] mb-1">12h+</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.about.stats.lasting}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-serif text-[#D4AF37] mb-1">{t.about.premium}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.about.stats.ingredients}</div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                                className="relative flex justify-center"
                            >
                                <div className="w-full max-w-[400px] aspect-square relative flex items-center justify-center p-12 border border-[#D4AF37]/20 rounded-full">
                                    <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-[60px]"></div>
                                    {/* Logo Placeholder / Symbol */}
                                    <div className="relative text-center">
                                        <div className="text-[80px] font-serif text-[#D4AF37] leading-none mb-2">D</div>
                                        <div className="text-[12px] tracking-[0.5em] text-[#D4AF37] uppercase border-t border-[#D4AF37]/30 pt-4 mt-2">Diena Parfum</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── FAQ SECTION ── */}
                <section id="faq" className="py-24 bg-black border-t border-gray-900">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">{t.faq.title}</h2>
                            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className="border border-[#222] hover:border-[#D4AF37]/30 rounded-lg overflow-hidden transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex justify-between items-center px-6 py-4 text-left text-sm text-white hover:text-[#D4AF37] transition-colors"
                                    >
                                        <span className="font-medium">{faq.q}</span>
                                        <motion.span
                                            animate={{ rotate: openFaq === i ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-[#D4AF37] text-xl ml-4 flex-shrink-0"
                                        >+</motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#D4AF37]/20 bg-black py-16 text-sm text-gray-400">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left items-start">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="text-2xl font-serif text-[#D4AF37] tracking-[0.3em] uppercase mb-6">
                                Diena Parfum
                            </div>
                            <p className="text-[11px] leading-relaxed opacity-60 uppercase tracking-widest">
                                {t.footer.slogan}
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white uppercase tracking-widest text-xs mb-6 font-bold">{t.footer.contact}</h4>
                            <p className="text-[12px] leading-loose opacity-70">
                                Diena Parfum HQ<br />
                                Jl. Kuningan Barat Raya No.1A, RT.1/RW.3, Kuningan Bar., Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12710
                            </p>
                        </div>

                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white uppercase tracking-widest text-xs mb-6 font-bold">{t.footer.quickLinks}</h4>
                            <div className="flex flex-col gap-3 text-[11px] uppercase tracking-widest opacity-60">
                                <a href="#" className="hover:text-[#D4AF37] transition-colors">{t.nav.home}</a>
                                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">Katalog</a>
                                <a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a>
                                <a href="#faq" className="hover:text-[#D4AF37] transition-colors">{t.nav.faq}</a>
                            </div>
                            <div className="mt-8">
                                <h4 className="text-white uppercase tracking-widest text-xs mb-4 font-bold">{t.footer.followUs}</h4>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/diena_parfum/" target="_blank" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="TikTok">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.72a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/></svg>
                                    </a>
                                    <a href="https://wa.me/6289531222146" target="_blank" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="WhatsApp">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 text-center border-t border-gray-900 pt-8 text-[10px] opacity-40 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} {t.footer.rights}
                    </div>
                </footer>

                {/* Floating Cart Button */}
                <AnimatePresence>
                    {cartItemCount > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 50 }}
                            onClick={() => setIsCartOpen(true)}
                            className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#FDE08B] to-[#D4AF37] text-black w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 transition-transform border border-[#AA8529]"
                        >
                            <div className="relative">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-black">
                                    {cartItemCount}
                               </span>
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Cart Modal */}
                <AnimatePresence>
                    {isCartOpen && (
                        <div className="fixed inset-0 z-[60] flex justify-end">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCartOpen(false)}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                            />
                            <motion.div 
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl border-l border-[#D4AF37]/20 flex flex-col"
                            >
                                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#111]">
                                    <h2 className="text-xl font-serif text-[#D4AF37]">{t.cart.title}</h2>
                                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-gray-900 p-2 rounded-full">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                                    {Object.values(cart).map(item => (
                                        <div key={item.product.id} className="flex gap-4 items-center bg-[#151515] p-3 rounded-xl border border-gray-800">
                                            <div className="w-16 h-16 bg-black rounded-lg overflow-hidden flex items-center justify-center p-1 border border-gray-800">
                                                <img src={item.product.image} className="w-full h-full object-contain mix-blend-screen" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-serif text-white mb-1">{item.product.name}</h4>
                                                <div className="text-xs text-[#D4AF37] font-medium">{formatRupiah(item.product.price)}</div>
                                            </div>
                                            <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded-lg overflow-hidden">
                                                <button onClick={() => removeFromCart(item.product.id)} className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">-</button>
                                                <span className="text-xs w-6 text-center font-bold text-white">{item.quantity}</span>
                                                <button onClick={() => addToCart(item.product)} disabled={item.quantity >= item.product.stock} className="px-3 py-2 text-[#D4AF37] hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50">+</button>
                                            </div>
                                        </div>
                                    ))}
                                    {cartItemCount === 0 && (
                                        <div className="text-center text-gray-500 mt-20 flex flex-col items-center gap-4">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-700"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                            <p>{t.cart.empty}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 border-t border-gray-800 bg-[#111]">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-gray-400 text-sm">{t.cart.total} ({cartItemCount} {t.cart.items})</span>
                                        <span className="text-3xl font-serif text-[#D4AF37] leading-none">{formatRupiah(cartTotal)}</span>
                                    </div>
                                    <button 
                                        onClick={handleWhatsAppCheckout}
                                        disabled={cartItemCount === 0}
                                        className="w-full py-4 bg-gradient-to-r from-[#FDE08B] via-[#D4AF37] to-[#AA8529] text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:shadow-none transition-all flex justify-center items-center gap-3"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                        Checkout via WhatsApp
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* â”€â”€ WA CHAT FLOATING BUTTON â”€â”€ */}
                <a
                    href="https://wa.me/6289531222146?text=Halo%20Diena%20Parfum%2C%20saya%20ingin%20bertanya%20tentang%20produk"
                    target="_blank"
                    className="fixed bottom-28 right-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
                    title="Chat via WhatsApp"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>

                {/* â”€â”€ PRODUCT DETAIL MODAL â”€â”€ */}
                <AnimatePresence>
                    {selectedProduct && (
                        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProduct(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="relative bg-[#0d0d0d] border border-[#D4AF37]/20 rounded-2xl overflow-hidden max-w-2xl w-full grid md:grid-cols-2 z-10 shadow-2xl"
                            >
                                <div className="relative bg-[#111] flex items-center justify-center p-8 min-h-[300px]">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover max-h-[300px] mix-blend-lighten" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                                <div className="p-8 flex flex-col justify-between">
                                    <div>
                                        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white bg-black/50 rounded-full p-1.5 transition-colors">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                        </button>
                                        <div className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1">Diena Parfume</div>
                                        <h2 className="text-2xl font-serif text-white mb-4">{selectedProduct.name.includes('|') ? selectedProduct.name.split('|')[1].trim() : selectedProduct.name}</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            <span className="text-[10px] uppercase tracking-widest border border-[#D4AF37]/30 text-[#D4AF37]/80 px-3 py-1 rounded-full">{selectedProduct.category}</span>
                                            <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${ selectedProduct.stock <= 5 ? 'border-red-500/50 text-red-400' : 'border-green-500/30 text-green-400' }`}>{selectedProduct.stock <= 5 ? `${t.catalog.left} ${selectedProduct.stock}` : 'In Stock'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-serif text-[#D4AF37] mb-6">{formatRupiah(selectedProduct.price)}</div>
                                        <button
                                            onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                            className="w-full py-3 bg-gradient-to-r from-[#FDE08B] via-[#D4AF37] to-[#AA8529] text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
                                        >
                                            Tambah ke Keranjang
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

