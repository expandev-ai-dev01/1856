import { useState } from 'react';
import { Play, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useNotificationSystem } from '../../hooks/useNotificationSystem';
import type { NotificationType } from '../../types/notification';

function NotificationTester() {
  const { testNotification } = useNotificationSystem();
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, boolean> | null>(null);

  const notificationTypes: { value: NotificationType; label: string }[] = [
    { value: 'inicio_pomodoro', label: 'Início do Pomodoro' },
    { value: 'fim_pomodoro', label: 'Fim do Pomodoro' },
    { value: 'inicio_intervalo', label: 'Início do Intervalo' },
    { value: 'fim_intervalo', label: 'Fim do Intervalo' },
  ];

  const handleTest = async (type: NotificationType) => {
    setIsTesting(true);
    setTestResults(null);

    try {
      const results = await testNotification(type, ['all']);
      setTestResults(results);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Testar Notificações</CardTitle>
        <CardDescription>
          Teste cada tipo de notificação para verificar como funcionam.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {notificationTypes.map((type) => (
            <div
              key={type.value}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            >
              <div>
                <p className="font-medium">{type.label}</p>
                <p className="text-sm text-muted-foreground">
                  Testa alertas visuais, push e sonoros
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTest(type.value)}
                disabled={isTesting}
                className="gap-2"
              >
                {isTesting ? <LoadingSpinner className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                Testar
              </Button>
            </div>
          ))}
        </div>

        {testResults && (
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <p className="font-medium text-sm">Resultados do Teste:</p>
            <div className="space-y-1">
              {Object.entries(testResults).map(([method, success]) => (
                <div key={method} className="flex items-center gap-2 text-sm">
                  {success ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="capitalize">{method}</span>:
                  <span className={success ? 'text-green-600' : 'text-destructive'}>
                    {success ? 'Sucesso' : 'Falhou'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { NotificationTester };
