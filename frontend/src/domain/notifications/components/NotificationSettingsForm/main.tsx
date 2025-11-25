import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Volume2, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/core/components/form';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useNotificationSettings } from '../../hooks/useNotificationSettings';
import { useNotificationSystem } from '../../hooks/useNotificationSystem';
import { notificationSettingsSchema, type NotificationSettings } from '../../types/notification';

function NotificationSettingsForm() {
  const { settings, isLoading, updateSettings, isUpdating } = useNotificationSettings();
  const { permission, capabilities, requestPermission } = useNotificationSystem();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<NotificationSettings>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      visualAlertsEnabled: true,
      pushNotificationsEnabled: true,
      soundAlertsEnabled: true,
      soundVolume: 80,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: NotificationSettings) => {
    try {
      setSuccessMessage(null);
      await updateSettings(data);
      setSuccessMessage('Configurações salvas com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    }
  };

  const handleEnablePushNotifications = async () => {
    if (permission === 'default') {
      const result = await requestPermission();
      if (result === 'granted') {
        form.setValue('pushNotificationsEnabled', true);
      }
    } else if (permission === 'granted') {
      form.setValue('pushNotificationsEnabled', true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Configurações de Notificação
        </CardTitle>
        <CardDescription>
          Personalize como você deseja ser alertado sobre os ciclos Pomodoro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Visual Alerts */}
            <FormField
              control={form.control}
              name="visualAlertsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Eye className="h-4 w-4" />
                      Alertas Visuais
                    </FormLabel>
                    <FormDescription>
                      Exibe notificações na interface durante as transições de ciclo.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        field.value ? 'bg-primary' : 'bg-input'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                          field.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Push Notifications */}
            <FormField
              control={form.control}
              name="pushNotificationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex-1">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Bell className="h-4 w-4" />
                      Notificações Push
                    </FormLabel>
                    <FormDescription>
                      Receba notificações mesmo quando estiver em outra aba.
                    </FormDescription>
                    {!capabilities.notifications && (
                      <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                        <AlertCircle className="h-4 w-4" />
                        Seu navegador não suporta notificações push.
                      </div>
                    )}
                    {capabilities.notifications && permission === 'denied' && (
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          Permissão negada anteriormente.
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Para reativar, acesse as configurações do navegador e permita notificações
                          para este site.
                        </p>
                      </div>
                    )}
                    {capabilities.notifications && permission === 'default' && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleEnablePushNotifications}
                      >
                        Solicitar Permissão
                      </Button>
                    )}
                  </div>
                  <FormControl>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => {
                        if (permission === 'granted') {
                          field.onChange(!field.value);
                        } else if (permission === 'default') {
                          handleEnablePushNotifications();
                        }
                      }}
                      disabled={!capabilities.notifications || permission === 'denied'}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        field.value && permission === 'granted' ? 'bg-primary' : 'bg-input'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                          field.value && permission === 'granted'
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Sound Alerts */}
            <FormField
              control={form.control}
              name="soundAlertsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Volume2 className="h-4 w-4" />
                      Alertas Sonoros
                    </FormLabel>
                    <FormDescription>Reproduz um som nas transições de ciclo.</FormDescription>
                  </div>
                  <FormControl>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        field.value ? 'bg-primary' : 'bg-input'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                          field.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Sound Volume */}
            <FormField
              control={form.control}
              name="soundVolume"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Volume dos Alertas Sonoros</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={field.value}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        disabled={!form.watch('soundAlertsEnabled')}
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm font-medium w-12 text-right">{field.value}%</span>
                    </div>
                  </FormControl>
                  <FormDescription>Ajuste o volume dos alertas sonoros (0-100).</FormDescription>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isUpdating} className="w-full">
                {isUpdating && <LoadingSpinner className="mr-2 h-4 w-4" />}
                Salvar Configurações
              </Button>

              {successMessage && (
                <div className="flex items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  {successMessage}
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { NotificationSettingsForm };
