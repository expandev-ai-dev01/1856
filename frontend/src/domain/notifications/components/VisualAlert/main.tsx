import { useEffect, useState } from 'react';
import { X, Timer, Coffee } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { NotificationContent } from '../../types/notification';

interface VisualAlertProps {
  content: NotificationContent;
  duration?: number;
  onClose?: () => void;
}

function VisualAlert({ content, duration = 5000, onClose }: VisualAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const Icon = content.icone === 'timer' ? Timer : Coffee;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 w-full max-w-md rounded-lg shadow-lg transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      style={{ backgroundColor: content.cor_alerta }}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex-shrink-0">
          <div className="rounded-full bg-white/20 p-2">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex-1 pt-0.5">
          <p className="font-semibold text-white">{content.mensagem}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 rounded-md p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Fechar alerta"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export { VisualAlert };
