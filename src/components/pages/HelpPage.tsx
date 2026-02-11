import { 
  Headphones, Mail, Phone, Clock, MessageCircle, FileQuestion, 
  ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, 
  ArrowRight, Zap, CreditCard, QrCode, Receipt, Scale
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { COMPANY_INFO, COPYRIGHT_YEAR } from '@/utils/legal';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'general' | 'legal';
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara melakukan booking kost di KostApp?',
    answer: 'Untuk melakukan booking: (1) Pilih kost yang Anda inginkan dari daftar listing, (2) Klik tombol "Booking Sekarang", (3) Pilih durasi sewa dan tanggal mulai, (4) Lakukan pembayaran dengan scan QR menggunakan kamera perangkat, (5) Setelah pembayaran berhasil, Anda akan menerima struk resmi sebagai bukti transaksi.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'Bagaimana sistem pembayaran di KostApp?',
    answer: 'KostApp menggunakan sistem pembayaran QRIS (Quick Response Code Indonesian Standard). Anda perlu memindai kode QR menggunakan kamera perangkat untuk memproses pembayaran. Sistem ini aman dan telah sesuai dengan standar Bank Indonesia. Setelah pembayaran berhasil, struk elektronik akan dihasilkan secara otomatis.',
    category: 'payment'
  },
  {
    id: 'faq-3',
    question: 'Apakah struk pembayaran sah secara hukum?',
    answer: 'Ya, struk elektronik yang dihasilkan KostApp merupakan bukti pembayaran yang sah sesuai dengan UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik, serta PP No. 71 Tahun 2019. Struk ini memiliki kekuatan hukum yang sama dengan dokumen tertulis dan dapat digunakan sebagai alat bukti di pengadilan.',
    category: 'legal'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana jika pembayaran gagal atau terjadi kesalahan?',
    answer: 'Jika pembayaran gagal, transaksi akan otomatis dibatalkan dan tidak ada biaya yang dikenakan. Jika Anda merasa ada kesalahan dalam transaksi yang berhasil, segera hubungi customer service kami di 0858-2000-1352 atau email ke support@kostapp.id dengan menyertakan Transaction ID untuk investigasi lebih lanjut.',
    category: 'payment'
  },
  {
    id: 'faq-5',
    question: 'Apakah bisa membatalkan booking setelah pembayaran?',
    answer: 'Pembatalan dapat dilakukan sebelum pembayaran dikonfirmasi. Setelah pembayaran berhasil diproses (status COMPLETED), transaksi bersifat final dan tidak dapat dibatalkan. Kebijakan pengembalian dana (refund) hanya berlaku dalam kondisi tertentu seperti kesalahan sistem atau ketidaksesuaian informasi kost yang signifikan.',
    category: 'booking'
  },
  {
    id: 'faq-6',
    question: 'Bagaimana cara mengakses struk pembayaran saya?',
    answer: 'Struk pembayaran dapat diakses kapan saja melalui menu "Pesanan Saya" di akun Anda. Klik tombol "Lihat Struk" pada transaksi yang sudah selesai. Anda juga dapat mengunduh struk dalam format PDF atau mencetaknya langsung.',
    category: 'general'
  },
  {
    id: 'faq-7',
    question: 'Apakah data pribadi saya aman?',
    answer: 'Ya, KostApp berkomitmen melindungi data pribadi Anda sesuai dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Kami menerapkan enkripsi standar industri dan tidak menjual data Anda kepada pihak ketiga. Baca Kebijakan Privasi kami untuk informasi lebih detail.',
    category: 'legal'
  },
  {
    id: 'faq-8',
    question: 'Apa yang dimaksud dengan kost "Terverifikasi"?',
    answer: 'Kost dengan label "Terverifikasi" telah melalui proses verifikasi oleh tim KostApp. Ini berarti informasi kost (foto, fasilitas, harga) telah divalidasi dan sesuai dengan kondisi aktual. Kost terverifikasi memberikan jaminan keakuratan informasi yang lebih tinggi.',
    category: 'general'
  }
];

