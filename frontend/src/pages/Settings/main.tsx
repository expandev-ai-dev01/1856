import { TimerSettingsForm } from '@/domain/timer';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { ArrowLeft } from 'lucide-react';

function SettingsPage() {
  const { goBack } = useNavigation();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack} aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <div className="flex justify-center">
        <TimerSettingsForm />
      </div>
    </div>
  );
}

export { SettingsPage };
