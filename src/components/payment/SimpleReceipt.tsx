import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  CheckCircle2, Download, Printer, Layers, Calendar, 
  MapPin, Clock, Building2, User, CreditCard, Phone
} from 'lucide-react';
import type { Transaction } from '@/types';
import { formatIDR, formatDate, formatDateTime } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';

interface SimpleReceiptProps {
  transaction: Transaction;
  onClose?: () => void;
}

export function SimpleReceipt({ transaction, onClose }: SimpleReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  
  // Get paid amount based on payment option
  const getPaidAmount = () => {
    if (transaction.paymentOption === 'OPTION_A') {
      return transaction.amountPaid || transaction.totalAmount;
    } else if (transaction.paymentOption === 'OPTION_B') {
      return transaction.dpAmount || 0;
    } else {
      return transaction.depositAmount || 0;
    }
  };
  
  const paidAmount = getPaidAmount();
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200] // Receipt paper size
    });
    
    const pageWidth = 80;
    let y = 10;
    const leftMargin = 5;
    const rightMargin = pageWidth - 5;
    
    // Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('KostApp', pageWidth / 2, y, { align: 'center' });
    y += 5;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Struk Pembayaran', pageWidth / 2, y, { align: 'center' });
    y += 8;
    
    // Divider
    doc.setLineWidth(0.2);
    doc.line(leftMargin, y, rightMargin, y);
    y += 5;
    
    // Transaction Info
    doc.setFontSize(7);
    doc.text('No. Transaksi:', leftMargin, y);
    doc.text(transaction.transactionId, rightMargin, y, { align: 'right' });
    y += 4;
    
    doc.text('Tanggal:', leftMargin, y);
    doc.text(formatDateTime(transaction.completedAt || transaction.timestamp), rightMargin, y, { align: 'right' });
    y += 4;
    
    doc.text('Metode:', leftMargin, y);
    doc.text(transaction.paymentOptionName, rightMargin, y, { align: 'right' });
    y += 6;
    
    // Divider
    doc.line(leftMargin, y, rightMargin, y);
    y += 5;
    
    // Customer Info
    doc.setFont('helvetica', 'bold');
    doc.text('PENYEWA', leftMargin, y);
    y += 4;
    
    doc.setFont('helvetica', 'normal');
    doc.text('Nama: ' + transaction.userName, leftMargin, y);
    y += 4;
    doc.text('Kontak: ' + transaction.contact, leftMargin, y);
    y += 6;
    
    // Divider
    doc.line(leftMargin, y, rightMargin, y);
    y += 5;
    
    // Kost Info
    doc.setFont('helvetica', 'bold');
    doc.text('DETAIL KOST', leftMargin, y);
    y += 4;
    
    doc.setFont('helvetica', 'normal');
    doc.text(transaction.kostName, leftMargin, y);
    y += 4;
    doc.text(transaction.loc + ' - ' + transaction.type, leftMargin, y);
    y += 4;
    doc.text('Durasi: ' + transaction.months + ' bulan', leftMargin, y);
    y += 4;
    doc.text('Periode:', leftMargin, y);
    y += 4;
    doc.text(formatDate(transaction.startDate) + ' s/d', leftMargin, y);
    y += 4;
    doc.text(formatDate(transaction.endDate), leftMargin, y);
    y += 6;
    
    // Divider
    doc.line(leftMargin, y, rightMargin, y);
    y += 5;
    
    // Payment Details
    doc.setFont('helvetica', 'bold');
    doc.text('RINCIAN PEMBAYARAN', leftMargin, y);
    y += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal', leftMargin, y);
    doc.text(formatIDR(transaction.subtotal), rightMargin, y, { align: 'right' });
    y += 4;
    
    if (transaction.discount > 0) {
      doc.text('Diskon', leftMargin, y);
      doc.text('-' + formatIDR(transaction.discount), rightMargin, y, { align: 'right' });
      y += 4;
    }
    
    doc.text('Biaya Admin', leftMargin, y);
    doc.text(formatIDR(transaction.adminFee), rightMargin, y, { align: 'right' });
    y += 4;
    
    if (transaction.serviceFee > 0) {
      doc.text('Biaya Layanan', leftMargin, y);
      doc.text(formatIDR(transaction.serviceFee), rightMargin, y, { align: 'right' });
      y += 4;
    }
    
    y += 2;
    doc.line(leftMargin, y, rightMargin, y);
    y += 5;
    
    // Total
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    const totalLabel = transaction.paymentOption === 'OPTION_A' ? 'TOTAL BAYAR' :
                       transaction.paymentOption === 'OPTION_B' ? 'DP DIBAYAR' :
                       'DEPOSIT';
    doc.text(totalLabel, leftMargin, y);
    doc.text(formatIDR(paidAmount), rightMargin, y, { align: 'right' });
    y += 6;
    
    // Remaining for Option B & C
    if (transaction.paymentOption !== 'OPTION_A' && (transaction.remainingAmount || 0) > 0) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('Sisa Pembayaran', leftMargin, y);
      doc.text(formatIDR(transaction.remainingAmount || 0), rightMargin, y, { align: 'right' });
      y += 5;
    }
    
    // Verification code for Option C
    if (transaction.paymentOption === 'OPTION_C' && transaction.verificationCode) {
      y += 2;
      doc.line(leftMargin, y, rightMargin, y);
      y += 5;
      doc.setFont('helvetica', 'bold');
      doc.text('KODE VERIFIKASI:', leftMargin, y);
      y += 5;
      doc.setFontSize(14);
      doc.text(transaction.verificationCode, pageWidth / 2, y, { align: 'center' });
      y += 8;
    }
    
    // Divider
    y += 2;
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    y += 6;
    
    // Status
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const statusText = transaction.paymentOption === 'OPTION_A' ? 'LUNAS' :
                       transaction.paymentOption === 'OPTION_B' ? 'DP TERBAYAR' :
                       'BOOKING TERKONFIRMASI';
    doc.text(statusText, pageWidth / 2, y, { align: 'center' });
    y += 8;
    
    // Footer
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Terima kasih telah menggunakan', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('KostApp', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('support@kostapp.id', pageWidth / 2, y, { align: 'center' });
    
    doc.save(`Struk-${transaction.transactionId}.pdf`);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const isValidReceipt = ['COMPLETED', 'DP_PAID', 'WAITING_VERIFICATION'].includes(transaction.status);
  
  if (!isValidReceipt) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Struk Tidak Tersedia</h3>
        <p className="text-gray-500">Struk hanya tersedia untuk transaksi yang telah berhasil.</p>
      </div>
    );
  }
  
  const getStatusInfo = () => {
    if (transaction.paymentOption === 'OPTION_A') {
      return { text: 'LUNAS', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', textColor: 'text-emerald-700' };
    } else if (transaction.paymentOption === 'OPTION_B') {
      return { text: 'DP TERBAYAR', color: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-700' };
    } else {
      return { text: 'BOOKING TERKONFIRMASI', color: 'bg-amber-500', bgLight: 'bg-amber-50', textColor: 'text-amber-700' };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <div className="max-w-md mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-6 print:hidden">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-gray-800 mt-4">Pembayaran Berhasil!</h2>
        <p className="text-gray-500 mt-1">Transaksi Anda telah tercatat</p>
      </div>
      
      {/* Receipt Card */}
      <div ref={receiptRef} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 print:shadow-none print:border-0">
        {/* Header */}
        <div className={`${statusInfo.color} px-6 py-5 text-center text-white`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Layers className="w-6 h-6" />
            <span className="text-xl font-black">KostApp</span>
          </div>
          <p className="text-white/80 text-sm">Struk Pembayaran</p>
        </div>
        
        {/* Status Badge */}
        <div className="flex justify-center -mt-4">
          <div className={`${statusInfo.bgLight} ${statusInfo.textColor} border-4 border-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow`}>
            <CheckCircle2 className="w-4 h-4" />
            {statusInfo.text}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Transaction Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">No. Transaksi</p>
                <p className="font-mono font-bold text-gray-800">{transaction.transactionId}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Tanggal</p>
                <p className="font-semibold text-gray-800">{formatDate(transaction.completedAt || transaction.timestamp)}</p>
              </div>
            </div>
          </div>
          
          {/* Verification Code for Option C */}
          {transaction.paymentOption === 'OPTION_C' && transaction.verificationCode && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-center">
              <p className="text-amber-700 text-sm font-semibold mb-1">Kode Verifikasi Check-In</p>
              <p className="text-3xl font-mono font-black text-amber-800">{transaction.verificationCode}</p>
              <p className="text-amber-600 text-xs mt-2">Tunjukkan kode ini saat check-in</p>
            </div>
          )}
          
          {/* Dotted Divider */}
          <div className="border-t-2 border-dashed border-gray-200 my-4" />
          
          {/* Customer Info */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs font-semibold uppercase mb-2">Penyewa</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{transaction.userName}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {transaction.contact}
                </p>
              </div>
            </div>
          </div>
          
          {/* Dotted Divider */}
          <div className="border-t-2 border-dashed border-gray-200 my-4" />
          
          {/* Kost Info */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs font-semibold uppercase mb-2">Detail Kost</p>
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{transaction.kostName}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {transaction.loc} • {transaction.type}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-700 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{transaction.months} bulan</span>
                </div>
                <div className="text-right">
                  <p className="text-emerald-700 text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {formatDate(transaction.startDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dotted Divider */}
          <div className="border-t-2 border-dashed border-gray-200 my-4" />
          
          {/* Payment Details */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Rincian Pembayaran</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({transaction.months} bulan)</span>
                <span className="font-semibold">{formatIDR(transaction.subtotal)}</span>
              </div>
              {transaction.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Diskon Promo</span>
                  <span className="font-semibold">-{formatIDR(transaction.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Admin</span>
                <span className="font-semibold">{formatIDR(transaction.adminFee)}</span>
              </div>
              {transaction.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="font-semibold">{formatIDR(transaction.serviceFee)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Total */}
          <div className={`${statusInfo.color} rounded-xl p-4 text-white`}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {transaction.paymentOption === 'OPTION_A' ? 'Total Dibayar' :
                 transaction.paymentOption === 'OPTION_B' ? 'DP Dibayar' : 'Deposit'}
              </span>
              <span className="text-2xl font-black">{formatIDR(paidAmount)}</span>
            </div>
            {transaction.paymentOption !== 'OPTION_A' && (transaction.remainingAmount || 0) > 0 && (
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/20 text-sm">
                <span className="opacity-80">Sisa Pembayaran</span>
                <span className="font-bold">{formatIDR(transaction.remainingAmount || 0)}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-5 py-4 text-center border-t">
          <p className="text-gray-500 text-sm font-semibold">Terima kasih telah menggunakan KostApp</p>
          <p className="text-gray-400 text-xs mt-1">support@kostapp.id • 0858-2000-1352</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3 mt-5 print:hidden">
        <Button variant="primary" className="flex-1" onClick={handleDownloadPDF}>
          <Download className="w-4 h-4" />
          Unduh PDF
        </Button>
        <Button variant="outline" className="flex-1" onClick={handlePrint}>
          <Printer className="w-4 h-4" />
          Cetak
        </Button>
      </div>
      
      {onClose && (
        <div className="mt-3 print:hidden">
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Selesai
          </Button>
        </div>
      )}
    </div>
  );
}
