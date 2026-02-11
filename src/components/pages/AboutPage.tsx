import { 
  Building2, Users, Target, Heart, Briefcase, Newspaper, 
  Handshake, Shield, BarChart3, TrendingUp, Mail, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';

interface AboutPageProps {
  type?: 'about' | 'career' | 'blog' | 'partner' | 'admin';
}

export function AboutPage({ type = 'about' }: AboutPageProps) {
  const { kosts, transactions, users } = useStore();
  
  if (type === 'career') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4">Bergabung Bersama Kami</h1>
          <p className="text-gray-500 text-lg">
            Kami mencari talenta terbaik untuk membangun masa depan hunian di Indonesia.
          </p>
        </div>
        
        <div className="space-y-4 mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Engineering</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">Senior Frontend Developer</h3>
                <p className="text-gray-500 mt-1">React, TypeScript, Tailwind CSS • Full-time • Remote</p>
              </div>
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Operations</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">Customer Success Manager</h3>
                <p className="text-gray-500 mt-1">Mendukung pengguna dan pemilik kost • Full-time • Pontianak</p>
              </div>
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Business</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">Partnership Manager</h3>
                <p className="text-gray-500 mt-1">Membangun kemitraan strategis • Full-time • Jakarta</p>
              </div>
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8 text-center">
          <Mail className="w-10 h-10 text-purple-600 mx-auto mb-4" />
          <h3 className="font-bold text-purple-800 text-xl mb-2">Tidak menemukan posisi yang cocok?</h3>
          <p className="text-purple-700 mb-4">Kirim CV dan portofoliomu ke email kami.</p>
          <p className="font-bold text-purple-800">career@kostapp.id</p>
        </div>
      </div>
    );
  }
  
  if (type === 'blog') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4">Blog KostApp</h1>
          <p className="text-gray-500 text-lg">Tips kost, inspirasi hunian, dan panduan hidup mandiri.</p>
        </div>
        
        <div className="grid gap-6">
          <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" 
                alt="Blog" 
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Tips</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">10 Tips Memilih Kost untuk Mahasiswa Baru</h3>
                <p className="text-gray-500 mt-2">Panduan lengkap menemukan kost yang nyaman dan sesuai budget untuk kamu yang baru merantau.</p>
                <p className="text-gray-400 text-sm mt-4">12 Januari 2026 • 5 menit baca</p>
              </div>
            </div>
          </article>
          
          <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <img 
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" 
                alt="Blog" 
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Lifestyle</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">Cara Mendekorasi Kamar Kost dengan Budget Terbatas</h3>
                <p className="text-gray-500 mt-2">Ubah kamar kostmu menjadi tempat yang nyaman dan aesthetic tanpa menguras kantong.</p>
                <p className="text-gray-400 text-sm mt-4">8 Januari 2026 • 7 menit baca</p>
              </div>
            </div>
          </article>
          
          <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400" 
                alt="Blog" 
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Guide</span>
                <h3 className="font-bold text-gray-800 text-xl mt-2">Checklist Fasilitas yang Wajib Ada di Kost</h3>
                <p className="text-gray-500 mt-2">Jangan sampai salah pilih! Pastikan kost pilihanmu memiliki fasilitas-fasilitas penting ini.</p>
                <p className="text-gray-400 text-sm mt-4">5 Januari 2026 • 4 menit baca</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
  
  if (type === 'partner') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Handshake className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4">Bermitra dengan KostApp</h1>
          <p className="text-gray-500 text-lg">
            Jangkau lebih banyak penyewa dan kelola properti Anda dengan lebih efisien.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Tingkatkan Okupansi</h3>
            <p className="text-gray-500 text-sm">Jangkau ribuan calon penyewa yang aktif mencari kost setiap hari.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Dashboard Analitik</h3>
            <p className="text-gray-500 text-sm">Pantau performa properti Anda dengan data dan insight real-time.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Pembayaran Aman</h3>
            <p className="text-gray-500 text-sm">Terima pembayaran dengan aman dan pencairan dana yang cepat.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-4">Siap Bermitra?</h2>
          <p className="opacity-90 mb-6">
            Hubungi tim partnership kami untuk informasi lebih lanjut tentang cara bergabung.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-sm opacity-80">Email</p>
              <p className="font-bold">partner@kostapp.id</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-sm opacity-80">WhatsApp</p>
              <p className="font-bold">0858-2000-1352</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'admin') {
    const pendingTxn = transactions.filter(t => t.status === 'INITIATED' || t.status === 'SCANNING').length;
    const completedTxn = transactions.filter(t => t.status === 'COMPLETED').length;
    const totalRevenue = transactions.filter(t => t.status === 'COMPLETED' || t.status === 'DP_PAID').reduce((sum, t) => sum + t.totalAmount, 0);
    
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Kelola kost, booking, dan pengguna.</p>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Admin
          </span>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">Total Kost</p>
            </div>
            <p className="text-3xl font-black text-gray-800">{kosts.length}</p>
            <p className="text-emerald-600 text-sm font-semibold mt-1">Listing aktif</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">Total Transaksi</p>
            </div>
            <p className="text-3xl font-black text-gray-800">{transactions.length}</p>
            <p className="text-blue-600 text-sm font-semibold mt-1">{pendingTxn} pending</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">Total Users</p>
            </div>
            <p className="text-3xl font-black text-gray-800">{users.length}</p>
            <p className="text-purple-600 text-sm font-semibold mt-1">Terdaftar</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">Revenue</p>
            </div>
            <p className="text-2xl font-black text-gray-800">
              {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(totalRevenue)}
            </p>
            <p className="text-amber-600 text-sm font-semibold mt-1">{completedTxn} sukses</p>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Belum ada aktivitas transaksi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Transaction ID</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">User</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Kost</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-600 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map(txn => (
                    <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{txn.transactionId}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-800">{txn.userName}</p>
                        <p className="text-gray-400 text-xs">@{txn.username}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{txn.kostName}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">
                        {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(txn.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                          txn.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                          txn.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Default: About page
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
          <Building2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-4">Tentang KostApp</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Platform pencarian dan booking kost terpercaya di Indonesia. 
          Kami menghubungkan penyewa dengan hunian terbaik secara aman, transparan, dan mudah.
        </p>
      </div>
      
      {/* Mission */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">Misi Kami</h3>
          <p className="text-gray-500">Menyediakan platform terpercaya untuk pencarian dan booking kost di seluruh Indonesia.</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">Keamanan</h3>
          <p className="text-gray-500">Setiap transaksi dilindungi dengan sistem keamanan tingkat tinggi dan terenkripsi.</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">Komitmen</h3>
          <p className="text-gray-500">Berkomitmen memberikan pengalaman terbaik bagi penyewa dan pemilik kost.</p>
        </div>
      </div>
      
      {/* Values */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-16">
        <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">Nilai-Nilai Kami</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Transparansi</h4>
              <p className="text-gray-600">Harga jelas, tidak ada biaya tersembunyi. Apa yang Anda lihat adalah apa yang Anda bayar.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Kepercayaan</h4>
              <p className="text-gray-600">Semua listing terverifikasi dengan foto asli dan informasi akurat.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Kemudahan</h4>
              <p className="text-gray-600">Proses booking yang simpel dan pembayaran yang praktis via scan QR.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Dukungan</h4>
              <p className="text-gray-600">Tim customer service yang responsif dan siap membantu 7 hari seminggu.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-gray-800 mb-6">Hubungi Kami</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-700">support@kostapp.id</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-700">Ketapang, Kalimantan Barat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
