import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/utils/cn';

export function Toast() {
  const { toast, hideToast } = useStore();
  
  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };
  
  const Icon = icons[toast.type];
  
  return (
    <div
      className={cn(
        'fixed left-1/2 bottom-6 -translate-x-1/2 z-[3000]',
        'flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl',
        'max-w-[90vw] md:max-w-md',
        'transition-all duration-300 transform',
        toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        toast.type === 'success' && 'bg-emerald-600 text-white',
        toast.type === 'error' && 'bg-red-600 text-white',
        toast.type === 'info' && 'bg-gray-800 text-white'
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="font-semibold text-sm flex-1">{toast.message}</p>
      <button 
        onClick={hideToast}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
