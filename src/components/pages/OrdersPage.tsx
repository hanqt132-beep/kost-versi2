import { useState } from 'react';
import { 
  Receipt, Eye, FileText, Calendar, MapPin, 
  Clock, CheckCircle2, XCircle, AlertCircle, 
  Filter, ChevronDown, CreditCard, Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SimpleReceipt } from '@/components/payment/SimpleReceipt';
import { useStore } from '@/store/useStore';
import { formatIDR, formatDate, formatDateTime } from '@/utils/helpers';
import { cn } from '@/utils/cn';
import type { Transaction, TransactionStatus } from '@/types';

const STATUS_CONFIG: Record<TransactionStatus, { label: string; color: string; icon: typeof Clock }> = {
  INITIATED: { label: 'Menunggu', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock },
  PAYMENT_SELECTED: { label: 'Opsi Dipilih', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: CreditCard },
  SCANNING: { label: 'Scan QR', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertCircle },
  SCANNED: { label: 'Terbaca', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 },
  CONFIRMED: { label: 'Dikonfirmasi', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 },
  PROCESSING: { label: 'Diproses', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  COMPLETED: { label: 'Berhasil', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  FAILED: { label: 'Gagal', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
  EXPIRED: { label: 'Kedaluwarsa', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: XCircle },
  WAITING_VERIFICATION: { label: 'Tunggu Verifikasi', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  DP_PAID: { label: 'DP Dibayar', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Wallet },
  INSTALLMENT_PENDING: { label: 'Cicilan Pending', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Calendar }
};

export function OrdersPage() {
  const { currentUser, getUserBookings, getUserTransactions, showToast, setRoute } = useStore();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);
  
  const transactions = getUserTransactions();
  const bookings = getUserBookings();
  
  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);
  
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Receipt className="w-12 h-12 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Silakan Masuk</h2>
        <p className="text-slate-500 mb-6 text-center max-w-md">
          Anda harus login untuk melihat riwayat pesanan dan transaksi.
        </p>
      </div>
    );
  }
  
  const handleViewReceipt = (transactionId: string) => {
    const txn = transactions.find(t => t.transactionId === transactionId);
    if (txn && (txn.status === 'COMPLETED' || txn.status === 'DP_PAID' || txn.status === 'WAITING_VERIFICATION')) {
      setSelectedTransaction(txn);
    } else {
      showToast('Struk hanya tersedia untuk transaksi yang sudah diproses.', 'info');
    }
  };
  
  const getAmountDisplay = (txn: Transaction) => {
    if (txn.paymentOption === 'OPTION_A') {
      return txn.totalAmount;
    } else if (txn.paymentOption === 'OPTION_B') {
      return txn.dpAmount || 0;
    } else {
      return txn.depositAmount || 0;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">Pesanan & Transaksi</h1>
        <p className="text-slate-500 mt-1">Riwayat booking dan pembayaran Anda.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">
            {transactions.filter(t => t.status === 'COMPLETED' || t.status === 'DP_PAID').length}
          </p>
          <p className="text-slate-500 text-sm">Berhasil</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">
            {transactions.filter(t => ['INITIATED', 'SCANNING', 'PROCESSING', 'WAITING_VERIFICATION'].includes(t.status)).length}
          </p>
          <p className="text-slate-500 text-sm">Pending</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">
            {transactions.filter(t => t.status === 'FAILED').length}
          </p>
          <p className="text-slate-500 text-sm">Gagal</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{transactions.length}</p>
          <p className="text-slate-500 text-sm">Total</p>
        </div>
      </div>
      
      {/* Transactions Section */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-800">Transaksi ({filteredTransactions.length})</h2>
          </div>
          
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showFilter && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
                <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 min-w-[160px] p-2">
                  {['all', 'COMPLETED', 'DP_PAID', 'PROCESSING', 'FAILED'].map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setShowFilter(false); }}
                      className={cn(
                        'w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                        statusFilter === status ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'
                      )}
                    >
                      {status === 'all' ? 'Semua' : STATUS_CONFIG[status as TransactionStatus]?.label || status}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Belum ada transaksi</h3>
            <p className="text-slate-500 mb-6">Mulai booking kost untuk melihat riwayat transaksi.</p>
            <Button variant="primary" onClick={() => setRoute('home')}>
              Cari Kost
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map(txn => {
              const statusConfig = STATUS_CONFIG[txn.status];
              const StatusIcon = statusConfig?.icon || Clock;
              
              return (
                <div key={txn.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Left: Transaction Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border',
                          statusConfig?.color
                        )}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig?.label}
                        </span>
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded text-xs font-bold',
                          txn.paymentOption === 'OPTION_A' ? 'bg-emerald-100 text-emerald-700' :
                          txn.paymentOption === 'OPTION_B' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        )}>
                          {txn.paymentOptionName}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {formatDateTime(txn.timestamp)}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{txn.kostName}</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {txn.kostAddress}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-slate-400">ID: </span>
                          <span className="font-mono font-semibold text-slate-700">{txn.transactionId}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Durasi: </span>
                          <span className="font-semibold text-slate-700">{txn.months} bulan</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Periode: </span>
                          <span className="font-semibold text-slate-700">
                            {formatDate(txn.startDate)} - {formatDate(txn.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: Amount & Actions */}
                    <div className="flex items-center gap-4 md:flex-col md:items-end">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">
                          {txn.paymentOption === 'OPTION_A' ? 'Total' : 
                           txn.paymentOption === 'OPTION_B' ? 'DP Dibayar' : 'Deposit'}
                        </p>
                        <p className="text-xl font-black text-emerald-600">{formatIDR(getAmountDisplay(txn))}</p>
                        {txn.paymentOption !== 'OPTION_A' && (txn.remainingAmount || 0) > 0 && (
                          <p className="text-xs text-slate-400">Sisa: {formatIDR(txn.remainingAmount || 0)}</p>
                        )}
                      </div>
                      
                      {(txn.status === 'COMPLETED' || txn.status === 'DP_PAID' || txn.status === 'WAITING_VERIFICATION') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReceipt(txn.transactionId)}
                        >
                          <Eye className="w-4 h-4" />
                          Lihat Struk
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Bookings Section */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-800">Booking Aktif ({bookings.filter(b => b.status === 'approved' || b.status === 'dp_paid').length})</h2>
          </div>
        </div>
        
        {bookings.filter(b => b.status === 'approved' || b.status === 'dp_paid').length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Belum ada booking aktif</h3>
            <p className="text-slate-500">Booking yang berhasil akan muncul di sini.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {bookings.filter(b => b.status === 'approved' || b.status === 'dp_paid').map(booking => (
              <div key={booking.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800">{booking.kostName}</h4>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded font-bold',
                        booking.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      )}>
                        {booking.status === 'approved' ? 'Lunas' : 'DP Dibayar'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{booking.kostAddress}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-slate-600">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </span>
                      <span className="font-bold text-emerald-600">{formatIDR(booking.total)}</span>
                      {booking.remainingAmount > 0 && (
                        <span className="text-amber-600">Sisa: {formatIDR(booking.remainingAmount)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Receipt Modal */}
      <Modal 
        isOpen={!!selectedTransaction} 
        onClose={() => setSelectedTransaction(null)}
        className="max-w-3xl"
      >
        {selectedTransaction && (
          <div className="p-6 max-h-[90vh] overflow-y-auto">
            <SimpleReceipt 
              transaction={selectedTransaction} 
              onClose={() => setSelectedTransaction(null)} 
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
