import { Heart, MapPin, Star, BadgeCheck, Zap } from 'lucide-react';
import type { Kost } from '@/types';
import { useStore } from '@/store/useStore';
import { formatIDR } from '@/utils/helpers';
import { cn } from '@/utils/cn';

interface KostCardProps {
  kost: Kost;
  onClick: () => void;
}

export function KostCard({ kost, onClick }: KostCardProps) {
  const { currentUser, toggleFavorite, isFavorite, showToast } = useStore();
  const isFav = currentUser ? isFavorite(kost.id) : false;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      showToast('Silakan masuk untuk menyimpan favorit.');
      return;
    }
    toggleFavorite(kost.id);
    showToast(isFav ? 'Dihapus dari favorit.' : 'Ditambahkan ke favorit.');
  };
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent',
        'cursor-pointer transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200'
      )}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={kost.img}
          alt={kost.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-full text-xs font-bold uppercase">
          {kost.type}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center',
            'border border-white/50 bg-white/95 transition-all hover:scale-110',
            isFav && 'bg-red-50'
          )}
        >
          <Heart className={cn('w-5 h-5', isFav ? 'fill-red-500 text-red-500' : 'text-gray-400')} />
        </button>
        
        {/* Verified Badge */}
        {kost.verified && (
          <div className="absolute bottom-4 left-4 bg-emerald-600/95 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <BadgeCheck className="w-4 h-4" />
            Verified
          </div>
        )}
        
        {/* Promo Badge */}
        {kost.promo && (
          <div className="absolute bottom-4 right-4 bg-orange-500/95 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <Zap className="w-4 h-4" />
            Promo
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{kost.loc}</span>
          <span className="mx-1">•</span>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-semibold text-gray-700">{kost.rating.toFixed(1)}</span>
          <span className="text-gray-400">({kost.reviews})</span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-3">{kost.name}</h3>
        
        <p className="text-emerald-600 font-black text-xl">
          {formatIDR(kost.price)}
          <span className="text-gray-500 text-sm font-semibold">/bulan</span>
        </p>
      </div>
    </div>
  );
}
