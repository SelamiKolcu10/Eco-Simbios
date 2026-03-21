import React, { useEffect, useState } from 'react';
import {
    ArrowLeft,
    Database,
    Network,
    FileBarChart,
    Leaf,
    Users,
    Droplet,
    Thermometer
} from 'lucide-react';
import { cn } from "../../lib/utils";
import KooperatifPortal from './KooperatifPortal';

export default function DiscoveryPage({ onNavigate }) {
    const [showPortal, setShowPortal] = useState(false);

    // Scroll to top when page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-24 animate-in fade-in zoom-in-95 duration-500">
            {/* Header Section */}
            <div className="bg-[#0c4e33] text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="flex items-center gap-2 text-emerald-100 hover:text-white mb-8 transition-colors text-sm font-semibold"
                    >
                        <ArrowLeft className="h-4 w-4" /> Panoya Dön
                    </button>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight mb-6 mt-4">
                        Endüstriyel ve Sosyal Simbiyoz Ekosistemi
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-50/90 max-w-3xl leading-relaxed font-medium">
                        Atığı kaynağa, maliyeti kazanca, sanayiyi doğaya dost bir döngüye dönüştüren, yapay zeka destekli yeni nesil endüstriyel yaşam formu.
                    </p>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 z-0" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 space-y-16">

                {/* Technical Process: Multi-agent AI System */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Process Card 1 */}
                        <div className="flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                                <Database className="h-7 w-7 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-3">Veri Analizi</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Tesislerden sağlanan IoT sensör verileri ve kurumsal veri setleri sisteme anlık akar. AI ajanlarımız emisyonları, ısı miktarını ve atık profillerini gerçek zamanlı sınıflandırır.
                            </p>
                        </div>
                        
                        {/* Process Card 2 */}
                        <div className="flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                                <Network className="h-7 w-7 text-[#0c4e33]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-3">Akıllı Eşleşme</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Bilişsel yeteneklere sahip eşleşme motoru, arz-talep dengesini lojistik rotalara göre hesaplar. Bir tesisin atığı, başka bir tesisin %100 uyumlu hammaddesi haline gelir.
                            </p>
                        </div>

                        {/* Process Card 3 */}
                        <div className="flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                                <FileBarChart className="h-7 w-7 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-3">Raporlama</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Finansal kazanımlar ve önlenen karbon emisyonları ESG standartlarına uygun blokzincir tabanlı karbon defterine (Ledger) yazılır. Tam denetlenebilir raporlar oluşturulur.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vizyon / Manifesto Focus */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                    <div className="bg-[#F9F9F9] rounded-[2.5rem] py-16 px-8 md:px-20 text-center shadow-sm border border-slate-100 mx-auto max-w-5xl relative">
                        {/* Decorative Quotes */}
                        <span className="text-7xl text-emerald-200 absolute top-4 left-6 md:left-10 font-sans leading-none">"</span>
                        <span className="text-7xl text-emerald-200 absolute bottom-0 right-6 md:right-10 font-sans leading-none rotate-180">"</span>
                        
                        <p className="text-2xl md:text-3xl lg:text-[2rem] text-slate-800 font-serif leading-relaxed relative z-10">
                            Eco-Simbiyoz, endüstriyel simbiyozu sadece bir ticaret modeli olarak değil, <strong className="text-[#0c4e33] font-bold">toplumsal bir onarım aracı</strong> olarak görür. Yapay zeka ajanlarımız, sanayi bölgelerindeki termal atıkları ve yan ürünleri gerçek zamanlı izleyerek, bu kaynakları yerel kadın kooperatiflerinin seralarına yönlendirir. Amacımız; sanayicinin karbon vergisini azaltırken, kırsaldaki kadın üreticinin <strong className="text-[#0c4e33] font-bold">üretim maliyetini sıfıra yaklaştırmaktır.</strong>
                        </p>
                    </div>
                </section>

                {/* Social Impact Focus: Sanayiden Toprağa */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both pt-8">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                        {/* Large Background Watermark */}
                        <Leaf className="absolute -bottom-16 -right-16 w-96 h-96 text-emerald-50/50 -rotate-12 z-0 pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            {/* Text Content */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase">
                                    <Leaf className="h-3.5 w-3.5" />
                                    Sosyal Etki Odağı
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
                                    Sanayiden Toprağa: <span className="text-[#0c4e33]">Kadın Emeğiyle Doğan Yaşam</span>
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    Eko-Simbiyoz salt kurumsal bir B2B platform değil; aynı zamanda güçlü bir <strong className="text-slate-800">katma değer jeneratörüdür.</strong> 
                                    Ağır sanayi tesislerindeki devasa soğutma kulelerinden atmosfere veya nehirlere karışan atık ısı ve su, kurduğumuz altyapıyla kadın kooperatiflerinin işlettiği akıllı organik tarım seralarına aktarılır.
                                </p>
                                <p className="text-slate-500 text-base leading-relaxed">
                                    Sıfır enerji maliyetiyle gerçekleşen bu 12 aylık serasız tarım sayesinde on binlerce ton karbon atmosfere karışmaktan kurtarılırken, yüzlerce kadına ekonomik bağımsızlık ve istihdam sağlanır.
                                </p>
                                
                                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={() => setShowPortal(true)}
                                        className="px-8 py-3.5 bg-[#0c4e33] hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        Kooperatifleri İncele
                                    </button>
                                </div>
                            </div>

                            {/* Large Image / Illustration Area */}
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-50 flex items-center justify-center">
                                {/* Use the generated illustration from public folder */}
                                <img 
                                    src="/images/sosyal-etki-illustration.png" 
                                    alt="Sanayiden Toprağa Sosyal Etki İllüstrasyonu" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                {/* Bottom Floating Info Card inside the image */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white p-4 rounded-2xl shadow-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <Thermometer className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-800 font-serif">Bedelsiz Atık Isı</p>
                                            <p className="text-xs text-slate-500">%100 Döngüsel Enerji</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-200" />
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Droplet className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-800 font-serif">Arıtılmış Geri Su</p>
                                            <p className="text-xs text-slate-500">Tarımsal Sulamaya Uygun</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Metrics Infographics */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both pb-12">
                    <h3 className="text-3xl font-extrabold text-slate-900 font-serif mb-8 text-center">Ölçülebilir Sosyal & Çevresel Etki</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Metric 1 */}
                        <div className="bg-[#0c4e33] text-white rounded-3xl p-8 relative overflow-hidden shadow-lg group">
                            <div className="absolute -right-6 -bottom-6 opacity-10 transition-transform duration-500 group-hover:scale-110">
                                <Leaf className="w-40 h-40" />
                            </div>
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                    <Leaf className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-5xl font-black mb-2 font-serif group-hover:-translate-y-1 transition-transform">
                                    1.2M <span className="text-2xl font-bold">Ton</span>
                                </div>
                                <p className="text-lg font-bold mb-2">Önlenen Karbon (CO₂)</p>
                                <p className="text-sm text-emerald-100/80 leading-relaxed">
                                    6 milyon yetişkin çam ağacının bir yılda temizlediği karbon miktarına eşdeğer tasarruf.
                                </p>
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                            <div className="absolute -right-6 -bottom-6 opacity-[0.03] transition-transform duration-500 group-hover:scale-110">
                                <Droplet className="w-40 h-40 text-blue-900" />
                            </div>
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                                    <Droplet className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="text-5xl font-black mb-2 font-serif text-slate-900 group-hover:-translate-y-1 transition-transform">
                                    450K <span className="text-2xl font-bold text-slate-500">m³</span>
                                </div>
                                <p className="text-lg font-bold mb-2 text-slate-800">Geri Kazanılan Su</p>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Aylık 25.000 nüfuslu bir ilçenin domestik su tüketimine eşdeğer atık suyun tarımsal irrigasyona kazandırılması.
                                </p>
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                            <div className="absolute -right-6 -bottom-6 opacity-[0.03] transition-transform duration-500 group-hover:scale-110">
                                <Users className="w-40 h-40 text-orange-900" />
                            </div>
                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
                                    <Users className="h-6 w-6 text-orange-500" />
                                </div>
                                <div className="text-5xl font-black mb-2 font-serif text-slate-900 group-hover:-translate-y-1 transition-transform">
                                    340+ <span className="text-2xl font-bold text-slate-500">Kişi</span>
                                </div>
                                <p className="text-lg font-bold mb-2 text-slate-800">Kadın İstihdamı</p>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Sera işletim ve kooperatif ağında sağlanan doğrudan kalıcı yeni istihdam fırsatları ve adil iş paylaşımı.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-12 bg-[#0c4e33]">
                    <div className="max-w-4xl mx-auto py-24 px-6 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif mb-6 leading-tight">
                            Geleceğin Ekosisteminde <br /> Yeriniz Hazır
                        </h2>
                        <p className="text-emerald-50 text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto font-medium leading-relaxed">
                            Karbon ayak izinizi silin, atıklarınızı kazanca dönüştürün ve sürdürülebilir toplumsal faydanın aktif bir parçası olun.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                            <button 
                                onClick={() => onNavigate('matchmaking')}
                                className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold transition-all shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1"
                            >
                                Ekosisteme Katıl
                            </button>
                            <button 
                                onClick={() => onNavigate('matchmaking')}
                                className="w-full sm:w-auto px-10 py-4 bg-[#ffffff15] hover:bg-[#ffffff25] text-white rounded-2xl font-bold transition-all border border-[#ffffff30] hover:-translate-y-1"
                            >
                                Tesisini Kaydet
                            </button>
                        </div>
                    </div>
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white" />
                        <div className="absolute top-1/2 right-12 w-32 h-32 rounded-full border-[20px] border-emerald-400" />
                    </div>
                </section>

            </div>

            {/* Kooperatif Keşif Portalı */}
            {showPortal && (
                <KooperatifPortal 
                    onClose={() => setShowPortal(false)} 
                    onNavigate={onNavigate} 
                />
            )}
        </div>
    );
}
