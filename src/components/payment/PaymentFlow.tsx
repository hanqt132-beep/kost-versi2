import { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, ArrowLeft, 
  Loader2, AlertTriangle, Shield, Clock, Receipt, 
  Smartphone, Scan, Building2, FileText, Calendar,
  CreditCard, MapPin, Wallet
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { QRScanner } from './QRScanner';
import { SimpleReceipt } from './SimpleReceipt';
import { useStore } from '@/store/useStore';
import { formatIDR, formatDate } from '@/utils/helpers';
import { PAYMENT_OPTIONS } from '@/utils/legal';
import type { Transaction, TransactionStatus } from '@/types';
import { cn } from '@/utils/cn';

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

type Step = 'summary' | 'contract' | 'scanning' | 'confirm' | 'processing' | 'success' | 'failed';

const STATUS_TO_STEP: Record<TransactionStatus, Step> = {
  'INITIATED': 'summary',
  'PAYMENT_SELECTED': 'summary',
  'SCANNING': 'scanning',
  'SCANNED': 'confirm',
  'CONFIRMED': 'processing',
  'PROCESSING': 'processing',
  'COMPLETED': 'success',
  'FAILED': 'failed',
  'EXPIRED': 'failed',
  'WAITING_VERIFICATION': 'success',
  'DP_PAID': 'success',
  'INSTALLMENT_PENDING': 'success'
};

const STEP_INFO = [
  { key: 'summary', label: 'Ringkasan', icon: Receipt },
  { key: 'contract', label: 'Kontrak', icon: FileText },
  { key: 'scanning', label: 'Scan QR', icon: Scan },
  { key: 'confirm', label: 'Konfirmasi', icon: Shield },
];

export function PaymentFlow({ isOpen, onClose, transaction }: PaymentFlowProps) {
  const [step, setStep] = useState<Step>('summary');
  const [scannedQRData, setScannedQRData] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [contractAccepted, setContractAccepted] = useState(false);
  
  const { updateTransactionStatus, completeTransaction, failTransaction, showToast, activeTransaction, setActiveTransaction } = useStore();
  
  // Sync step with transaction status
  useEffect(() => {
    if (!activeTransaction) return;
    setStep(STATUS_TO_STEP[activeTransaction.status] || 'summary');
  }, [activeTransaction?.status]);
  
  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep('summary');
      setScannedQRData(null);
      setCountdown(300);
      setContractAccepted(false);
    }
  }, [isOpen]);
  
  // Countdown timer for payment
  useEffect(() => {
    if (!isOpen || activeTransaction?.status === 'COMPLETED' || activeTransaction?.status === 'FAILED') return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (activeTransaction && step !== 'success') {
            failTransaction(activeTransaction.transactionId, 'Waktu pembayaran habis');
            showToast('Waktu pembayaran habis. Transaksi dibatalkan.', 'error');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen, step, activeTransaction, failTransaction, showToast]);
  
  if (!transaction || !activeTransaction) return null;
  
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const getStepIndex = (s: Step) => {
    const idx = STEP_INFO.findIndex(info => info.key === s);
    return idx >= 0 ? idx : 0;
  };
  
  // Get amount to pay based on payment option
  const getAmountToPay = () => {
    if (activeTransaction.paymentOption === 'OPTION_A') {
      return activeTransaction.totalAmount;
    } else if (activeTransaction.paymentOption === 'OPTION_B') {
      return activeTransaction.dpAmount || 0;
    } else {
      return activeTransaction.depositAmount || 0;
    }
  };
  
  const amountToPay = getAmountToPay();
  
  const handleAcceptContract = () => {
    setContractAccepted(true);
    // For Option C (pay at location), skip scanning
    if (activeTransaction.paymentOption === 'OPTION_C') {
      handleProcessOptionC();
    } else {
      handleStartScan();
    }
  };
  
  const handleStartScan = () => {
    updateTransactionStatus(transaction.transactionId, 'SCANNING');
    setStep('scanning');
  };
  
  const handleProcessOptionC = () => {
    updateTransactionStatus(transaction.transactionId, 'PROCESSING');
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      completeTransaction(transaction.transactionId);
      setStep('success');
      showToast('Booking berhasil! Kode verifikasi telah dikirim.', 'success');
    }, 2000);
  };
  
  const handleScanSuccess = (data: string) => {
    setScannedQRData(data);
    updateTransactionStatus(transaction.transactionId, 'SCANNED', data);
    setStep('confirm');
    showToast('QR berhasil dipindai. Silakan konfirmasi pembayaran.', 'success');
  };
  
  const handleConfirmPayment = () => {
    updateTransactionStatus(transaction.transactionId, 'CONFIRMED');
    updateTransactionStatus(transaction.transactionId, 'PROCESSING');
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      completeTransaction(transaction.transactionId);
      setStep('success');
      showToast('Pembayaran Anda telah berhasil diproses.', 'success');
    }, 3000);
  };
  
  const handleCancelPayment = () => {
    failTransaction(transaction.transactionId, 'Dibatalkan oleh pengguna');
    setStep('failed');
    showToast('Transaksi dibatalkan.', 'error');
  };
  
  const handleClose = () => {
    if (step === 'processing') {
      showToast('Mohon tunggu, transaksi sedang diproses.', 'info');
      return;
    }
    
    if (step !== 'success' && step !== 'failed') {
      failTransaction(transaction.transactionId, 'Pembayaran tidak diselesaikan');
    }
    setActiveTransaction(null);
    onClose();
  };
  
  const handleFinish = () => {
    setActiveTransaction(null);
    onClose();
  };
  
  const optionConfig = PAYMENT_OPTIONS[activeTransaction.paymentOption];
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose} showCloseButton={step !== 'processing'} className="max-w-2xl">
      <div className="overflow-y-auto max-h-[90vh]">
        {/* Header with Timer */}
        {step !== 'success' && step !== 'failed' && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Batas Waktu Pembayaran</p>
                <p className="text-3xl font-mono font-bold">{formatCountdown(countdown)}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm">
                  {activeTransaction.paymentOption === 'OPTION_A' ? 'Total Bayar' :
                   activeTransaction.paymentOption === 'OPTION_B' ? 'DP (30%)' : 'Deposit'}
                </p>
                <p className="text-2xl font-bold">{formatIDR(amountToPay)}</p>
              </div>
            </div>
            
            {/* Payment Option Badge */}
            <div className="mt-3 flex items-center gap-2">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold',
                activeTransaction.paymentOption === 'OPTION_A' ? 'bg-white/20 text-white' :
                activeTransaction.paymentOption === 'OPTION_B' ? 'bg-blue-400/30 text-white' :
                'bg-amber-400/30 text-white'
              )}>
                {activeTransaction.paymentOption === 'OPTION_A' && <CreditCard className="w-3.5 h-3.5" />}
                {activeTransaction.paymentOption === 'OPTION_B' && <Calendar className="w-3.5 h-3.5" />}
                {activeTransaction.paymentOption === 'OPTION_C' && <MapPin className="w-3.5 h-3.5" />}
                {optionConfig.name}
              </span>
            </div>
          </div>
        )}
        
        {/* Progress Steps */}
        {step !== 'success' && step !== 'failed' && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              {STEP_INFO.map((info, i) => {
                const currentIdx = getStepIndex(step);
                const isActive = i === currentIdx;
                const isCompleted = i < currentIdx;
                const Icon = info.icon;
                
                return (
                  <div key={info.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                        isActive && 'bg-emerald-600 text-white shadow-lg shadow-emerald-200',
                        isCompleted && 'bg-emerald-500 text-white',
                        !isActive && !isCompleted && 'bg-gray-200 text-gray-400'
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <p className={cn(
                        'text-xs font-semibold mt-2 text-center',
                        isActive && 'text-emerald-600',
                        isCompleted && 'text-emerald-600',
                        !isActive && !isCompleted && 'text-gray-400'
                      )}>
                        {info.label}
                      </p>
                    </div>
                    {i < STEP_INFO.length - 1 && (
                      <div className={cn(
                        'flex-1 h-1 mx-2 rounded-full transition-all duration-300',
                        i < currentIdx ? 'bg-emerald-500' : 'bg-gray-200'
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Step: Summary */}
        {step === 'summary' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Konfirmasi Booking</h2>
              <p className="text-gray-500">Pastikan data sudah benar sebelum melanjutkan.</p>
            </div>
            
            {/* Transaction Info Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Transaction ID</p>
                <p className="font-mono font-bold text-gray-800 text-sm">{activeTransaction.transactionId}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Invoice</p>
                <p className="font-mono font-bold text-gray-800 text-xs break-all">{activeTransaction.invoiceNumber}</p>
              </div>
            </div>
            
            {/* Kost Summary */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
              <div className="flex gap-4">
                <Building2 className="w-12 h-12 text-emerald-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{activeTransaction.kostName}</h3>
                  <p className="text-sm text-gray-600">{activeTransaction.kostAddress}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-emerald-600 font-semibold">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {activeTransaction.months} bulan
                    </span>
                    <span className="text-gray-500">
                      {formatDate(activeTransaction.startDate)} - {formatDate(activeTransaction.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Breakdown */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Rincian Pembayaran</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({activeTransaction.months} bulan)</span>
                  <span className="font-semibold">{formatIDR(activeTransaction.subtotal)}</span>
                </div>
                {activeTransaction.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon Promo</span>
                    <span className="font-semibold">- {formatIDR(activeTransaction.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Admin</span>
                  <span className="font-semibold">{formatIDR(activeTransaction.adminFee)}</span>
                </div>
                {activeTransaction.serviceFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Biaya Layanan</span>
                    <span className="font-semibold">{formatIDR(activeTransaction.serviceFee)}</span>
                  </div>
                )}
                <div className="border-t border-dashed pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-black text-emerald-600">{formatIDR(activeTransaction.totalAmount)}</span>
                  </div>
                </div>
                
                {/* Payment Option Specific */}
                {activeTransaction.paymentOption === 'OPTION_B' && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-2">
                    <div className="flex justify-between text-blue-700">
                      <span className="font-semibold">DP yang dibayar (30%)</span>
                      <span className="font-bold">{formatIDR(activeTransaction.dpAmount || 0)}</span>
                    </div>
                    <div className="flex justify-between text-blue-600 text-sm mt-1">
                      <span>Sisa (dicicil 3x)</span>
                      <span>{formatIDR(activeTransaction.remainingAmount || 0)}</span>
                    </div>
                  </div>
                )}
                
                {activeTransaction.paymentOption === 'OPTION_C' && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mt-2">
                    <div className="flex justify-between text-amber-700">
                      <span className="font-semibold">Deposit Booking</span>
                      <span className="font-bold">{formatIDR(activeTransaction.depositAmount || 0)}</span>
                    </div>
                    <p className="text-amber-600 text-sm mt-1">
                      Bayar {formatIDR(activeTransaction.totalAmount)} saat check-in
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Method Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {activeTransaction.paymentOption === 'OPTION_C' ? (
                    <MapPin className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-blue-800">
                    {activeTransaction.paymentOption === 'OPTION_C' 
                      ? 'Pembayaran di Tempat'
                      : 'Pembayaran via Scan QR (QRIS)'}
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    {activeTransaction.paymentOption === 'OPTION_C'
                      ? 'Setelah konfirmasi, Anda akan menerima kode verifikasi untuk check-in.'
                      : 'Gunakan kamera untuk memindai kode QR pembayaran.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Batalkan
              </Button>
              <Button variant="primary" className="flex-1 py-4" onClick={() => setStep('contract')}>
                Lanjutkan
              </Button>
            </div>
          </div>
        )}
        
        {/* Step: Contract */}
        {step === 'contract' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">E-Contract</h2>
              <p className="text-gray-500">Baca dan setujui perjanjian sewa elektronik.</p>
            </div>
            
            {/* Contract Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 max-h-64 overflow-y-auto">
              <h4 className="font-bold text-gray-800 mb-3">Perjanjian Sewa Menyewa Elektronik</h4>
              <p className="text-sm text-gray-600 mb-3">
                Nomor Kontrak: <span className="font-mono font-bold">{activeTransaction.contractNumber}</span>
              </p>
              
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>PIHAK PERTAMA (Pemilik):</strong><br/>{activeTransaction.kostOwner}</p>
                <p><strong>PIHAK KEDUA (Penyewa):</strong><br/>{activeTransaction.userName}</p>
                <p><strong>OBJEK SEWA:</strong><br/>{activeTransaction.kostName}, {activeTransaction.kostAddress}</p>
                <p><strong>PERIODE SEWA:</strong><br/>{formatDate(activeTransaction.startDate)} - {formatDate(activeTransaction.endDate)} ({activeTransaction.months} bulan)</p>
                <p><strong>HARGA SEWA:</strong><br/>{formatIDR(activeTransaction.totalAmount)}</p>
                
                <hr className="my-4" />
                
                <p className="font-bold">KETENTUAN:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Pihak Kedua wajib membayar sewa sesuai opsi pembayaran yang dipilih.</li>
                  <li>Pihak Kedua wajib menjaga kebersihan dan ketertiban selama masa sewa.</li>
                  <li>Pihak Kedua dilarang mengalihkan hak sewa tanpa persetujuan tertulis.</li>
                  <li>Pihak Kedua wajib mematuhi peraturan kost yang berlaku.</li>
                  <li>Kerusakan akibat kelalaian menjadi tanggung jawab Pihak Kedua.</li>
                </ol>
                
                <p className="text-xs text-gray-400 mt-4">
                  Perjanjian ini sah secara hukum sesuai UU ITE dan PP PSTE.
                </p>
              </div>
            </div>
            
            {/* Agreement Checkbox */}
            <label className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={contractAccepted}
                onChange={(e) => setContractAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
              />
              <div>
                <p className="font-bold text-emerald-800">Saya menyetujui E-Contract ini</p>
                <p className="text-emerald-600 text-sm">
                  Dengan mencentang ini, Anda setuju dengan semua ketentuan dalam perjanjian sewa menyewa elektronik ini.
                </p>
              </div>
            </label>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('summary')}>
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 py-4" 
                onClick={handleAcceptContract}
                disabled={!contractAccepted}
              >
                {activeTransaction.paymentOption === 'OPTION_C' ? 'Konfirmasi Booking' : 'Lanjut Pembayaran'}
              </Button>
            </div>
          </div>
        )}
        
        {/* Step: Scanning */}
        {step === 'scanning' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-800 mb-2">Scan QR Pembayaran</h2>
              <p className="text-gray-500">Arahkan kamera ke kode QR untuk membayar {formatIDR(amountToPay)}.</p>
            </div>
            
            <QRScanner
              isActive={step === 'scanning'}
              onScanSuccess={handleScanSuccess}
              onScanError={(err) => console.error('Scan error:', err)}
            />
            
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-amber-800 mb-1">Tips Scan QR:</p>
                  <ul className="text-amber-700 space-y-1">
                    <li>• Pastikan pencahayaan cukup</li>
                    <li>• Posisikan QR di tengah frame</li>
                    <li>• Jaga jarak 15-30 cm dari QR</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full" onClick={() => setStep('contract')}>
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </Button>
            </div>
          </div>
        )}
        
        {/* Step: Confirm */}
        {step === 'confirm' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">QR Berhasil Dipindai</h2>
              <p className="text-gray-500">Konfirmasi untuk menyelesaikan pembayaran.</p>
            </div>
            
            {/* QR Validation Info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <p className="text-emerald-800 font-bold">Data QR Terverifikasi</p>
              </div>
              <div className="bg-white rounded-xl p-3 mt-2">
                <p className="text-emerald-600 font-mono text-xs break-all">
                  {(scannedQRData || activeTransaction.qrData || '').slice(0, 80)}...
                </p>
              </div>
            </div>
            
            {/* Final Amount */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white text-center">
              <p className="text-emerald-100 text-sm mb-1">
                {activeTransaction.paymentOption === 'OPTION_A' ? 'Total Pembayaran' :
                 activeTransaction.paymentOption === 'OPTION_B' ? 'DP yang Dibayar' : 'Deposit Booking'}
              </p>
              <p className="text-4xl font-black">{formatIDR(amountToPay)}</p>
              <p className="text-emerald-100 text-sm mt-2">
                Metode: {activeTransaction.paymentMethod}
              </p>
            </div>
            
            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-bold text-sm">Perhatian</p>
                  <p className="text-amber-700 text-sm mt-1">
                    Dengan menekan "Konfirmasi Pembayaran", Anda menyetujui transaksi ini bersifat final.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleCancelPayment}>
                Batalkan
              </Button>
              <Button variant="primary" className="flex-1 py-4" onClick={handleConfirmPayment}>
                <Shield className="w-5 h-5" />
                Konfirmasi
              </Button>
            </div>
          </div>
        )}
        
        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="p-12">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Memproses Transaksi</h2>
              <p className="text-gray-600 mb-6">Mohon tunggu sebentar...</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 max-w-sm mx-auto">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Kontrak disetujui</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">
                      {activeTransaction.paymentOption === 'OPTION_C' ? 'Booking dikonfirmasi' : 'Pembayaran dikonfirmasi'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-semibold">Memproses transaksi...</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mt-6">Jangan tutup halaman ini.</p>
            </div>
          </div>
        )}
        
        {/* Step: Success */}
        {step === 'success' && (
          <div className="p-6">
            <SimpleReceipt transaction={activeTransaction} onClose={handleFinish} />
          </div>
        )}
        
        {/* Step: Failed */}
        {step === 'failed' && (
          <div className="p-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-14 h-14 text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Transaksi Gagal</h2>
              <p className="text-gray-600 mb-6">
                {activeTransaction.failReason || 'Transaksi tidak dapat diproses.'}
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left max-w-sm mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono font-semibold text-gray-800">{activeTransaction.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-bold text-red-600">FAILED</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-left max-w-sm mx-auto">
                <p className="text-blue-800 text-sm">
                  <strong>Butuh bantuan?</strong> Hubungi 0858-2000-1352 atau email support@kostapp.id
                </p>
              </div>
              
              <Button variant="primary" className="w-full max-w-sm" onClick={handleFinish}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
