import { Button } from '@/core/components/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/core/components/card';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
  isLoading = false,
}: ConfirmationDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in-0">
      <div className="w-full max-w-md p-4">
        <Card className="w-full shadow-lg animate-in zoom-in-95 slide-in-from-bottom-10">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              {cancelText}
            </Button>
            <Button variant={variant} onClick={onConfirm} disabled={isLoading}>
              {isLoading ? 'Processando...' : confirmText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
