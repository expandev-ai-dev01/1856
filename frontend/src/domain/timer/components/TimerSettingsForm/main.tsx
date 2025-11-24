import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timerSettingsSchema } from '../../validations/settings';
import type { TimerSettings } from '../../types/settings';
import { useTimerSettings } from '../../hooks/useTimerSettings';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';

function TimerSettingsForm() {
  const { settings, isLoading, updateSettings, isUpdating } = useTimerSettings();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<TimerSettings>({
    resolver: zodResolver(timerSettingsSchema),
    defaultValues: {
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: TimerSettings) => {
    try {
      setSuccessMessage(null);
      await updateSettings(data);
      setSuccessMessage('Configurações salvas com sucesso!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to update settings:', error);
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
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Configuração do Timer</CardTitle>
        <CardDescription>Personalize a duração dos seus ciclos de foco e pausas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="focusDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foco (minutos)</FormLabel>
                  <FormControl>
                    <Input type="number" min={5} max={90} {...field} />
                  </FormControl>
                  <FormDescription>Duração do período de foco (5-90 min).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortBreakDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pausa Curta (minutos)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={30} {...field} />
                  </FormControl>
                  <FormDescription>Duração da pausa curta (1-30 min).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longBreakDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pausa Longa (minutos)</FormLabel>
                  <FormControl>
                    <Input type="number" min={10} max={60} {...field} />
                  </FormControl>
                  <FormDescription>Duração da pausa longa (10-60 min).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isUpdating} className="w-full">
                {isUpdating && <LoadingSpinner className="mr-2 h-4 w-4" />}
                Salvar Configurações
              </Button>

              {successMessage && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400 text-center">
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

export { TimerSettingsForm };
