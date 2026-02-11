import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Building2, Users, Receipt, Plus, Pencil, Trash2, 
  Search, CheckCircle2, XCircle, Clock,
  MapPin, Star, BadgeCheck, Zap, Image, Save, X,
  TrendingUp, DollarSign, Calendar, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/store/useStore';
import { formatIDR, formatDate, formatDateTime, LOCATIONS, KOST_TYPES } from '@/utils/helpers';
import { cn } from '@/utils/cn';
import type { Kost } from '@/types';

type AdminTab = 'overview' | 'kosts' | 'transactions' | 'users' | 'bookings';

// Form state for kost
interface KostFormData {
  name: string;
  type: 'Putri' | 'Putra' | 'Campur';
  loc: string;
  address: string;
  price: number;
  img: string;
  fac: string;
  rating: number;
  reviews: number;
  verified: boolean;
  promo: boolean;
  promoPercent: number;
  available: boolean;
  rooms: number;
  description: string;
  owner: string;
  ownerPhone: string;
}

const defaultKostForm: KostFormData = {
  name: '',
  type: 'Campur',
  loc: 'Pontianak',
  address: '',
  price: 1000000,
  img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  fac: 'WiFi, AC, Kamar Mandi Dalam',
  rating: 4.5,
  reviews: 0,
  verified: false,
  promo: false,
  promoPercent: 10,
  available: true,
  rooms: 5,
  description: '',
  owner: '',
  ownerPhone: ''
};

