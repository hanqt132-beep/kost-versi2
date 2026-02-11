import { useState } from 'react';
import { 
  MapPin, Star, BadgeCheck, Zap, Heart, Check, 
  Users, Phone, Shield, ChevronRight,
  Building2, Wifi, Car, ShowerHead,
  CreditCard, Calendar, MapPinned, Info, Wallet
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { formatIDR } from '@/utils/helpers';
import { PAYMENT_OPTIONS } from '@/utils/legal';
import type { Kost, PaymentOptionType } from '@/types';
import { cn } from '@/utils/cn';

interface KostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kost: Kost | null;
  onProceedToPayment: (months: number, startDate: string, paymentOption: PaymentOptionType) => void;
}

const FACILITY_ICONS: Record<string, typeof Wifi> = {
  'wifi': Wifi,
  'parkir': Car,
  'kamar mandi': ShowerHead,
  'k. mandi': ShowerHead,
};

const getFacilityIcon = (facility: string) => {
  const lower = facility.toLowerCase();
  for (const [key, Icon] of Object.entries(FACILITY_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return Check;
};

const PAYMENT_OPTION_ICONS = {
  OPTION_A: CreditCard,
  OPTION_B: Calendar,
  OPTION_C: MapPinned
};

const PAYMENT_OPTION_COLORS = {
  OPTION_A: 'emerald',
  OPTION_B: 'blue', 
  OPTION_C: 'amber'
};

export function KostDetailModal({ isOpen, onClose, kost, onProceedToPayment }: KostDetailModalProps) {
  const [months, setMonths] = useState(1);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOptionType>('OPTION_A');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  const { currentUser, toggleFavorite, isFavorite, showToast } = useStore();
  
  if (!kost) return null;
  
  const isFav = currentUser ? isFavorite(kost.id) : false;
  const subtotal = kost.price * months;
  const promoPercent = kost.promo && months >= 3 ? (kost.promoPercent || 10) : 0;
  const discount = Math.round(subtotal * (promoPercent / 100));
  const adminFee = 5000;
  const serviceFee = selectedPaymentOption === 'OPTION_C' ? 0 : 2500;
  const totalAmount = subtotal - discount + adminFee + serviceFee;
  
  // Calculate amounts based on payment option
  const getPaymentAmount = () => {
    if (selectedPaymentOption === 'OPTION_A') {
      return { label: 'Bayar Sekarang', amount: totalAmount };
    } else if (selectedPaymentOption === 'OPTION_B') {
      const dpAmount = Math.ceil(totalAmount * 0.3);
      return { label: 'Bayar DP (30%)', amount: dpAmount };
    } else {
      return { label: 'Deposit Booking', amount: PAYMENT_OPTIONS.OPTION_C.depositAmount };
    }
  };
  
  const paymentInfo = getPaymentAmount();
  
  const handleFavoriteClick = () => {
    if (!currentUser) {
      showToast('Silakan masuk untuk menyimpan favorit.', 'info');
      return;
    }
    toggleFavorite(kost.id);
    showToast(isFav ? 'Dihapus dari favorit.' : 'Ditambahkan ke favorit.', 'success');
  };
  
  const handleBooking = () => {
    if (!currentUser) {
      showToast('Silakan masuk untuk melakukan booking.', 'info');
      return;
    }
    if (!kost.available) {
      showToast('Maaf, kost ini sedang tidak tersedia.', 'error');
      return;
    }
    onProceedToPayment(months, startDate, selectedPaymentOption);
  };
  
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
      <div className="flex flex-col max-h-[92vh]">
        {/* Header Image */}
        <div className="relative h-72 flex-shrink-0">
          <img
            src={kost.img}
            alt={kost.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 text-xl font-bold backdrop-blur-sm"
          >
            ×
          </button>
          
          <button
            onClick={handleFavoriteClick}
            className={cn(
              'absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center',
              'border border-white/30 backdrop-blur-sm transition-all hover:scale-110',
              isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'
            )}
          >
            <Heart className={cn('w-6 h-6', isFav && 'fill-white')} />
          </button>
          
          {/* Bottom info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {kost.type}
                  </span>
                  {kost.verified && (
                    <span className="inline-flex items-center gap-1 bg-white/90 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Terverifikasi
                    </span>
                  )}
                  {kost.promo && (
                    <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      Promo {kost.promoPercent || 10}%
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-white drop-shadow-lg">{kost.name}</h2>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span className="text-lg">{kost.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-500 text-xs">{kost.reviews} ulasan</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Location */}
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-500 text-sm">{kost.loc}</p>
              <p className="text-gray-700">{kost.address}</p>
            </div>
          </div>
          
          {/* Availability & Rooms */}
          <div className="flex gap-4 mb-6">
            <div className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold',
              kost.available ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            )}>
              <div className={cn('w-2 h-2 rounded-full', kost.available ? 'bg-emerald-500' : 'bg-red-500')} />
              {kost.available ? 'Tersedia' : 'Penuh'}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold">
              <Users className="w-4 h-4" />
              {kost.rooms} kamar tersisa
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Deskripsi</h3>
            <p className="text-gray-600">{kost.description}</p>
          </div>
          
          <hr className="my-5" />
          
          {/* Price & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-emerald-50 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-emerald-700 mb-1">Harga / bulan</h4>
              <p className="text-3xl font-black text-emerald-600">{formatIDR(kost.price)}</p>
              {kost.promo && (
                <p className="text-emerald-600 text-sm mt-1 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Diskon {kost.promoPercent || 10}% untuk sewa ≥3 bulan
                </p>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-bold text-gray-600 mb-1 block">Durasi Sewa</label>
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-bold bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value={1}>1 bulan</option>
                  <option value={3}>3 bulan</option>
                  <option value={6}>6 bulan</option>
                  <option value={12}>12 bulan</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-600 mb-1 block">Tanggal Mulai</label>
                <input
                  type="date"
                  value={startDate}
                  min={minDateStr}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-semibold bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>
          
          <hr className="my-5" />
          
          {/* Payment Options - OPSI A, B, C */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                Pilih Opsi Pembayaran
              </h4>
              <button 
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                <Info className="w-4 h-4" />
                {showPaymentDetails ? 'Sembunyikan' : 'Info detail'}
              </button>
            </div>
            
            <div className="space-y-3">
              {Object.entries(PAYMENT_OPTIONS).map(([key, option]) => {
                const Icon = PAYMENT_OPTION_ICONS[key as PaymentOptionType];
                const colorClass = PAYMENT_OPTION_COLORS[key as PaymentOptionType];
                const isSelected = selectedPaymentOption === key;
                
                return (
                  <div key={key}>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentOption(key as PaymentOptionType)}
                      className={cn(
                        'w-full p-4 rounded-2xl border-2 text-left transition-all',
                        isSelected 
                          ? colorClass === 'emerald' ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100' 
                          : colorClass === 'blue' ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                          : 'border-amber-500 bg-amber-50 shadow-lg shadow-amber-100'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          colorClass === 'emerald' ? 'bg-emerald-100' :
                          colorClass === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
                        )}>
                          <Icon className={cn(
                            'w-6 h-6',
                            colorClass === 'emerald' ? 'text-emerald-600' :
                            colorClass === 'blue' ? 'text-blue-600' : 'text-amber-600'
                          )} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              'text-xs font-bold px-2 py-0.5 rounded',
                              colorClass === 'emerald' ? 'bg-emerald-200 text-emerald-800' :
                              colorClass === 'blue' ? 'bg-blue-200 text-blue-800' : 'bg-amber-200 text-amber-800'
                            )}>
                              {key.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="font-bold text-gray-800 mt-1">{option.name}</p>
                          <p className="text-gray-500 text-sm">{option.description}</p>
                        </div>
                        <div className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                          isSelected 
                            ? colorClass === 'emerald' ? 'border-emerald-500 bg-emerald-500' 
                            : colorClass === 'blue' ? 'border-blue-500 bg-blue-500'
                            : 'border-amber-500 bg-amber-500'
                            : 'border-gray-300'
                        )}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </button>
                    
                    {/* Show terms when selected and showPaymentDetails is true */}
                    {isSelected && showPaymentDetails && (
                      <div className={cn(
                        'mt-2 p-4 rounded-xl text-sm space-y-2',
                        colorClass === 'emerald' ? 'bg-emerald-50 border border-emerald-100' :
                        colorClass === 'blue' ? 'bg-blue-50 border border-blue-100' : 
                        'bg-amber-50 border border-amber-100'
                      )}>
                        <p className="font-bold text-gray-700">Ketentuan:</p>
                        <ul className="space-y-1.5">
                          {option.terms.map((term, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                              <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                              <span>{term}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <hr className="my-5" />
          
          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-5">
            <h4 className="font-bold text-gray-800 mb-3">Rincian Harga</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({months} bulan × {formatIDR(kost.price)})</span>
                <span className="font-semibold">{formatIDR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Diskon Promo ({promoPercent}%)
                  </span>
                  <span className="font-semibold">- {formatIDR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Biaya Admin</span>
                <span className="font-semibold">{formatIDR(adminFee)}</span>
              </div>
              {serviceFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Layanan</span>
                  <span className="font-semibold">{formatIDR(serviceFee)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t border-dashed border-gray-300 mt-2">
                <span className="font-bold text-gray-800 text-lg">Total</span>
                <span className="font-black text-2xl text-emerald-600">{formatIDR(totalAmount)}</span>
              </div>
              
              {/* Payment specific info */}
              {selectedPaymentOption === 'OPTION_B' && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-2">
                  <div className="flex justify-between text-blue-700">
                    <span className="font-semibold">DP yang dibayar (30%)</span>
                    <span className="font-bold">{formatIDR(Math.ceil(totalAmount * 0.3))}</span>
                  </div>
                  <div className="flex justify-between text-blue-600 text-sm mt-1">
                    <span>Sisa pembayaran</span>
                    <span>{formatIDR(totalAmount - Math.ceil(totalAmount * 0.3))}</span>
                  </div>
                </div>
              )}
              
              {selectedPaymentOption === 'OPTION_C' && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mt-2">
                  <div className="flex justify-between text-amber-700">
                    <span className="font-semibold">Deposit Booking</span>
                    <span className="font-bold">{formatIDR(PAYMENT_OPTIONS.OPTION_C.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between text-amber-600 text-sm mt-1">
                    <span>Bayar saat check-in</span>
                    <span>{formatIDR(totalAmount)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Facilities */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Fasilitas
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {kost.fac.map((facility, idx) => {
                const Icon = getFacilityIcon(facility);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl"
                  >
                    <Icon className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-700">{facility}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Owner Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <h4 className="font-bold text-blue-800 mb-2">Informasi Pemilik</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{kost.owner}</p>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {kost.ownerPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t bg-white flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-sm">{paymentInfo.label}</p>
              <p className="text-2xl font-black text-emerald-600">{formatIDR(paymentInfo.amount)}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Shield className="w-4 h-4" />
              Transaksi Aman
            </div>
          </div>
          <Button 
            variant="primary" 
            className="w-full text-lg py-4" 
            onClick={handleBooking}
            disabled={!kost.available}
          >
            {kost.available ? (
              <>
                Lanjutkan Pembayaran
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'Kost Tidak Tersedia'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
