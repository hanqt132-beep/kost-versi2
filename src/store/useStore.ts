import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Kost, Transaction, Booking, TransactionStatus, PaymentOptionType, InstallmentDetail } from '@/types';
import { 
  generateTransactionId, 
  generateReferenceNumber, 
  generateInvoiceNumber, 
  generateContractNumber,
  generateVerificationCode,
  PAYMENT_OPTIONS 
} from '@/utils/legal';

const SEED_KOSTS: Kost[] = [
  {
    id: 1, 
    name: "Kost Navi", 
    type: "Putri", 
    loc: "Ketapang",
    address: "Jl. Merdeka No. 45, Ketapang, Kalimantan Barat",
    price: 1200000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.43-768x513.jpeg",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.43-768x513.jpeg",
      "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.42-1-768x513.jpeg"
    ],
    fac: ["WiFi 5Ghz", "AC Inverter", "K. Mandi Dalam", "Water Heater", "Kasur & Lemari", "Meja Belajar"],
    rating: 4.9, 
    reviews: 214, 
    verified: true, 
    promo: true,
    promoPercent: 10,
    available: true,
    rooms: 5,
    description: "Kost eksklusif khusus putri dengan fasilitas lengkap dan keamanan 24 jam. Lokasi strategis dekat kampus dan pusat perbelanjaan.",
    owner: "Ibu Clara",
    ownerPhone: "085820001352",
    ownerPhoto: "https://ui-avatars.com/api/?name=Sari+Dewi&background=00875A&color=fff&rounded=true&size=128",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  },
  {
    id: 2, 
    name: "Kost Liquid", 
    type: "Campur", 
    loc: "Kubu Raya",
    address: "Jl. Ahmad Yani No. 88, Kubu Raya, Kalimantan Barat",
    price: 2500000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.42-1-768x513.jpeg",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.42-1-768x513.jpeg"
    ],
    fac: ["Smart TV 43\"", "Kulkas Pribadi", "Parkir Mobil", "Gym Access", "Laundry", "Cleaning Service"],
    rating: 4.7, 
    reviews: 156, 
    verified: true, 
    promo: false,
    available: true,
    rooms: 3,
    description: "Hunian executive dengan fasilitas hotel bintang 3. Cocok untuk profesional muda dan mahasiswa pasca sarjana.",
    owner: "Pak Sanford",
    ownerPhone: "085820001352",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  },
  {
    id: 3, 
    name: "Kost Evos", 
    type: "Putra", 
    loc: "Singkawang",
    address: "Jl. Pahlawan No. 12, Singkawang, Kalimantan Barat",
    price: 850000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.43-1-768x512.jpeg",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-13-at-12.38.43-1-768x512.jpeg"
    ],
    fac: ["WiFi", "Meja Belajar", "Cleaning Service", "Dapur Umum", "Parkir Motor"],
    rating: 4.8, 
    reviews: 89, 
    verified: false, 
    promo: false,
    available: true,
    rooms: 8,
    description: "Kost putra dengan suasana nyaman dan harga terjangkau. Lingkungan aman dan tenang.",
    owner: "Pak Albert",
    ownerPhone: "085820001352",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  },
  {
    id: 4, 
    name: "Kost Alter Ego", 
    type: "Campur", 
    loc: "Sambas",
    address: "Jl. Diponegoro No. 77, Sambas, Kalimantan Barat",
    price: 3200000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Ala-Korea.webp",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Ala-Korea.webp"
    ],
    fac: ["Full Furnished", "Swimming Pool", "Security 24/7", "Netflix Premium", "Rooftop Garden", "Coworking Space"],
    rating: 4.9, 
    reviews: 342, 
    verified: true, 
    promo: true,
    promoPercent: 15,
    available: true,
    rooms: 2,
    description: "Luxury living dengan konsep modern minimalis. Fasilitas lengkap setara apartemen premium.",
    owner: "Ibu Brigida",
    ownerPhone: "085820001352",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  },
  {
    id: 5, 
    name: "Kost Aurora", 
    type: "Putri", 
    loc: "Sintang",
    address: "Jl. Kartini No. 23, Sintang, Kalimantan Barat",
    price: 1500000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Scandinavian.webp",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Scandinavian.webp"
    ],
    fac: ["Garden View", "Balkon Pribadi", "Access Card", "Laundry", "CCTV 24 Jam", "Pantry"],
    rating: 4.6, 
    reviews: 203, 
    verified: true, 
    promo: false,
    available: true,
    rooms: 4,
    description: "Kost asri dengan pemandangan taman yang menyejukkan. Khusus putri dengan akses keamanan modern.",
    owner: "Ibu Yue",
    ownerPhone: "08567890123",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  },
  {
    id: 6, 
    name: "Kost Onic Hub", 
    type: "Putra", 
    loc: "Pontianak",
    address: "Jl. Gajah Mada No. 55, Pontianak, Kalimantan Barat",
    price: 950000,
    img: "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Aksen-Kayu.webp",
    images: [
      "https://shila.co.id/wp-content/uploads/2024/03/15-Rekomendasi-Ide-Desain-Kamar-Tidur-Minimalis-yang-Populer-Aksen-Kayu.webp"
    ],
    fac: ["WiFi 100Mbps", "Bebas Jam Malam", "Parkir Motor", "Rooftop Hangout", "Game Room"],
    rating: 4.8, 
    reviews: 167, 
    verified: false, 
    promo: false,
    available: true,
    rooms: 6,
    description: "Kost putra dengan konsep modern dan komunitas yang solid. Cocok untuk mahasiswa dan gamer.",
    owner: "Pak Kelra",
    ownerPhone: "085820001352",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString()
  }
];

