export interface User {
  id: string;
  name: string;
  username: string;
  contact: string;
  password: string;
  photo: string;
  role: 'admin' | 'user';
  nik?: string;
  address?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Kost {
  id: number;
  name: string;
  type: 'Putri' | 'Putra' | 'Campur';
  loc: string;
  address: string;
  price: number;
  img: string;
  images: string[];
  fac: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  promo: boolean;
  promoPercent?: number;
  available: boolean;
  rooms: number;
  description: string;
  owner: string;
  ownerPhone: string;
  ownerPhoto?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentOptionType = 'OPTION_A' | 'OPTION_B' | 'OPTION_C';

export interface PaymentOption {
  id: PaymentOptionType;
  name: string;
  description: string;
  icon: string;
  available: boolean;
  terms: string[];
}

export type TransactionStatus = 
  | 'INITIATED' 
  | 'PAYMENT_SELECTED'
  | 'SCANNING' 
  | 'SCANNED' 
  | 'CONFIRMED' 
  | 'PROCESSING'
  | 'COMPLETED' 
  | 'FAILED'
  | 'EXPIRED'
  | 'WAITING_VERIFICATION'
  | 'DP_PAID'
  | 'INSTALLMENT_PENDING';

export interface InstallmentDetail {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface Transaction {
  id: string;
  transactionId: string;
  referenceNumber: string;
  invoiceNumber: string;
  contractNumber: string;
  timestamp: string;
  
  // Payment Option
  paymentOption: PaymentOptionType;
  paymentOptionName: string;
  
  // Amounts
  baseAmount: number;
  subtotal: number;
  discount: number;
  adminFee: number;
  serviceFee: number;
  totalAmount: number;
  
  // For Option A - Full Payment
  amountPaid?: number;
  
  // For Option B - Installment/DP
  dpAmount?: number;
  dpPercentage?: number;
  remainingAmount?: number;
  installments?: InstallmentDetail[];
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
  
  // For Option C - Pay at Location
  depositAmount?: number;
  payAtLocationNote?: string;
  verificationCode?: string;
  
  paymentMethod: string;
  paymentChannel: string;
  status: TransactionStatus;
  
  // User Info
  userId: string;
  userName: string;
  username: string;
  contact: string;
  userNik?: string;
  userAddress?: string;
  
  // Kost Info
  kostId: number;
  kostName: string;
  kostAddress: string;
  kostOwner: string;
  kostOwnerPhone: string;
  loc: string;
  type: string;
  
  // Rental Period
  months: number;
  startDate: string;
  endDate: string;
  checkInTime?: string;
  
  // QR & Validation
  qrScanned: boolean;
  qrData?: string;
  qrValidatedAt?: string;
  
  // Timestamps
  confirmedAt?: string;
  completedAt?: string;
  failedAt?: string;
  failReason?: string;
  
  // E-Contract
  contractAccepted: boolean;
  contractAcceptedAt?: string;
  contractSignature?: string;
  
  // Metadata
  metadata?: {
    deviceInfo?: string;
    ipAddress?: string;
    userAgent?: string;
    geoLocation?: string;
  };
}

export interface Booking {
  id: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'canceled' | 'completed' | 'dp_paid' | 'waiting_payment';
  userId: string;
  userName: string;
  username: string;
  contact: string;
  kostId: number;
  kostName: string;
  kostAddress: string;
  loc: string;
  type: string;
  months: number;
  startDate: string;
  endDate: string;
  paymentOption: PaymentOptionType;
  payment: string;
  subtotal: number;
  discount: number;
  adminFee: number;
  serviceFee: number;
  total: number;
  amountPaid: number;
  remainingAmount: number;
  transactionId?: string;
  invoiceNumber?: string;
  contractNumber?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'promo' | 'system' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface EContract {
  contractNumber: string;
  version: string;
  createdAt: string;
  
  // Parties
  landlord: {
    name: string;
    phone: string;
    address: string;
  };
  tenant: {
    name: string;
    nik?: string;
    phone: string;
    address?: string;
  };
  
  // Property
  property: {
    name: string;
    address: string;
    type: string;
    facilities: string[];
  };
  
  // Terms
  rentalPeriod: {
    startDate: string;
    endDate: string;
    months: number;
  };
  
  // Payment
  payment: {
    option: PaymentOptionType;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    schedule?: InstallmentDetail[];
  };
  
  // Legal
  terms: string[];
  accepted: boolean;
  acceptedAt?: string;
  signature?: string;
  
  // References
  legalReferences: string[];
}
