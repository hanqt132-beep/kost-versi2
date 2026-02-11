import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { AuthModal } from '@/components/auth/AuthModal';
import { KostDetailModal } from '@/components/kost/KostDetailModal';
import { PaymentFlow } from '@/components/payment/PaymentFlow';
import { HomePage } from '@/components/pages/HomePage';
import { FavoritesPage } from '@/components/pages/FavoritesPage';
import { OrdersPage } from '@/components/pages/OrdersPage';
import { PromoPage } from '@/components/pages/PromoPage';
import { HelpPage } from '@/components/pages/HelpPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { AdminDashboard } from '@/components/pages/AdminDashboard';
import { useStore } from '@/store/useStore';
import type { Kost, PaymentOptionType } from '@/types';

export function App() {
  const { currentRoute, currentUser, initiateTransaction, activeTransaction, showToast, setRoute } = useStore();
  
  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedKost, setSelectedKost] = useState<Kost | null>(null);
  const [kostDetailOpen, setKostDetailOpen] = useState(false);
  const [paymentFlowOpen, setPaymentFlowOpen] = useState(false);
  
  // Handle opening kost detail
  const handleOpenKostDetail = (kost: Kost) => {
    setSelectedKost(kost);
    setKostDetailOpen(true);
  };
  
  // Handle proceeding to payment
  const handleProceedToPayment = (months: number, startDate: string, paymentOption: PaymentOptionType) => {
    if (!currentUser) {
      showToast('Silakan masuk untuk melakukan booking.', 'info');
      setAuthModalOpen(true);
      return;
    }
    
    if (!selectedKost) return;
    
    // Initiate transaction with selected payment option
    const transaction = initiateTransaction({
      kostId: selectedKost.id,
      months,
      startDate,
      paymentOption
    });
    
    if (transaction) {
      setKostDetailOpen(false);
      setPaymentFlowOpen(true);
    } else {
      showToast('Gagal memulai transaksi. Silakan coba lagi.', 'error');
    }
  };
  
  // Handle payment flow close
  const handlePaymentFlowClose = () => {
    setPaymentFlowOpen(false);
    setSelectedKost(null);
  };
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);
  
  // Render current page
  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
      case 'search':
        return <HomePage onOpenKostDetail={handleOpenKostDetail} />;
      case 'favorites':
        return <FavoritesPage onOpenKostDetail={handleOpenKostDetail} />;
      case 'orders':
        return <OrdersPage />;
      case 'promo':
        return <PromoPage onOpenKostDetail={handleOpenKostDetail} />;
      case 'help':
        return <HelpPage />;
      case 'about':
        return <AboutPage />;
      case 'career':
        return <AboutPage type="career" />;
      case 'blog':
        return <AboutPage type="blog" />;
      case 'partner':
        return <AboutPage type="partner" />;
      case 'admin':
        if (!currentUser || currentUser.role !== 'admin') {
          setRoute('home');
          showToast('Akses admin ditolak. Silakan login sebagai admin.', 'error');
          return null;
        }
        return <AdminDashboard />;
      default:
        return <HomePage onOpenKostDetail={handleOpenKostDetail} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
      
      {/* Main Content */}
      <main className="pt-20">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast */}
      <Toast />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      {/* Kost Detail Modal */}
      <KostDetailModal
        isOpen={kostDetailOpen}
        onClose={() => setKostDetailOpen(false)}
        kost={selectedKost}
        onProceedToPayment={handleProceedToPayment}
      />
      
      {/* Payment Flow Modal */}
      <PaymentFlow
        isOpen={paymentFlowOpen}
        onClose={handlePaymentFlowClose}
        transaction={activeTransaction}
      />
    </div>
  );
}