export function HelpPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', label: 'Semua', icon: HelpCircle },
    { id: 'booking', label: 'Booking', icon: Receipt },
    { id: 'payment', label: 'Pembayaran', icon: CreditCard },
    { id: 'general', label: 'Umum', icon: MessageCircle },
    { id: 'legal', label: 'Hukum', icon: Scale }
  ];
  
  const filteredFAQ = activeCategory === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === activeCategory);
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <Headphones className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Pusat Bantuan</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Butuh bantuan? Tim customer service kami siap membantu Anda 7 hari seminggu. 
          Temukan jawaban dari pertanyaan umum atau hubungi kami langsung.
        </p>
      </div>
      
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg transition-all group">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Mail className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">Email Support</h3>
          <p className="text-emerald-600 font-semibold mb-1">{COMPANY_INFO.contact.email}</p>
          <p className="text-gray-400 text-sm">Respon dalam 1x24 jam kerja</p>
        </div>
        
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg transition-all group">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Phone className="w-7 h-7 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">WhatsApp</h3>
          <p className="text-green-600 font-semibold mb-1">{COMPANY_INFO.contact.phone}</p>
          <p className="text-gray-400 text-sm">Chat langsung dengan tim</p>
        </div>
        
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg transition-all group">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">Jam Operasional</h3>
          <p className="text-blue-600 font-semibold mb-1">{COMPANY_INFO.operatingHours.split(',')[1]}</p>
          <p className="text-gray-400 text-sm">{COMPANY_INFO.operatingHours.split(',')[0]}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Respons Cepat</h3>
            <p className="text-emerald-100 mb-3">Tim prioritas untuk masalah urgent</p>
            <a 
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors"
            >
              Hubungi Sekarang
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <FileQuestion className="w-4 h-4 inline mr-2" />
            FAQ
          </span>
          <h2 className="text-3xl font-black text-gray-800 mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-500">Temukan jawaban untuk pertanyaan umum seputar layanan KostApp</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all',
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
        
        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQ.map(faq => (
            <div 
              key={faq.id}
              className={cn(
                'bg-white border-2 rounded-2xl overflow-hidden transition-all',
                expandedFAQ === faq.id ? 'border-emerald-200 shadow-lg' : 'border-gray-100 hover:border-gray-200'
              )}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-bold text-gray-800 pr-4">{faq.question}</span>
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                  expandedFAQ === faq.id ? 'bg-emerald-500 text-white rotate-180' : 'bg-gray-100 text-gray-400'
                )}>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-5 pb-5 animate-fadeIn">
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment Security Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 mb-16">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <QrCode className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black text-emerald-800 mb-3">Sistem Pembayaran QRIS</h3>
            <p className="text-emerald-700 mb-4">
              KostApp menggunakan sistem pembayaran QRIS (Quick Response Code Indonesian Standard) yang telah 
              teregulasi oleh Bank Indonesia. Pembayaran Anda diproses dengan aman dan terenkripsi.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-emerald-800 font-medium">Diregulasi Bank Indonesia</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-emerald-800 font-medium">Enkripsi End-to-End</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-emerald-800 font-medium">Struk Resmi Otomatis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Trust Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8">
        <div className="text-center mb-8">
          <ShieldCheck className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-blue-800 mb-2">Transaksi yang Sah & Terlindungi</h3>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Setiap transaksi di KostApp tercatat secara elektronik dan dilindungi oleh hukum Republik Indonesia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/70 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">UU ITE</h4>
            </div>
            <p className="text-blue-700 text-sm">
              Transaksi elektronik dilindungi UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik.
            </p>
          </div>
          
          <div className="bg-white/70 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-blue-800">UU PDP</h4>
            </div>
            <p className="text-blue-700 text-sm">
              Data pribadi Anda dilindungi sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
            </p>
          </div>
        </div>
        
        <div className="mt-6 bg-amber-100/50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            <strong>Peringatan:</strong> Hanya lakukan transaksi melalui platform resmi KostApp. 
            Kami tidak bertanggung jawab atas transaksi yang dilakukan di luar platform ini.
          </p>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 mb-4">Tidak menemukan jawaban yang Anda cari?</p>
        <a 
          href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=Halo, saya butuh bantuan mengenai KostApp.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="lg" className="shadow-xl shadow-emerald-200">
            <MessageCircle className="w-5 h-5" />
            Hubungi Customer Service
          </Button>
        </a>
        <p className="text-gray-400 text-sm mt-4">
          © {COPYRIGHT_YEAR} {COMPANY_INFO.name}. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </div>
  );
}