const ADMIN_USER: User = {
  id: 'admin_001',
  name: 'Admin KostApp',
  username: 'admin',
  contact: 'admin@kostapp.id',
  password: 'Admin123!',
  photo: 'https://id.pinterest.com/pin/952722496187083203/',
  role: 'admin',
  createdAt: new Date().toISOString()
};

interface InitiateTransactionParams {
  kostId: number;
  months: number;
  startDate: string;
  paymentOption: PaymentOptionType;
}

interface AppState {
  // Auth
  users: User[];
  currentUser: User | null;
  
  // Data
  kosts: Kost[];
  transactions: Transaction[];
  bookings: Booking[];
  favorites: Record<string, number[]>;
  
  // UI State
  currentRoute: string;
  toast: { message: string; visible: boolean; type: 'success' | 'error' | 'info' };
  
  // Current transaction being processed
  activeTransaction: Transaction | null;
  
  // Actions
  login: (identity: string, password: string) => User | null;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'createdAt' | 'role'>) => User | null;
  
  setRoute: (route: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  
  // Kost actions
  getKostById: (id: number) => Kost | undefined;
  addKost: (kost: Omit<Kost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateKost: (id: number, kost: Partial<Kost>) => void;
  deleteKost: (id: number) => void;
  
  // Favorites
  toggleFavorite: (kostId: number) => void;
  isFavorite: (kostId: number) => boolean;
  getFavorites: () => Kost[];
  clearFavorites: () => void;
  
  // Transaction actions
  initiateTransaction: (data: InitiateTransactionParams) => Transaction | null;
  updateTransactionStatus: (transactionId: string, status: TransactionStatus, qrData?: string) => void;
  completeTransaction: (transactionId: string) => void;
  failTransaction: (transactionId: string, reason?: string) => void;
  setActiveTransaction: (transaction: Transaction | null) => void;
  getTransactionById: (transactionId: string) => Transaction | undefined;
  getUserTransactions: () => Transaction[];
  
  // Booking actions
  getUserBookings: () => Booking[];
  clearBookings: () => void;
}

const uid = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const calculateEndDate = (startDate: string, months: number): string => {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
};

const calculateInstallments = (remainingAmount: number, startDate: string, numInstallments: number): InstallmentDetail[] => {
  const installmentAmount = Math.ceil(remainingAmount / numInstallments);
  const installments: InstallmentDetail[] = [];
  
  for (let i = 0; i < numInstallments; i++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + (30 * (i + 1))); // 30 days apart
    
    installments.push({
      installmentNumber: i + 1,
      amount: i === numInstallments - 1 ? remainingAmount - (installmentAmount * (numInstallments - 1)) : installmentAmount,
      dueDate: dueDate.toISOString(),
      status: 'pending'
    });
  }
  
  return installments;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [ADMIN_USER],
      currentUser: null,
      kosts: SEED_KOSTS,
      transactions: [],
      bookings: [],
      favorites: {},
      currentRoute: 'home',
      toast: { message: '', visible: false, type: 'info' },
      activeTransaction: null,
      
      login: (identity, password) => {
        const { users } = get();
        const user = users.find(u => 
          (u.contact.toLowerCase() === identity.toLowerCase() ||
           u.username.toLowerCase() === identity.toLowerCase()) &&
          u.password === password
        );
        if (user) {
          const updatedUser = { ...user, lastLogin: new Date().toISOString() };
          set({ 
            currentUser: updatedUser,
            users: users.map(u => u.id === user.id ? updatedUser : u)
          });
          return updatedUser;
        }
        return null;
      },
      
      logout: () => {
        set({ currentUser: null, activeTransaction: null });
      },
      
      register: (userData) => {
        const { users } = get();
        if (users.some(u => u.username.toLowerCase() === userData.username.toLowerCase())) {
          return null;
        }
        if (users.some(u => u.contact.toLowerCase() === userData.contact.toLowerCase())) {
          return null;
        }
        const newUser: User = {
          ...userData,
          id: uid('user'),
          role: 'user',
          createdAt: new Date().toISOString()
        };
        set({ users: [...users, newUser], currentUser: newUser });
        return newUser;
      },
      
      setRoute: (route) => set({ currentRoute: route }),
      
      showToast: (message, type = 'info') => {
        set({ toast: { message, visible: true, type } });
        setTimeout(() => get().hideToast(), 4000);
      },
      
      hideToast: () => set({ toast: { message: '', visible: false, type: 'info' } }),
      
      getKostById: (id) => {
        return get().kosts.find(k => k.id === id);
      },
      
      addKost: (kostData) => {
        const { kosts } = get();
        const maxId = Math.max(...kosts.map(k => k.id), 0);
        const newKost: Kost = {
          ...kostData,
          id: maxId + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set({ kosts: [...kosts, newKost] });
      },
      
      updateKost: (id, kostData) => {
        const { kosts } = get();
        set({
          kosts: kosts.map(k => 
            k.id === id 
              ? { ...k, ...kostData, updatedAt: new Date().toISOString() }
              : k
          )
        });
      },
      
      deleteKost: (id) => {
        const { kosts } = get();
        set({ kosts: kosts.filter(k => k.id !== id) });
      },
      
      toggleFavorite: (kostId) => {
        const { currentUser, favorites } = get();
        if (!currentUser) return;
        
        const userFavs = favorites[currentUser.id] || [];
        const newFavs = userFavs.includes(kostId)
          ? userFavs.filter(id => id !== kostId)
          : [...userFavs, kostId];
        
        set({
          favorites: {
            ...favorites,
            [currentUser.id]: newFavs
          }
        });
      },
      
      isFavorite: (kostId) => {
        const { currentUser, favorites } = get();
        if (!currentUser) return false;
        return (favorites[currentUser.id] || []).includes(kostId);
      },
      
      getFavorites: () => {
        const { currentUser, favorites, kosts } = get();
        if (!currentUser) return [];
        const userFavIds = favorites[currentUser.id] || [];
        return kosts.filter(k => userFavIds.includes(k.id));
      },
      
      clearFavorites: () => {
        const { currentUser, favorites } = get();
        if (!currentUser) return;
        set({
          favorites: {
            ...favorites,
            [currentUser.id]: []
          }
        });
      },
      
      initiateTransaction: (data) => {
        const { currentUser, kosts } = get();
        if (!currentUser) return null;
        
        const kost = kosts.find(k => k.id === data.kostId);
        if (!kost) return null;
        
        const { paymentOption } = data;
        const optionConfig = PAYMENT_OPTIONS[paymentOption];
        
        // Calculate amounts
        const baseAmount = kost.price * data.months;
        const subtotal = baseAmount;
        const promoPercent = kost.promo && data.months >= 3 ? (kost.promoPercent || 10) : 0;
        const discount = Math.round(subtotal * (promoPercent / 100));
        const adminFee = 5000;
        const serviceFee = paymentOption === 'OPTION_C' ? 0 : 2500;
        const totalAmount = subtotal - discount + adminFee + serviceFee;
        
        const endDate = calculateEndDate(data.startDate, data.months);
        
        // Calculate payment-specific amounts
        let amountPaid = 0;
        let dpAmount: number | undefined;
        let dpPercentage: number | undefined;
        let remainingAmount = totalAmount;
        let installments: InstallmentDetail[] | undefined;
        let depositAmount: number | undefined;
        let verificationCode: string | undefined;
        
        if (paymentOption === 'OPTION_A') {
          // Full payment
          amountPaid = 0; // Will be set to totalAmount after payment
          remainingAmount = totalAmount;
        } else if (paymentOption === 'OPTION_B') {
          // DP + Installments
          const optB = PAYMENT_OPTIONS.OPTION_B;
          dpPercentage = optB.dpPercentage;
          dpAmount = Math.ceil(totalAmount * (dpPercentage / 100));
          remainingAmount = totalAmount - dpAmount;
          installments = calculateInstallments(remainingAmount, data.startDate, optB.maxInstallments);
        } else if (paymentOption === 'OPTION_C') {
          // Pay at location
          const optC = PAYMENT_OPTIONS.OPTION_C;
          depositAmount = optC.depositAmount;
          verificationCode = generateVerificationCode();
          remainingAmount = totalAmount;
        }
        
        const transaction: Transaction = {
          id: uid('txn'),
          transactionId: generateTransactionId(),
          referenceNumber: generateReferenceNumber(),
          invoiceNumber: generateInvoiceNumber(),
          contractNumber: generateContractNumber(),
          timestamp: new Date().toISOString(),
          
          paymentOption,
          paymentOptionName: optionConfig.name,
          
          baseAmount,
          subtotal,
          discount,
          adminFee,
          serviceFee,
          totalAmount,
          
          amountPaid,
          dpAmount,
          dpPercentage,
          remainingAmount,
          installments,
          depositAmount,
          verificationCode,
          
          paymentMethod: paymentOption === 'OPTION_C' ? 'Cash' : 'QRIS',
          paymentChannel: paymentOption === 'OPTION_C' ? 'Bayar di Tempat' : 'Scan QR',
          status: 'INITIATED',
          
          userId: currentUser.id,
          userName: currentUser.name,
          username: currentUser.username,
          contact: currentUser.contact,
          userNik: currentUser.nik,
          userAddress: currentUser.address,
          
          kostId: kost.id,
          kostName: kost.name,
          kostAddress: kost.address,
          kostOwner: kost.owner,
          kostOwnerPhone: kost.ownerPhone,
          loc: kost.loc,
          type: kost.type,
          
          months: data.months,
          startDate: data.startDate,
          endDate,
          
          qrScanned: false,
          contractAccepted: false,
          
          metadata: {
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
            deviceInfo: typeof navigator !== 'undefined' ? navigator.platform : 'unknown'
          }
        };
        
        set(state => ({
          transactions: [...state.transactions, transaction],
          activeTransaction: transaction
        }));
        
        return transaction;
      },
      
      updateTransactionStatus: (transactionId, status, qrData) => {
        const now = new Date().toISOString();
        set(state => {
          const updated = state.transactions.map(t => 
            t.transactionId === transactionId
              ? { 
                  ...t, 
                  status, 
                  qrScanned: status === 'SCANNED' || t.qrScanned,
                  qrData: qrData || t.qrData,
                  qrValidatedAt: status === 'SCANNED' ? now : t.qrValidatedAt,
                  confirmedAt: status === 'CONFIRMED' ? now : t.confirmedAt
                }
              : t
          );
          const activeUpdated = state.activeTransaction?.transactionId === transactionId
            ? { 
                ...state.activeTransaction, 
                status, 
                qrScanned: status === 'SCANNED' || state.activeTransaction.qrScanned,
                qrData: qrData || state.activeTransaction.qrData,
                qrValidatedAt: status === 'SCANNED' ? now : state.activeTransaction.qrValidatedAt,
                confirmedAt: status === 'CONFIRMED' ? now : state.activeTransaction.confirmedAt
              }
            : state.activeTransaction;
          return { transactions: updated, activeTransaction: activeUpdated };
        });
      },
      
      completeTransaction: (transactionId) => {
        const now = new Date().toISOString();
        set(state => {
          const updated = state.transactions.map(t => {
            if (t.transactionId === transactionId) {
              let amountPaid = t.amountPaid || 0;
              let newStatus: TransactionStatus = 'COMPLETED';
              
              if (t.paymentOption === 'OPTION_A') {
                amountPaid = t.totalAmount;
              } else if (t.paymentOption === 'OPTION_B') {
                amountPaid = t.dpAmount || 0;
                newStatus = 'DP_PAID';
              } else if (t.paymentOption === 'OPTION_C') {
                amountPaid = t.depositAmount || 0;
                newStatus = 'WAITING_VERIFICATION';
              }
              
              return { 
                ...t, 
                status: newStatus, 
                completedAt: now,
                amountPaid,
                remainingAmount: t.totalAmount - amountPaid,
                contractAccepted: true,
                contractAcceptedAt: now
              };
            }
            return t;
          });
          
          const activeUpdated = state.activeTransaction?.transactionId === transactionId
            ? updated.find(t => t.transactionId === transactionId) || null
            : state.activeTransaction;
          
          // Create booking record
          const txn = updated.find(t => t.transactionId === transactionId);
          let newBookings = [...state.bookings];
          
          if (txn) {
            const bookingStatus = 
              txn.paymentOption === 'OPTION_A' ? 'approved' :
              txn.paymentOption === 'OPTION_B' ? 'dp_paid' :
              'waiting_payment';
            
            const newBooking: Booking = {
              id: uid('booking'),
              createdAt: now,
              status: bookingStatus,
              userId: txn.userId,
              userName: txn.userName,
              username: txn.username,
              contact: txn.contact,
              kostId: txn.kostId,
              kostName: txn.kostName,
              kostAddress: txn.kostAddress,
              loc: txn.loc,
              type: txn.type,
              months: txn.months,
              startDate: txn.startDate,
              endDate: txn.endDate,
              paymentOption: txn.paymentOption,
              payment: txn.paymentMethod,
              subtotal: txn.subtotal,
              discount: txn.discount,
              adminFee: txn.adminFee,
              serviceFee: txn.serviceFee,
              total: txn.totalAmount,
              amountPaid: txn.amountPaid || 0,
              remainingAmount: txn.remainingAmount || 0,
              transactionId: txn.transactionId,
              invoiceNumber: txn.invoiceNumber,
              contractNumber: txn.contractNumber
            };
            newBookings = [...state.bookings, newBooking];
          }
          
          return { 
            transactions: updated, 
            activeTransaction: activeUpdated,
            bookings: newBookings
          };
        });
      },
      
      failTransaction: (transactionId, reason) => {
        const now = new Date().toISOString();
        set(state => {
          const updated = state.transactions.map(t => 
            t.transactionId === transactionId
              ? { ...t, status: 'FAILED' as TransactionStatus, failedAt: now, failReason: reason }
              : t
          );
          const activeUpdated = state.activeTransaction?.transactionId === transactionId
            ? { ...state.activeTransaction, status: 'FAILED' as TransactionStatus, failedAt: now, failReason: reason }
            : state.activeTransaction;
          return { transactions: updated, activeTransaction: activeUpdated };
        });
      },
      
      setActiveTransaction: (transaction) => set({ activeTransaction: transaction }),
      
      getTransactionById: (transactionId) => {
        return get().transactions.find(t => t.transactionId === transactionId);
      },
      
      getUserTransactions: () => {
        const { currentUser, transactions } = get();
        if (!currentUser) return [];
        return transactions.filter(t => t.userId === currentUser.id).sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },
      
      getUserBookings: () => {
        const { currentUser, bookings } = get();
        if (!currentUser) return [];
        return bookings.filter(b => b.userId === currentUser.id).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
      
      clearBookings: () => {
        const { currentUser } = get();
        if (!currentUser) return;
        set(state => ({
          bookings: state.bookings.filter(b => b.userId !== currentUser.id)
        }));
      }
    }),
    {
      name: 'kostapp-storage-v3',
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
        kosts: state.kosts,
        transactions: state.transactions,
        bookings: state.bookings,
        favorites: state.favorites
      })
    }
  )
);
