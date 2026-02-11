import { Zap, Tag, Calendar, Percent } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { formatIDR } from '@/utils/helpers';
import type { Kost } from '@/types';

interface PromoPageProps {
  onOpenKostDetail: (kost: Kost) => void;
}

export function PromoPage({ onOpenKostDetail }: PromoPageProps) {
  const { kosts } = useStore();
  
  const promoKosts = kosts.filter(k => k.promo);
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold mb-4">
          <Zap className="w-5 h-5" />
          Promo Aktif
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-4">Promo Eksklusif KostApp</h1>
        <p className="text-gray-500 text-lg">Nikmati berbagai penawaran spesial hanya di KostApp!</p>
      </div>
      
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Percent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Diskon 10% untuk Sewa ≥ 3 Bulan</h2>
            <p className="opacity-90">Berlaku untuk semua kost dengan label promo</p>
          </div>
        </div>
      </div>
      
      {/* Promo Kost List */}
      {promoKosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {promoKosts.map(kost => (
            <div 
              key={kost.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4">
                <img 
                  src={kost.img} 
                  alt={kost.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold mb-2">
                        <Zap className="w-3 h-3" />
                        Promo
                      </span>
                      <h3 className="font-bold text-gray-800">{kost.name}</h3>
                      <p className="text-sm text-gray-500">{kost.loc} • {kost.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-emerald-600">{formatIDR(kost.price)}/bln</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onOpenKostDetail(kost)}
                    >
                      Lihat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-12 text-center mb-10">
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada promo aktif</h3>
          <p className="text-gray-500">Cek lagi nanti untuk penawaran menarik!</p>
        </div>
      )}
      
      {/* Terms */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          Syarat & Ketentuan
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
            Promo berlaku sesuai ketersediaan kost.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
            Promo dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
            Diskon dihitung otomatis saat checkout untuk durasi sewa ≥ 3 bulan.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
            Pengajuan promo mengikuti kebijakan pemilik kost.
          </li>
        </ul>
      </div>
    </div>
  );
}
