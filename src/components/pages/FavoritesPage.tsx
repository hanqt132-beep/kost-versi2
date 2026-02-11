import { Heart, Trash2 } from 'lucide-react';
import { KostCard } from '@/components/kost/KostCard';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import type { Kost } from '@/types';

interface FavoritesPageProps {
  onOpenKostDetail: (kost: Kost) => void;
}

export function FavoritesPage({ onOpenKostDetail }: FavoritesPageProps) {
  const { currentUser, getFavorites, clearFavorites, showToast, setRoute } = useStore();
  
  const favorites = currentUser ? getFavorites() : [];
  
  const handleClearFavorites = () => {
    if (confirm('Hapus semua favorit Anda?')) {
      clearFavorites();
      showToast('Favorit dibersihkan.');
    }
  };
  
  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk untuk melihat favorit</h2>
        <p className="text-gray-500">Favorit tersimpan per akun pengguna.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Favorit</h1>
          <p className="text-gray-500 mt-1">Simpan kost yang kamu sukai agar mudah ditemukan kembali.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleClearFavorites}
          disabled={favorites.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          Hapus Semua
        </Button>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <Heart className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada favorit</h3>
          <p className="text-gray-500 mb-6">Tekan ikon hati pada kartu kost untuk menyimpan.</p>
          <Button variant="primary" onClick={() => setRoute('home')}>
            Jelajahi Kost
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map(kost => (
            <KostCard
              key={kost.id}
              kost={kost}
              onClick={() => onOpenKostDetail(kost)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
