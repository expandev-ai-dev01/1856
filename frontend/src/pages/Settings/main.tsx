import { TimerSettingsForm } from '@/domain/timer';
import { NotificationSettingsForm, NotificationTester } from '@/domain/notifications';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { ArrowLeft } from 'lucide-react';

function SettingsPage() {
  const { goBack } = useNavigation();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack} aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <div className="space-y-8">
        <section className="flex justify-center">
          <TimerSettingsForm />
        </section>

        <section className="flex justify-center">
          <NotificationSettingsForm />
        </section>

        <section className="flex justify-center">
          <NotificationTester />
        </section>
      </div>
    </div>
  );
}

export { SettingsPage };
