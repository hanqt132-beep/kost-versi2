import { useState } from 'react';
import { Layers, Shield, Scale, FileText, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { COMPANY_INFO, COPYRIGHT_YEAR, LEGAL_TEXTS } from '@/utils/legal';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type LegalModalType = 'copyright' | 'terms' | 'privacy' | null;

export function Footer() {
  const { setRoute } = useStore();
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  
  const closeLegalModal = () => setLegalModal(null);
  
  return (
    <>
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 pt-20 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 text-white font-black text-2xl mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                KostApp
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Platform pencarian dan booking kost terpercaya #1 di Indonesia. 
                Transaksi aman, harga transparan, struk resmi.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-3">
                <a 
                  href={COMPANY_INFO.socialMedia.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href={COMPANY_INFO.socialMedia.twitter}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href={COMPANY_INFO.socialMedia.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Perusahaan</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setRoute('about')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Tentang Kami
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('career')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Karier
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('blog')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('partner')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Mitra & Partner
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Service Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Layanan</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setRoute('home')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Cari Kost
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('promo')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Promo
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('help')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Pusat Bantuan
                  </button>
                </li>
                <li>
                  <button onClick={() => setRoute('orders')} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    Pesanan Saya
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => setLegalModal('terms')} 
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <FileText className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    Syarat & Ketentuan
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModal('privacy')} 
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <Lock className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    Kebijakan Privasi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModal('copyright')} 
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <Scale className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    Hak Cipta
                  </button>
                </li>
              </ul>
              
              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800/50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  SSL Secured
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800/50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  Encrypted
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Info Bar */}
          <div className="bg-slate-800/50 rounded-2xl p-6 mb-10 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Email</p>
                  <p className="text-white font-semibold">{COMPANY_INFO.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">WhatsApp</p>
                  <p className="text-white font-semibold">{COMPANY_INFO.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Kantor</p>
                  <p className="text-white font-semibold">{COMPANY_INFO.address.city}, {COMPANY_INFO.address.province}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            {/* Copyright Section with Legal References */}
            <div className="text-center">
              {/* Main Copyright */}
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-3">
                <Scale className="w-4 h-4" />
                <p className="font-semibold">
                  © {COPYRIGHT_YEAR} {COMPANY_INFO.name}
                </p>
              </div>
              
              {/* Simple Copyright */}
              <p className="text-slate-500 text-sm mb-4 max-w-3xl mx-auto">
                Platform pencarian dan booking kost terpercaya di Indonesia.
              </p>
              
              {/* Simple Note */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-w-3xl mx-auto mb-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Seluruh konten, desain, dan materi dalam platform ini dilindungi hak cipta. 
                  Dilarang menyalin atau mendistribusikan tanpa izin tertulis.
                </p>
              </div>
              
              {/* Company Legal Info */}
              <div className="text-slate-600 text-xs space-y-1">
                <p>{COMPANY_INFO.name}</p>
                <p>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city} {COMPANY_INFO.address.postalCode}, {COMPANY_INFO.address.country}</p>
                <p>Jam Operasional: {COMPANY_INFO.operatingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Legal Modals */}
      <Modal 
        isOpen={legalModal === 'copyright'} 
        onClose={closeLegalModal}
        className="max-w-3xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-black">Hak Cipta</h2>
                <p className="text-emerald-100">Perlindungan Hukum Platform KostApp</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
              {LEGAL_TEXTS.copyright.fullText}
            </pre>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <Button variant="primary" className="w-full" onClick={closeLegalModal}>
              Saya Mengerti
            </Button>
          </div>
        </div>
      </Modal>
      
      <Modal 
        isOpen={legalModal === 'terms'} 
        onClose={closeLegalModal}
        className="max-w-3xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-black">Syarat dan Ketentuan</h2>
                <p className="text-blue-100">Terakhir diperbarui: {LEGAL_TEXTS.termsOfService.lastUpdated}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
              {LEGAL_TEXTS.termsOfService.content}
            </pre>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <Button variant="primary" className="w-full" onClick={closeLegalModal}>
              Saya Setuju
            </Button>
          </div>
        </div>
      </Modal>
      
      <Modal 
        isOpen={legalModal === 'privacy'} 
        onClose={closeLegalModal}
        className="max-w-3xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-black">Kebijakan Privasi</h2>
                <p className="text-purple-100">Terakhir diperbarui: {LEGAL_TEXTS.privacyPolicy.lastUpdated}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
              {LEGAL_TEXTS.privacyPolicy.content}
            </pre>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <Button variant="primary" className="w-full" onClick={closeLegalModal}>
              Saya Mengerti
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
