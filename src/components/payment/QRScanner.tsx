import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle2, XCircle, Loader2, QrCode, Scan, RefreshCcw } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

type ScanStatus = 'idle' | 'starting' | 'scanning' | 'success' | 'error';

// Simulate QRIS QR code data for demo
const SIMULATED_QR_DATA = [
  'QRIS:00020101021226610014ID.CO.KOSTAPP0115KOSTAPP00001250215MERCHANT123456010303UMI51440014ID.CO.KOSTAPP0215KOSTAPP000012505303360540100005802ID5910KostApp ID6013PONTIANAK62070703***6304A1B2',
  'QRIS:00020101021226610014ID.CO.KOSTAPP0115KOSTAPP00001250215MERCHANT654321010303UMI51440014ID.CO.KOSTAPP0215KOSTAPP000012505303360540100005802ID5910KostApp ID6013PONTIANAK62070703***6304C3D4',
  'QRIS:00020101021226610014ID.CO.KOSTAPP0115KOSTAPP00001250215MERCHANT789012010303UMI51440014ID.CO.KOSTAPP0215KOSTAPP000012505303360540100005802ID5910KostApp ID6013PONTIANAK62070703***6304E5F6'
];

export function QRScanner({ onScanSuccess, onScanError, isActive }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [useSimulation, setUseSimulation] = useState(false);
  const hasStartedRef = useRef(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === 2) { // SCANNING
          await scannerRef.current.stop();
        }
      } catch (err) {
        console.log('Scanner stop error:', err);
      }
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (!containerRef.current || hasStartedRef.current) return;
    
    hasStartedRef.current = true;
    setStatus('starting');
    setErrorMessage('');
    setScannedData(null);
    
    try {
      // Clean up existing scanner
      await stopScanner();
      
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };
      
      await scanner.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          setStatus('success');
          setScannedData(decodedText);
          stopScanner();
          onScanSuccess(decodedText);
        },
        () => {
          // Ignore scan errors during active scanning
        }
      );
      
      setStatus('scanning');
    } catch (err) {
      console.error('Scanner start error:', err);
      setStatus('error');
      const errorMsg = err instanceof Error ? err.message : 'Tidak dapat mengakses kamera';
      setErrorMessage(errorMsg);
      onScanError?.(errorMsg);
      hasStartedRef.current = false;
    }
  }, [onScanSuccess, onScanError, stopScanner]);

  // Simulation mode for demo
  const handleSimulatedScan = useCallback(() => {
    setStatus('starting');
    setTimeout(() => {
      setStatus('scanning');
      setTimeout(() => {
        const randomQR = SIMULATED_QR_DATA[Math.floor(Math.random() * SIMULATED_QR_DATA.length)];
        setStatus('success');
        setScannedData(randomQR);
        onScanSuccess(randomQR);
      }, 2000);
    }, 1000);
  }, [onScanSuccess]);

  useEffect(() => {
    if (isActive && status === 'idle' && !useSimulation) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        startScanner();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, status, startScanner, useSimulation]);

  useEffect(() => {
    return () => {
      stopScanner();
      hasStartedRef.current = false;
    };
  }, [stopScanner]);

  const handleRetry = () => {
    hasStartedRef.current = false;
    setStatus('idle');
    setUseSimulation(false);
    setTimeout(() => startScanner(), 100);
  };

  const handleUseSimulation = () => {
    setUseSimulation(true);
    handleSimulatedScan();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scanner Container */}
      <div 
        ref={containerRef}
        className={cn(
          'relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden',
          'border-4 transition-all duration-300',
          status === 'scanning' && 'border-emerald-500 shadow-lg shadow-emerald-500/20',
          status === 'success' && 'border-emerald-500',
          status === 'error' && 'border-red-400',
          (status === 'idle' || status === 'starting') && 'border-slate-200 bg-slate-900'
        )}
      >
        {/* QR Reader Element */}
        <div id="qr-reader" className="w-full h-full" />
        
        {/* Overlay States */}
        {status === 'idle' && !useSimulation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <QrCode className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-600 font-semibold mb-2">Siap untuk scan</p>
            <p className="text-slate-400 text-sm">Menunggu akses kamera...</p>
          </div>
        )}
        
        {status === 'starting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
              <div className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            <p className="text-white font-semibold mt-6">
              {useSimulation ? 'Simulasi scan QR...' : 'Memulai kamera...'}
            </p>
            <p className="text-slate-400 text-sm mt-1">Mohon tunggu</p>
          </div>
        )}
        
        {status === 'scanning' && (
          <>
            {/* Scanning overlay with corner markers */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Corner markers */}
                  <div className="qr-frame-corner top-left" />
                  <div className="qr-frame-corner top-right" />
                  <div className="qr-frame-corner bottom-left" />
                  <div className="qr-frame-corner bottom-right" />
                  
                  {/* Scanning line animation */}
                  <div 
                    className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" 
                    style={{ 
                      animation: 'scanLine 2s ease-in-out infinite',
                      top: '50%'
                    }} 
                  />
                </div>
              </div>
              
              {/* Dimmed corners */}
              <div className="absolute inset-0 bg-black/50" style={{
                maskImage: 'radial-gradient(circle at center, transparent 120px, black 120px)',
                WebkitMaskImage: 'radial-gradient(circle at center, transparent 120px, black 120px)'
              }} />
            </div>
          </>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 animate-success-pulse">
              <CheckCircle2 className="w-14 h-14 text-emerald-500" />
            </div>
            <p className="text-white font-bold text-xl">QR Berhasil Dipindai!</p>
            <p className="text-emerald-100 text-sm mt-2">Data terverifikasi</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 p-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-slate-800 font-bold text-lg mb-2 text-center">Gagal Mengakses Kamera</p>
            <p className="text-slate-600 text-sm text-center mb-4">{errorMessage}</p>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <Button variant="primary" size="sm" onClick={handleRetry} className="w-full">
                <RefreshCcw className="w-4 h-4" />
                Coba Lagi
              </Button>
              <Button variant="outline" size="sm" onClick={handleUseSimulation} className="w-full">
                <Scan className="w-4 h-4" />
                Gunakan Simulasi (Demo)
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Status Text */}
      <div className="mt-6 text-center w-full max-w-sm">
        {status === 'scanning' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Kamera Aktif
            </div>
            <p className="text-emerald-600 text-sm">
              Posisikan kode QR pembayaran di dalam frame
            </p>
          </div>
        )}
        
        {status === 'success' && scannedData && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Data QR Terverifikasi
            </div>
            <div className="bg-white rounded-xl p-3 font-mono text-xs text-emerald-600 break-all">
              {scannedData.slice(0, 60)}...
            </div>
          </div>
        )}
        
        {(status === 'idle' || status === 'error') && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-blue-700 text-sm">
              <strong>Tips:</strong> Jika kamera tidak tersedia, gunakan mode simulasi untuk demo.
            </p>
            {status === 'idle' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleUseSimulation}
                className="mt-3 w-full"
              >
                <Scan className="w-4 h-4" />
                Simulasi Scan (Demo)
              </Button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanLine {
          0%, 100% { transform: translateY(-100px); opacity: 1; }
          50% { transform: translateY(100px); opacity: 0.5; }
        }
        
        .qr-frame-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: #10B981;
          border-width: 4px;
        }
        
        .qr-frame-corner.top-left {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
          border-radius: 8px 0 0 0;
        }
        
        .qr-frame-corner.top-right {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
          border-radius: 0 8px 0 0;
        }
        
        .qr-frame-corner.bottom-left {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
          border-radius: 0 0 0 8px;
        }
        
        .qr-frame-corner.bottom-right {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
          border-radius: 0 0 8px 0;
        }
        
        #qr-reader video {
          border-radius: 1rem;
          object-fit: cover;
        }
        
        #qr-reader__scan_region {
          background: transparent !important;
        }
        
        #qr-reader__dashboard {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