export function AdminDashboard() {
  const { 
    kosts, users, transactions, bookings,
    addKost, updateKost, deleteKost, 
    currentUser, showToast 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Kost form state
  const [showKostModal, setShowKostModal] = useState(false);
  const [editingKost, setEditingKost] = useState<Kost | null>(null);
  const [kostForm, setKostForm] = useState<KostFormData>(defaultKostForm);
  const [previewImage, setPreviewImage] = useState('');
  
  // Stats
  const stats = useMemo(() => {
    const completedTxn = transactions.filter(t => 
      t.status === 'COMPLETED' || t.status === 'DP_PAID' || t.status === 'WAITING_VERIFICATION'
    );
    const totalRevenue = completedTxn.reduce((sum, t) => sum + (t.amountPaid || 0), 0);
    const pendingTxn = transactions.filter(t => 
      ['INITIATED', 'SCANNING', 'PROCESSING'].includes(t.status)
    );
    const verifiedKosts = kosts.filter(k => k.verified);
    const promoKosts = kosts.filter(k => k.promo);
    
    return {
      totalKosts: kosts.length,
      verifiedKosts: verifiedKosts.length,
      promoKosts: promoKosts.length,
      totalUsers: users.length,
      totalTransactions: transactions.length,
      completedTransactions: completedTxn.length,
      pendingTransactions: pendingTxn.length,
      totalRevenue,
      totalBookings: bookings.length
    };
  }, [kosts, users, transactions, bookings]);
  
  // Check if user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
        <p className="text-gray-500">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
      </div>
    );
  }
  
  // Handle kost form
  const openAddKostModal = () => {
    setEditingKost(null);
    setKostForm(defaultKostForm);
    setPreviewImage(defaultKostForm.img);
    setShowKostModal(true);
  };
  
  const openEditKostModal = (kost: Kost) => {
    setEditingKost(kost);
    setKostForm({
      name: kost.name,
      type: kost.type,
      loc: kost.loc,
      address: kost.address,
      price: kost.price,
      img: kost.img,
      fac: kost.fac.join(', '),
      rating: kost.rating,
      reviews: kost.reviews,
      verified: kost.verified,
      promo: kost.promo,
      promoPercent: kost.promoPercent || 10,
      available: kost.available,
      rooms: kost.rooms,
      description: kost.description,
      owner: kost.owner,
      ownerPhone: kost.ownerPhone
    });
    setPreviewImage(kost.img);
    setShowKostModal(true);
  };
  
  const handleKostFormChange = (field: keyof KostFormData, value: string | number | boolean) => {
    setKostForm(prev => ({ ...prev, [field]: value }));
    if (field === 'img') {
      setPreviewImage(value as string);
    }
  };
  
  const handleSaveKost = () => {
    // Validation
    if (!kostForm.name.trim()) {
      showToast('Nama kost harus diisi', 'error');
      return;
    }
    if (!kostForm.address.trim()) {
      showToast('Alamat harus diisi', 'error');
      return;
    }
    if (!kostForm.owner.trim()) {
      showToast('Nama pemilik harus diisi', 'error');
      return;
    }
    
    const facilities = kostForm.fac.split(',').map(f => f.trim()).filter(Boolean);
    
    const kostData = {
      name: kostForm.name.trim(),
      type: kostForm.type,
      loc: kostForm.loc,
      address: kostForm.address.trim(),
      price: Number(kostForm.price),
      img: kostForm.img,
      images: [kostForm.img],
      fac: facilities,
      rating: Number(kostForm.rating),
      reviews: Number(kostForm.reviews),
      verified: kostForm.verified,
      promo: kostForm.promo,
      promoPercent: Number(kostForm.promoPercent),
      available: kostForm.available,
      rooms: Number(kostForm.rooms),
      description: kostForm.description.trim(),
      owner: kostForm.owner.trim(),
      ownerPhone: kostForm.ownerPhone.trim()
    };
    
    if (editingKost) {
      updateKost(editingKost.id, kostData);
      showToast('Kost berhasil diperbarui', 'success');
    } else {
      addKost(kostData);
      showToast('Kost berhasil ditambahkan', 'success');
    }
    
    setShowKostModal(false);
    setEditingKost(null);
    setKostForm(defaultKostForm);
  };
  
  const handleDeleteKost = (kost: Kost) => {
    if (confirm(`Hapus kost "${kost.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      deleteKost(kost.id);
      showToast('Kost berhasil dihapus', 'success');
    }
  };
  
  // Filter functions
  const filteredKosts = useMemo(() => {
    return kosts.filter(k => 
      k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [kosts, searchQuery]);
  
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }
    if (searchQuery) {
      result = result.filter(t => 
        t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.kostName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [transactions, statusFilter, searchQuery]);
  
  // Tab content
  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'kosts', label: 'Kelola Kost', icon: Building2 },
    { id: 'transactions', label: 'Transaksi', icon: Receipt },
    { id: 'bookings', label: 'Booking', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Kelola kost, transaksi, dan pengguna</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm">
            <BadgeCheck className="w-4 h-4" />
            Admin: {currentUser.name}
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-3xl font-black text-gray-800">{stats.totalKosts}</p>
              <p className="text-gray-500 text-sm mt-1">Total Kost</p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">
                  {stats.verifiedKosts} verified
                </span>
                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                  {stats.promoKosts} promo
                </span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-black text-gray-800">{stats.totalTransactions}</p>
              <p className="text-gray-500 text-sm mt-1">Total Transaksi</p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">
                  {stats.completedTransactions} sukses
                </span>
                <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-semibold">
                  {stats.pendingTransactions} pending
                </span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-black text-gray-800">{stats.totalUsers}</p>
              <p className="text-gray-500 text-sm mt-1">Total Users</p>
              <p className="text-purple-600 text-xs mt-2 font-semibold">Terdaftar di sistem</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-black">{formatIDR(stats.totalRevenue)}</p>
              <p className="text-emerald-100 text-sm mt-1">Total Revenue</p>
              <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Dari {stats.completedTransactions} transaksi
              </p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Transaksi Terbaru</h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('transactions')}>
                Lihat Semua
              </Button>
            </div>
            
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Belum ada transaksi</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Kost</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Opsi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Jumlah</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 5).map(txn => (
                      <tr key={txn.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm text-gray-600">{txn.transactionId}</td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-gray-800 text-sm">{txn.userName}</p>
                          <p className="text-gray-400 text-xs">@{txn.username}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{txn.kostName}</td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            'text-xs px-2 py-0.5 rounded font-semibold',
                            txn.paymentOption === 'OPTION_A' ? 'bg-emerald-100 text-emerald-700' :
                            txn.paymentOption === 'OPTION_B' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          )}>
                            {txn.paymentOptionName}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-600 text-sm">
                          {formatIDR(txn.amountPaid || txn.totalAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
                            txn.status === 'COMPLETED' || txn.status === 'DP_PAID' ? 'bg-emerald-100 text-emerald-700' :
                            txn.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          )}>
                            {txn.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                            {txn.status === 'FAILED' && <XCircle className="w-3 h-3" />}
                            {!['COMPLETED', 'DP_PAID', 'FAILED'].includes(txn.status) && <Clock className="w-3 h-3" />}
                            {txn.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">{formatDateTime(txn.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Kosts Tab */}
      {activeTab === 'kosts' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kost, lokasi, atau pemilik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            <Button variant="primary" onClick={openAddKostModal}>
              <Plus className="w-4 h-4" />
              Tambah Kost
            </Button>
          </div>
          
          {/* Kost List */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Kost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Lokasi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Tipe</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Harga</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKosts.map(kost => (
                    <tr key={kost.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={kost.img} alt={kost.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-semibold text-gray-800">{kost.name}</p>
                            <p className="text-gray-400 text-xs">{kost.owner}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          {kost.loc}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{kost.type}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600 text-sm">{formatIDR(kost.price)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-semibold text-sm">{kost.rating}</span>
                          <span className="text-gray-400 text-xs">({kost.reviews})</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {kost.verified && (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <BadgeCheck className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                          {kost.promo && (
                            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <Zap className="w-3 h-3" />
                              Promo
                            </span>
                          )}
                          {!kost.available && (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              Penuh
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditKostModal(kost)}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteKost(kost)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredKosts.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Tidak ada kost ditemukan</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari ID transaksi, user, atau kost..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 font-semibold bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="DP_PAID">DP Paid</option>
              <option value="WAITING_VERIFICATION">Waiting Verification</option>
              <option value="PROCESSING">Processing</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
          
          {/* Transaction List */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">ID Transaksi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Kost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Opsi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Dibayar</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(txn => (
                    <tr key={txn.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-mono text-sm text-gray-800">{txn.transactionId}</p>
                        <p className="text-gray-400 text-xs">{txn.invoiceNumber}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-800 text-sm">{txn.userName}</p>
                        <p className="text-gray-400 text-xs">{txn.contact}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-800">{txn.kostName}</p>
                        <p className="text-gray-400 text-xs">{txn.months} bulan</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded font-semibold',
                          txn.paymentOption === 'OPTION_A' ? 'bg-emerald-100 text-emerald-700' :
                          txn.paymentOption === 'OPTION_B' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        )}>
                          {txn.paymentOptionName}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800 text-sm">{formatIDR(txn.totalAmount)}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600 text-sm">{formatIDR(txn.amountPaid || 0)}</td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
                          txn.status === 'COMPLETED' || txn.status === 'DP_PAID' ? 'bg-emerald-100 text-emerald-700' :
                          txn.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                          txn.status === 'WAITING_VERIFICATION' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        )}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{formatDateTime(txn.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Tidak ada transaksi ditemukan</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Daftar Booking ({bookings.length})</h2>
            </div>
            
            {bookings.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Belum ada booking</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Kost</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Periode</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Dibayar</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <p className="font-semibold text-gray-800 text-sm">{booking.userName}</p>
                          <p className="text-gray-400 text-xs">{booking.contact}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-800">{booking.kostName}</p>
                          <p className="text-gray-400 text-xs">{booking.loc}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-800 text-sm">{formatIDR(booking.total)}</td>
                        <td className="py-3 px-4 font-bold text-emerald-600 text-sm">{formatIDR(booking.amountPaid)}</td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
                            booking.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            booking.status === 'dp_paid' ? 'bg-blue-100 text-blue-700' :
                            booking.status === 'waiting_payment' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          )}>
                            {booking.status}
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
      )}
      
      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Daftar Users ({users.length})</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Kontak</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Terdaftar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                          <p className="font-semibold text-gray-800">{user.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">@{user.username}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.contact}</td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs font-bold',
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Kost Form Modal */}
      <Modal isOpen={showKostModal} onClose={() => setShowKostModal(false)} className="max-w-3xl">
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-800">
              {editingKost ? 'Edit Kost' : 'Tambah Kost Baru'}
            </h2>
            <button onClick={() => setShowKostModal(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Form */}
          <div className="p-5 space-y-5">
            {/* Image Preview */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Foto Kost</label>
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={kostForm.img}
                    onChange={(e) => handleKostFormChange('img', e.target.value)}
                    placeholder="URL gambar kost"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                  />
                  <p className="text-gray-400 text-xs mt-2">Masukkan URL gambar dari internet</p>
                </div>
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Nama Kost *</label>
                <input
                  type="text"
                  value={kostForm.name}
                  onChange={(e) => handleKostFormChange('name', e.target.value)}
                  placeholder="Contoh: Kost Aurora Premium"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Tipe Kost</label>
                <select
                  value={kostForm.type}
                  onChange={(e) => handleKostFormChange('type', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                >
                  {KOST_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Lokasi</label>
                <select
                  value={kostForm.loc}
                  onChange={(e) => handleKostFormChange('loc', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Harga / Bulan *</label>
                <input
                  type="number"
                  value={kostForm.price}
                  onChange={(e) => handleKostFormChange('price', e.target.value)}
                  placeholder="1000000"
                  min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Alamat Lengkap *</label>
              <input
                type="text"
                value={kostForm.address}
                onChange={(e) => handleKostFormChange('address', e.target.value)}
                placeholder="Jl. Ahmad Yani No. 88, Pontianak"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Deskripsi</label>
              <textarea
                value={kostForm.description}
                onChange={(e) => handleKostFormChange('description', e.target.value)}
                placeholder="Deskripsi singkat tentang kost ini..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Fasilitas</label>
              <input
                type="text"
                value={kostForm.fac}
                onChange={(e) => handleKostFormChange('fac', e.target.value)}
                placeholder="WiFi, AC, Kamar Mandi Dalam, Parkir (pisahkan dengan koma)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
              <p className="text-gray-400 text-xs">Pisahkan dengan koma</p>
            </div>
            
            {/* Owner Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Nama Pemilik *</label>
                <input
                  type="text"
                  value={kostForm.owner}
                  onChange={(e) => handleKostFormChange('owner', e.target.value)}
                  placeholder="Ibu Sari"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">No. Telepon Pemilik</label>
                <input
                  type="text"
                  value={kostForm.ownerPhone}
                  onChange={(e) => handleKostFormChange('ownerPhone', e.target.value)}
                  placeholder="08123456789"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Rating</label>
                <input
                  type="number"
                  value={kostForm.rating}
                  onChange={(e) => handleKostFormChange('rating', e.target.value)}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Ulasan</label>
                <input
                  type="number"
                  value={kostForm.reviews}
                  onChange={(e) => handleKostFormChange('reviews', e.target.value)}
                  min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Kamar Tersisa</label>
                <input
                  type="number"
                  value={kostForm.rooms}
                  onChange={(e) => handleKostFormChange('rooms', e.target.value)}
                  min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Diskon Promo (%)</label>
                <input
                  type="number"
                  value={kostForm.promoPercent}
                  onChange={(e) => handleKostFormChange('promoPercent', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>
            
            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={kostForm.verified}
                  onChange={(e) => handleKostFormChange('verified', e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-gray-700">Terverifikasi</span>
              </label>
              
              <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={kostForm.promo}
                  onChange={(e) => handleKostFormChange('promo', e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="font-semibold text-gray-700">Promo Aktif</span>
              </label>
              
              <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={kostForm.available}
                  onChange={(e) => handleKostFormChange('available', e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-gray-700">Tersedia</span>
              </label>
            </div>
          </div>
          
          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowKostModal(false)}>
              Batal
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleSaveKost}>
              <Save className="w-4 h-4" />
              {editingKost ? 'Simpan Perubahan' : 'Tambah Kost'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
