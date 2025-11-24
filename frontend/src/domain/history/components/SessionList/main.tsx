import { Trash2, Clock, Calendar } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Card, CardContent } from '@/core/components/card';
import { formatDate, formatDuration } from '@/core/utils/date';
import type { Session } from '../../types/session';

interface SessionListProps {
  sessions: Session[];
  onDeleteClick: (session: Session) => void;
}

function SessionList({ sessions, onDeleteClick }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Nenhuma sessão registrada</h3>
        <p className="text-muted-foreground mt-1">
          Complete seu primeiro Pomodoro para vê-lo aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 sm:p-6">
              <div className="space-y-1.5">
                <h4 className="font-semibold leading-none tracking-tight">
                  {session.taskDescription}
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(session.startTimestamp)}</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatDuration(session.durationMinutes)}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 ml-4"
                onClick={() => onDeleteClick(session)}
                aria-label="Excluir sessão"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { SessionList };
