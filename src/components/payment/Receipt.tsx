import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  CheckCircle2, Download, Printer, Layers, Calendar, Hash, 
  CreditCard, MapPin, Clock, Shield, Building2, User,
  FileText, Scale, Award, Lock, Wallet, AlertCircle
} from 'lucide-react';
import type { Transaction } from '@/types';
import { formatIDR, formatDate, formatDateTime } from '@/utils/helpers';
import { COMPANY_INFO, COPYRIGHT_YEAR, LEGAL_REFERENCES } from '@/utils/legal';
import { Button } from '@/components/ui/Button';

interface ReceiptProps {
  transaction: Transaction;
  onClose?: () => void;
}

export function Receipt({ transaction, onClose }: ReceiptProps) {
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
      format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 15;
    
    // Header
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, pageWidth, 55, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('KostApp', pageWidth / 2, 22, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('BUKTI PEMBAYARAN RESMI', pageWidth / 2, 32, { align: 'center' });
    
    doc.setFontSize(8);
    doc.text(`${COMPANY_INFO.name}`, pageWidth / 2, 42, { align: 'center' });
    doc.text(`${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}`, pageWidth / 2, 48, { align: 'center' });
    
    yPos = 65;
    
    // Status Badge
    const statusText = transaction.paymentOption === 'OPTION_A' ? '✓ LUNAS' :
                       transaction.paymentOption === 'OPTION_B' ? '✓ DP TERBAYAR' :
                       '✓ DEPOSIT DITERIMA';
    
    doc.setFillColor(209, 250, 229);
    doc.roundedRect(pageWidth / 2 - 25, yPos - 8, 50, 14, 4, 4, 'F');
    doc.setTextColor(6, 95, 70);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(statusText, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 18;
    
    const leftCol = 18;
    const rightCol = pageWidth - 18;
    const boxWidth = pageWidth - 36;
    
    // Transaction Info Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(leftCol - 3, yPos - 5, boxWidth + 6, 55, 4, 4, 'F');
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('TRANSACTION ID', leftCol, yPos + 3);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(transaction.transactionId, leftCol, yPos + 10);
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('NOMOR KONTRAK', leftCol + 75, yPos + 3);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(transaction.contractNumber, leftCol + 75, yPos + 10);
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('OPSI PEMBAYARAN', leftCol, yPos + 22);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(transaction.paymentOptionName, leftCol, yPos + 29);
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('TANGGAL & WAKTU', leftCol + 75, yPos + 22);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(formatDateTime(transaction.completedAt || transaction.timestamp), leftCol + 75, yPos + 29);
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('METODE PEMBAYARAN', leftCol, yPos + 40);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${transaction.paymentMethod} (${transaction.paymentChannel})`, leftCol, yPos + 47);
    
    yPos += 65;
    
    // Customer Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('INFORMASI PENYEWA', leftCol, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Nama: ${transaction.userName}`, leftCol, yPos);
    yPos += 5;
    doc.text(`Username: @${transaction.username}`, leftCol, yPos);
    yPos += 5;
    doc.text(`Kontak: ${transaction.contact}`, leftCol, yPos);
    
    yPos += 12;
    
    // Kost Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('INFORMASI HUNIAN', leftCol, yPos);
    yPos += 8;
    
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(leftCol - 3, yPos - 5, boxWidth + 6, 32, 4, 4, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(transaction.kostName, leftCol, yPos + 3);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(transaction.kostAddress, leftCol, yPos + 10);
    doc.text(`Tipe: ${transaction.type} | Durasi: ${transaction.months} bulan`, leftCol, yPos + 17);
    doc.text(`Periode: ${formatDate(transaction.startDate)} - ${formatDate(transaction.endDate)}`, leftCol, yPos + 24);
    
    yPos += 42;
    
    // Payment Details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('RINCIAN PEMBAYARAN', leftCol, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    
    doc.text('Subtotal', leftCol, yPos);
    doc.text(formatIDR(transaction.subtotal), rightCol, yPos, { align: 'right' });
    yPos += 6;
    
    if (transaction.discount > 0) {
      doc.setTextColor(16, 185, 129);
      doc.text('Diskon Promo', leftCol, yPos);
      doc.text(`- ${formatIDR(transaction.discount)}`, rightCol, yPos, { align: 'right' });
      yPos += 6;
    }
    
    doc.setTextColor(71, 85, 105);
    doc.text('Biaya Admin', leftCol, yPos);
    doc.text(formatIDR(transaction.adminFee), rightCol, yPos, { align: 'right' });
    yPos += 6;
    
    if (transaction.serviceFee > 0) {
      doc.text('Biaya Layanan', leftCol, yPos);
      doc.text(formatIDR(transaction.serviceFee), rightCol, yPos, { align: 'right' });
      yPos += 6;
    }
    
    // Total Box
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(leftCol - 3, yPos, boxWidth + 6, 18, 4, 4, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    
    const totalLabel = transaction.paymentOption === 'OPTION_A' ? 'TOTAL DIBAYAR' :
                       transaction.paymentOption === 'OPTION_B' ? 'DP DIBAYAR (30%)' :
                       'DEPOSIT DIBAYAR';
    doc.text(totalLabel, leftCol, yPos + 11);
    doc.text(formatIDR(paidAmount), rightCol, yPos + 11, { align: 'right' });
    
    yPos += 25;
    
    // Remaining amount for Option B & C
    if (transaction.paymentOption !== 'OPTION_A' && (transaction.remainingAmount || 0) > 0) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Sisa pembayaran:', leftCol, yPos);
      doc.text(formatIDR(transaction.remainingAmount || 0), rightCol, yPos, { align: 'right' });
      yPos += 10;
    }
    
    // Verification code for Option C
    if (transaction.paymentOption === 'OPTION_C' && transaction.verificationCode) {
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(leftCol - 3, yPos, boxWidth + 6, 20, 4, 4, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(146, 64, 14);
      doc.text('KODE VERIFIKASI CHECK-IN:', leftCol, yPos + 8);
      doc.setFontSize(14);
      doc.text(transaction.verificationCode, leftCol, yPos + 16);
      yPos += 28;
    }
    
    // Legal Disclaimer
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(leftCol - 3, yPos, boxWidth + 6, 35, 4, 4, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text('KETENTUAN HUKUM', leftCol, yPos + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(21, 128, 61);
    
    const legalLines = [
      'Struk ini merupakan BUKTI PEMBAYARAN YANG SAH sesuai dengan:',
      `• ${LEGAL_REFERENCES.ite.shortName}: ${LEGAL_REFERENCES.ite.name}`,
      `• ${LEGAL_REFERENCES.ppPste.shortName}: ${LEGAL_REFERENCES.ppPste.name}`,
      'Dokumen elektronik ini memiliki kekuatan hukum yang sama dengan dokumen tertulis.'
    ];
    
    let lineY = yPos + 14;
    legalLines.forEach(line => {
      doc.text(line, leftCol, lineY);
      lineY += 4;
    });
    
    // Footer
    const footerY = pageHeight - 20;
    doc.setFillColor(248, 250, 252);
    doc.rect(0, footerY - 5, pageWidth, 25, 'F');
    
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`© ${COPYRIGHT_YEAR} ${COMPANY_INFO.name}`, pageWidth / 2, footerY + 2, { align: 'center' });
    doc.text(`Dilindungi ${LEGAL_REFERENCES.hakCipta.shortName}`, pageWidth / 2, footerY + 6, { align: 'center' });
    doc.text(`${COMPANY_INFO.contact.email} | ${COMPANY_INFO.contact.phone}`, pageWidth / 2, footerY + 10, { align: 'center' });
    
    doc.save(`KostApp-Receipt-${transaction.transactionId}.pdf`);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const isValidReceipt = ['COMPLETED', 'DP_PAID', 'WAITING_VERIFICATION'].includes(transaction.status);
  
  if (!isValidReceipt) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Struk Tidak Tersedia</h3>
        <p className="text-gray-500">Struk hanya tersedia untuk transaksi yang telah diproses.</p>
      </div>
    );
  }
  
  const statusBadge = transaction.paymentOption === 'OPTION_A' 
    ? { text: 'LUNAS', color: 'bg-emerald-100 text-emerald-700' }
    : transaction.paymentOption === 'OPTION_B'
    ? { text: 'DP TERBAYAR', color: 'bg-blue-100 text-blue-700' }
    : { text: 'DEPOSIT DITERIMA', color: 'bg-amber-100 text-amber-700' };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-6 print:hidden">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-800 mt-6 mb-2">
          {transaction.paymentOption === 'OPTION_A' ? 'Pembayaran Berhasil!' :
           transaction.paymentOption === 'OPTION_B' ? 'DP Berhasil Dibayar!' :
           'Booking Dikonfirmasi!'}
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          {transaction.paymentOption === 'OPTION_C' 
            ? 'Kode verifikasi telah dibuat. Tunjukkan kode ini saat check-in.'
            : 'Transaksi Anda telah berhasil diproses dan tercatat dalam sistem.'}
        </p>
      </div>
      
      {/* Receipt Card */}
      <div ref={receiptRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 print:shadow-none print:border-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 px-8 py-8 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">KostApp</h1>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
              <Award className="w-4 h-4" />
              BUKTI PEMBAYARAN RESMI
            </div>
            <p className="text-emerald-100 text-sm mt-3">{COMPANY_INFO.name}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex justify-center -mt-5 relative z-10">
          <div className={`${statusBadge.color} border-4 border-white px-8 py-2.5 rounded-full font-black text-lg flex items-center gap-2 shadow-lg`}>
            <CheckCircle2 className="w-5 h-5" />
            {statusBadge.text}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Transaction Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
                <Hash className="w-3.5 h-3.5" />
                TRANSACTION ID
              </div>
              <p className="font-mono font-bold text-slate-800 text-sm break-all">{transaction.transactionId}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
                <FileText className="w-3.5 h-3.5" />
                NOMOR KONTRAK
              </div>
              <p className="font-mono font-bold text-slate-800 text-xs break-all">{transaction.contractNumber}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
                <Wallet className="w-3.5 h-3.5" />
                OPSI PEMBAYARAN
              </div>
              <p className="font-bold text-slate-800 text-sm">{transaction.paymentOptionName}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                TANGGAL & WAKTU
              </div>
              <p className="font-bold text-slate-800 text-sm">{formatDateTime(transaction.completedAt || transaction.timestamp)}</p>
            </div>
          </div>
          
          {/* Verification Code for Option C */}
          {transaction.paymentOption === 'OPTION_C' && transaction.verificationCode && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-amber-800 mb-1">Kode Verifikasi Check-In</p>
                  <p className="text-4xl font-mono font-black text-amber-900">{transaction.verificationCode}</p>
                  <p className="text-amber-600 text-sm mt-2">
                    Tunjukkan kode ini kepada pemilik kost saat check-in.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t-2 border-dashed border-slate-200" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200" />
          </div>
          
          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <User className="w-4 h-4 text-emerald-600" />
              Informasi Penyewa
            </h3>
            <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Nama Lengkap</span>
                <span className="font-semibold text-slate-800">{transaction.userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Username</span>
                <span className="font-semibold text-slate-800">@{transaction.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Kontak</span>
                <span className="font-semibold text-slate-800">{transaction.contact}</span>
              </div>
            </div>
          </div>
          
          {/* Kost Info */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Informasi Hunian
            </h3>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{transaction.kostName}</p>
                  <p className="text-slate-600 text-sm">{transaction.kostAddress}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold text-sm">{transaction.months} bulan</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700">
                  <Building2 className="w-4 h-4" />
                  <span className="font-semibold text-sm">{transaction.type}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-200">
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {formatDate(transaction.startDate)} - {formatDate(transaction.endDate)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t-2 border-dashed border-slate-200" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200" />
          </div>
          
          {/* Payment Details */}
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Rincian Pembayaran
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({transaction.months} bulan)</span>
                <span className="font-semibold">{formatIDR(transaction.subtotal)}</span>
              </div>
              {transaction.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1">
                    <span className="text-lg">🎁</span>
                    Diskon Promo
                  </span>
                  <span className="font-semibold">- {formatIDR(transaction.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Biaya Admin</span>
                <span className="font-semibold">{formatIDR(transaction.adminFee)}</span>
              </div>
              {transaction.serviceFee > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Layanan</span>
                  <span className="font-semibold">{formatIDR(transaction.serviceFee)}</span>
                </div>
              )}
              
              {/* Paid Amount */}
              <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-5 flex justify-between items-center text-white mt-4 shadow-lg shadow-emerald-500/20">
                <span className="font-bold text-lg">
                  {transaction.paymentOption === 'OPTION_A' ? 'Total Dibayar' :
                   transaction.paymentOption === 'OPTION_B' ? 'DP Dibayar (30%)' :
                   'Deposit Dibayar'}
                </span>
                <span className="font-black text-3xl">{formatIDR(paidAmount)}</span>
              </div>
              
              {/* Remaining Amount for Option B & C */}
              {transaction.paymentOption !== 'OPTION_A' && (transaction.remainingAmount || 0) > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2">
                  <div className="flex justify-between text-blue-700">
                    <span className="font-semibold">Sisa Pembayaran</span>
                    <span className="font-bold text-lg">{formatIDR(transaction.remainingAmount || 0)}</span>
                  </div>
                  {transaction.paymentOption === 'OPTION_B' && (
                    <p className="text-blue-600 text-sm mt-1">Dicicil maksimal 3 kali</p>
                  )}
                  {transaction.paymentOption === 'OPTION_C' && (
                    <p className="text-blue-600 text-sm mt-1">Dibayar saat check-in</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Legal Note */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 mb-1">KETENTUAN HUKUM</h4>
                <p className="text-xs text-emerald-600">Dasar legalitas transaksi elektronik</p>
              </div>
            </div>
            
            <div className="bg-white/70 rounded-xl p-4 space-y-2 text-xs text-emerald-700">
              <p className="font-semibold text-emerald-800">
                Struk ini merupakan BUKTI PEMBAYARAN YANG SAH sesuai dengan:
              </p>
              <ul className="space-y-1.5 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{LEGAL_REFERENCES.ite.name}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{LEGAL_REFERENCES.ppPste.name}</span>
                </li>
              </ul>
              <p className="pt-2 border-t border-emerald-200 mt-3">
                Dokumen elektronik ini memiliki <strong>kekuatan hukum yang sama</strong> dengan dokumen tertulis 
                dan dapat digunakan sebagai <strong>alat bukti yang sah di pengadilan</strong>.
              </p>
            </div>
          </div>
          
          {/* Verification Info */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-700 font-semibold text-sm mb-1">
              <Shield className="w-4 h-4" />
              Verifikasi Keaslian Struk
            </div>
            <p className="text-blue-600 text-xs">
              Hubungi {COMPANY_INFO.contact.phone} atau email {COMPANY_INFO.contact.email} dengan menyertakan Transaction ID
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-slate-100 px-6 py-5 border-t">
          <div className="text-center">
            <p className="text-slate-600 text-sm font-semibold mb-1">
              © {COPYRIGHT_YEAR} {COMPANY_INFO.name}
            </p>
            <p className="text-slate-500 text-xs mb-2">
              Hak cipta dilindungi {LEGAL_REFERENCES.hakCipta.shortName}
            </p>
            <p className="text-slate-400 text-xs">
              {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city} {COMPANY_INFO.address.postalCode}
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 print:hidden">
        <Button variant="primary" className="flex-1 py-4 shadow-lg shadow-emerald-200" onClick={handleDownloadPDF}>
          <Download className="w-5 h-5" />
          Unduh PDF
        </Button>
        <Button variant="outline" className="flex-1 py-4" onClick={handlePrint}>
          <Printer className="w-5 h-5" />
          Cetak
        </Button>
      </div>
      
      {onClose && (
        <div className="mt-4 print:hidden">
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Selesai
          </Button>
        </div>
      )}
    </div>
  );
}
