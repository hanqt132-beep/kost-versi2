import { useState, useMemo } from 'react';
import { 
  Search, MapPin, Home, Wallet, RotateCcw, Shield, 
  HandCoins, Star, Headphones, Zap, ArrowRight, 
  CheckCircle2, TrendingUp, Building2
} from 'lucide-react';
import { KostCard } from '@/components/kost/KostCard';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { LOCATIONS, KOST_TYPES } from '@/utils/helpers';
import type { Kost } from '@/types';

interface HomePageProps {
  onOpenKostDetail: (kost: Kost) => void;
}

export function HomePage({ onOpenKostDetail }: HomePageProps) {
  const { kosts, setRoute, transactions } = useStore();
  
  const [filterLoc, setFilterLoc] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rekom');
  
  const stats = useMemo(() => ({
    totalKosts: kosts.length,
    totalTransactions: transactions.length,
    verifiedKosts: kosts.filter(k => k.verified).length,
    avgRating: kosts.length > 0 
      ? (kosts.reduce((sum, k) => sum + k.rating, 0) / kosts.length).toFixed(1) 
      : '0'
  }), [kosts, transactions]);
  
  const filteredKosts = useMemo(() => {
    let result = [...kosts];
    
    // Apply filters
    if (filterLoc !== 'all') {
      result = result.filter(k => k.loc === filterLoc);
    }
    if (filterType !== 'all') {
      result = result.filter(k => k.type === filterType);
    }
    if (filterPrice !== 'all') {
      if (filterPrice === '1') result = result.filter(k => k.price < 1000000);
      if (filterPrice === '2') result = result.filter(k => k.price >= 1000000 && k.price <= 2000000);
      if (filterPrice === '3') result = result.filter(k => k.price > 2000000);
    }
    
    // Apply sorting
    if (sortBy === 'harga-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'harga-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating-desc') result.sort((a, b) => b.rating - a.rating);
    else {
      // Recommendation: promo + verified + rating
      result.sort((a, b) => {
        const score = (k: Kost) => (k.promo ? 2 : 0) + (k.verified ? 1 : 0) + k.rating;
        return score(b) - score(a);
      });
    }
    
    return result;
  }, [kosts, filterLoc, filterType, filterPrice, sortBy]);
  
  const resetFilters = () => {
    setFilterLoc('all');
    setFilterType('all');
    setFilterPrice('all');
    setSortBy('rekom');
  };
  
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 max-w-5xl px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Platform Kost #1 di Kalimantan Barat</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Temukan Hunian <br />
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Terbaik
            </span> Untukmu
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Ribuan kost terverifikasi dengan fasilitas lengkap, harga transparan, 
            dan proses booking yang aman dalam satu platform.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              variant="primary" 
              size="lg"
              className="shadow-xl shadow-emerald-500/25"
              onClick={() => document.getElementById('listing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="w-5 h-5" />
              Cari Kost Sekarang
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              onClick={() => setRoute('about')}
            >
              Pelajari Lebih Lanjut
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-black">{stats.totalKosts}</span>
              </div>
              <p className="text-white/60 text-sm">Kost Tersedia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-black">{stats.verifiedKosts}</span>
              </div>
              <p className="text-white/60 text-sm">Terverifikasi</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-2xl font-black">{stats.avgRating}</span>
              </div>
              <p className="text-white/60 text-sm">Rating Rata-rata</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-black">{stats.totalTransactions}+</span>
              </div>
              <p className="text-white/60 text-sm">Transaksi</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Search Widget */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-800">Pencarian Cerdas, Hasil Terbaik</h3>
            <p className="text-slate-500 mt-1">Atur lokasi, tipe kost, dan anggaranmu untuk hasil yang lebih akurat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Location */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none transition-transform group-focus-within:scale-110" />
              <select
                value={filterLoc}
                onChange={(e) => setFilterLoc(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold appearance-none cursor-pointer transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="all">📍 Semua Lokasi</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            {/* Type */}
            <div className="relative group">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none transition-transform group-focus-within:scale-110" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold appearance-none cursor-pointer transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="all">🏠 Semua Tipe</option>
                {KOST_TYPES.map(type => (
                  <option key={type} value={type}>Khusus {type}</option>
                ))}
              </select>
            </div>
            
            {/* Price */}
            <div className="relative group">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none transition-transform group-focus-within:scale-110" />
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold appearance-none cursor-pointer transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="all">💰 Semua Harga</option>
                <option value="1">&lt; Rp 1 Juta</option>
                <option value="2">Rp 1 - 2 Juta</option>
                <option value="3">&gt; Rp 2 Juta</option>
              </select>
            </div>
            
            {/* Search Button */}
            <Button
              variant="primary"
              className="w-full py-4 text-lg shadow-lg shadow-emerald-200"
              onClick={() => document.getElementById('listing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="w-5 h-5" />
              Cari
            </Button>
          </div>
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 font-semibold">
              Menampilkan <span className="text-emerald-600 font-bold">{filteredKosts.length}</span> kost
            </p>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-slate-200 rounded-xl px-4 py-2 font-semibold bg-white hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
              >
                <option value="rekom">⭐ Rekomendasi</option>
                <option value="harga-asc">💵 Termurah</option>
                <option value="harga-desc">💎 Termahal</option>
                <option value="rating-desc">🏆 Rating Tertinggi</option>
              </select>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Listing Section */}
      <section id="listing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            Pilihan Terbaik
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Hunian Terbaik Minggu Ini</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Dipilih berdasarkan rating, ulasan, dan tingkat kepuasan penghuni. 
            Semua kost telah melalui proses verifikasi ketat.
          </p>
        </div>
        
        {filteredKosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKosts.map((kost, idx) => (
              <div 
                key={kost.id} 
                className="animate-slideUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <KostCard
                  kost={kost}
                  onClick={() => onOpenKostDetail(kost)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Tidak ada kost yang cocok</h3>
            <p className="text-slate-500 mb-6">Coba sesuaikan filter pencarian atau jelajahi lokasi lainnya.</p>
            <Button variant="primary" onClick={resetFilters}>
              <RotateCcw className="w-4 h-4" />
              Reset Filter
            </Button>
          </div>
        )}
      </section>
      
      {/* Promo Banner */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div 
          className="relative rounded-3xl p-10 md:p-16 text-center text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)'
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
              <Zap className="w-4 h-4" />
              Penawaran Eksklusif
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Diskon hingga 15% untuk Sewa Jangka Panjang
            </h2>
            <p className="opacity-90 mb-8 max-w-xl mx-auto">
              Dapatkan potongan harga untuk booking kost dengan durasi minimal 3 bulan. 
              Promo berlaku untuk kost dengan label khusus.
            </p>
            <Button
              variant="ghost"
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl"
              onClick={() => setRoute('promo')}
            >
              Lihat Semua Promo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            Mengapa KostApp?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Aman. Transparan. Terpercaya.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Setiap hunian di KostApp melalui proses verifikasi ketat untuk memastikan 
            kualitas dan keamanan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">Hunian Terverifikasi</h4>
            <p className="text-slate-500">Data akurat, foto asli, dan fasilitas sesuai dengan deskripsi.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <HandCoins className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">Harga Transparan</h4>
            <p className="text-slate-500">Tidak ada biaya tersembunyi. Yang Anda lihat adalah yang Anda bayar.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
              <Star className="w-7 h-7 text-amber-600" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">Ulasan Autentik</h4>
            <p className="text-slate-500">Rating dan ulasan murni dari penghuni yang pernah tinggal.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Headphones className="w-7 h-7 text-purple-600" />
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">Dukungan 24/7</h4>
            <p className="text-slate-500">Tim support kami siap membantu kapan saja Anda membutuhkan.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Siap Menemukan <span className="text-emerald-400">Hunian Impian</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Bergabung dengan ribuan pengguna yang telah menemukan kost ideal mereka melalui KostApp.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('listing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Mulai Pencarian
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white border border-white/20 hover:bg-white/10"
                onClick={() => setRoute('help')}
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
