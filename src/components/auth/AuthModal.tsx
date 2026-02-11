import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, AtSign, IdCard } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { avatarUrl } from '@/utils/helpers';
import { cn } from '@/utils/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'login' | 'register';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form
  const [loginIdentity, setLoginIdentity] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  const { login, register, showToast, setRoute } = useStore();
  
  const resetForms = () => {
    setLoginIdentity('');
    setLoginPassword('');
    setRegName('');
    setRegUsername('');
    setRegContact('');
    setRegPassword('');
    setShowPassword(false);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    
    const user = login(loginIdentity, loginPassword);
    
    if (user) {
      showToast(`Selamat datang, ${user.name}!`);
      resetForms();
      onClose();
      if (user.role === 'admin') {
        setRoute('admin');
      }
    } else {
      showToast('Login gagal. Periksa data yang Anda masukkan.');
    }
    
    setIsLoading(false);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (regUsername.length < 4 || !/^[a-zA-Z0-9_]+$/.test(regUsername)) {
      showToast('Username tidak valid (min 4, hanya huruf/angka/_).');
      setIsLoading(false);
      return;
    }
    
    if (regPassword.length < 6) {
      showToast('Password minimal 6 karakter.');
      setIsLoading(false);
      return;
    }
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    
    const user = register({
      name: regName,
      username: regUsername,
      contact: regContact,
      password: regPassword,
      photo: avatarUrl(regName)
    });
    
    if (user) {
      showToast('Akun berhasil dibuat. Selamat datang!');
      resetForms();
      onClose();
    } else {
      showToast('Registrasi gagal. Username atau kontak sudah digunakan.');
    }
    
    setIsLoading(false);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="max-w-lg">
      {/* Header */}
      <div className="relative h-40 bg-gradient-to-br from-emerald-600 to-teal-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 text-xl"
        >
          ×
        </button>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h2 className="text-2xl font-black">
            {tab === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </h2>
          <p className="text-emerald-100 mt-2">
            {tab === 'login' 
              ? 'Masuk untuk booking, favorit, dan pesanan' 
              : 'Daftar agar bisa booking & simpan favorit'}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setTab('login')}
            className={cn(
              'py-3 rounded-xl font-bold border-2 transition-all',
              tab === 'login' 
                ? 'border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            )}
          >
            Masuk
          </button>
          <button
            onClick={() => setTab('register')}
            className={cn(
              'py-3 rounded-xl font-bold border-2 transition-all',
              tab === 'register' 
                ? 'border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm' 
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            )}
          >
            Daftar
          </button>
        </div>
        
        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email/HP/Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  value={loginIdentity}
                  onChange={(e) => setLoginIdentity(e.target.value)}
                  placeholder="admin@kostapp.id / admin"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Demo: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">admin</span> / <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Admin123!</span>
            </p>
            
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Masuk
            </Button>
          </form>
        )}
        
        {/* Register Form */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="contoh: rina_putri"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Min 4 karakter, hanya huruf/angka/underscore.</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email / Nomor HP
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  value={regContact}
                  onChange={(e) => setRegContact(e.target.value)}
                  placeholder="contoh@email.com atau 0812xxxx"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Buat Akun
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}
