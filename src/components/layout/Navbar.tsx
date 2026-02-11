import { useState } from 'react';
import { Layers, Menu, X, Heart, Receipt, Gauge, LogOut, ChevronDown, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/utils/cn';

interface NavbarProps {
  onOpenAuth: () => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, logout, setRoute, currentRoute, showToast } = useStore();
  
  const handleNavClick = (route: string) => {
    setRoute(route);
    setMobileMenuOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    showToast('Berhasil logout.');
    setRoute('home');
    setUserMenuOpen(false);
  };
  
  const navLinks = [
    { route: 'promo', label: 'Promo' },
    { route: 'search', label: 'Cari Kost' },
    { route: 'favorites', label: 'Favorit' },
    { route: 'help', label: 'Pusat Bantuan' },
  ];
  
  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-emerald-600 font-black text-xl"
        >
          <Layers className="w-7 h-7" />
          KostApp
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.route}
              onClick={() => handleNavClick(link.route)}
              className={cn(
                'font-bold text-sm transition-colors',
                currentRoute === link.route ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
              )}
            >
              {link.label}
            </button>
          ))}
          
          {/* Auth Area */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-full hover:shadow-md transition-all"
              >
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-emerald-100"
                />
                <div className="text-left hidden lg:block">
                  <p className="font-bold text-gray-800 text-sm leading-tight">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">@{currentUser.username}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setUserMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 overflow-hidden">
                    <div className="p-2">
                      <button
                        onClick={() => { handleNavClick('favorites'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-left font-semibold text-gray-700"
                      >
                        <Heart className="w-5 h-5" />
                        Favorit
                      </button>
                      <button
                        onClick={() => { handleNavClick('orders'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-left font-semibold text-gray-700"
                      >
                        <Receipt className="w-5 h-5" />
                        Pesanan Saya
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => { handleNavClick('admin'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-left font-semibold text-gray-700"
                        >
                          <Gauge className="w-5 h-5" />
                          Admin Dashboard
                        </button>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-left font-semibold text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Masuk / Daftar
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.route}
              onClick={() => handleNavClick(link.route)}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-xl font-bold transition-colors',
                currentRoute === link.route 
                  ? 'bg-emerald-50 text-emerald-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {link.label}
            </button>
          ))}
          
          {currentUser ? (
            <>
              <button
                onClick={() => handleNavClick('orders')}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
              >
                <Receipt className="w-5 h-5 inline mr-2" />
                Pesanan Saya
              </button>
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
                >
                  <Gauge className="w-5 h-5 inline mr-2" />
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 inline mr-2" />
                Keluar
              </button>
            </>
          ) : (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Masuk / Daftar
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
