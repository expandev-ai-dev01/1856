import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { ConfirmationDialog } from '@/core/components/confirmation-dialog';
import { SessionList, useSessionHistory, type Session } from '@/domain/history';

function HistoryPage() {
  const { goBack } = useNavigation();
  const { sessions, isLoading, deleteSession, isDeleting } = useSessionHistory();
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);

  const handleDeleteClick = (session: Session) => {
    setSessionToDelete(session);
  };

  const handleConfirmDelete = async () => {
    if (sessionToDelete) {
      try {
        await deleteSession(sessionToDelete.id);
        setSessionToDelete(null);
      } catch (error) {
        console.error('Failed to delete session:', error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack} aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico</h1>
          <p className="text-muted-foreground">Visualize suas sessões de foco concluídas.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size={32} />
        </div>
      ) : (
        <SessionList sessions={sessions} onDeleteClick={handleDeleteClick} />
      )}

      <ConfirmationDialog
        open={!!sessionToDelete}
        onOpenChange={(open) => !open && setSessionToDelete(null)}
        title="Excluir sessão"
        description="Tem certeza que deseja excluir este registro do histórico? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export { HistoryPage };
