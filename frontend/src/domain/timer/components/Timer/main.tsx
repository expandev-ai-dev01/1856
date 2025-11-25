import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/core/components/card';
import { Input } from '@/core/components/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/core/components/form';
import { useTimerSettings } from '../../hooks/useTimerSettings';
import { sessionStartSchema, type SessionStartFormData } from '../../validations/session';
import type { TimerMode, TimerStatus } from './types';
import { useSessionHistory } from '@/domain/history';

function Timer() {
  const { settings } = useTimerSettings();
  const { createSession } = useSessionHistory();

  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [currentSessionDescription, setCurrentSessionDescription] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<string | null>(null);

  const form = useForm<SessionStartFormData>({
    resolver: zodResolver(sessionStartSchema),
    defaultValues: {
      description: '',
    },
    mode: 'onBlur',
  });

  // Initialize timer when settings load
  useEffect(() => {
    if (settings && status === 'idle') {
      const duration =
        mode === 'focus'
          ? settings.focusDuration
          : mode === 'shortBreak'
          ? settings.shortBreakDuration
          : settings.longBreakDuration;
      setTimeLeft(duration * 60);
    }
  }, [settings, mode, status]);

  // Timer tick logic
  useEffect(() => {
    if (status === 'running' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'running') {
      handleComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, timeLeft]);

  const handleStart = (data: SessionStartFormData) => {
    const sanitizedDescription = data.description ? DOMPurify.sanitize(data.description) : '';

    setCurrentSessionDescription(sanitizedDescription);
    startTimeRef.current = new Date().toISOString();
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleResume = () => {
    setStatus('running');
  };

  const handleStop = () => {
    setStatus('idle');
    if (settings) {
      setTimeLeft(settings.focusDuration * 60);
    }
    setMode('focus');
    form.reset();
  };

  const handleComplete = async () => {
    setStatus('idle');

    if (mode === 'focus' && startTimeRef.current && settings) {
      try {
        await createSession({
          sessionDescription: currentSessionDescription || undefined,
          startTimestamp: startTimeRef.current,
          durationMinutes: settings.focusDuration,
        });
        // Optional: Play sound or show notification
      } catch (error) {
        console.error('Failed to save session:', error);
      }
    }

    // Switch modes automatically or wait for user
    if (mode === 'focus') {
      setMode('shortBreak');
    } else {
      setMode('focus');
    }

    form.reset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!settings) return 100;
    const totalSeconds =
      (mode === 'focus'
        ? settings.focusDuration
        : mode === 'shortBreak'
        ? settings.shortBreakDuration
        : settings.longBreakDuration) * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="flex gap-2 rounded-lg bg-muted p-1">
        <Button
          variant={mode === 'focus' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            if (status === 'idle') setMode('focus');
          }}
          disabled={status !== 'idle'}
          className="w-24"
        >
          Foco
        </Button>
        <Button
          variant={mode === 'shortBreak' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            if (status === 'idle') setMode('shortBreak');
          }}
          disabled={status !== 'idle'}
          className="w-24"
        >
          Curta
        </Button>
        <Button
          variant={mode === 'longBreak' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            if (status === 'idle') setMode('longBreak');
          }}
          disabled={status !== 'idle'}
          className="w-24"
        >
          Longa
        </Button>
      </div>

      <Card className="w-full max-w-md overflow-hidden border-2">
        <div
          className="h-1 bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${getProgress()}%` }}
        />
        <CardHeader className="pb-2 text-center">
          <div className="text-8xl font-bold tracking-tighter tabular-nums text-primary">
            {formatTime(timeLeft)}
          </div>
          <p className="text-muted-foreground font-medium uppercase tracking-widest">
            {status === 'idle'
              ? 'Pronto para iniciar'
              : status === 'paused'
              ? 'Pausado'
              : mode === 'focus'
              ? 'Focando'
              : 'Descansando'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === 'idle' && mode === 'focus' && (
            <Form {...form}>
              <form id="timer-form" onSubmit={form.handleSubmit(handleStart)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="No que você vai trabalhar?"
                          className="text-center text-lg h-12"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {status !== 'idle' && mode === 'focus' && currentSessionDescription && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Trabalhando em:</p>
              <p className="text-lg font-medium">{currentSessionDescription}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center gap-4 pb-8">
          {status === 'idle' ? (
            <Button
              size="lg"
              className="h-14 w-32 rounded-full text-xl shadow-lg"
              form={mode === 'focus' ? 'timer-form' : undefined}
              onClick={mode !== 'focus' ? () => handleStart({ description: '' }) : undefined}
            >
              <Play className="mr-2 h-6 w-6 fill-current" />
              Iniciar
            </Button>
          ) : (
            <>
              {status === 'running' ? (
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 w-32 rounded-full text-xl"
                  onClick={handlePause}
                >
                  <Pause className="mr-2 h-6 w-6 fill-current" />
                  Pausar
                </Button>
              ) : (
                <Button size="lg" className="h-14 w-32 rounded-full text-xl" onClick={handleResume}>
                  <Play className="mr-2 h-6 w-6 fill-current" />
                  Retomar
                </Button>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="h-14 w-14 rounded-full text-muted-foreground hover:text-destructive"
                onClick={handleStop}
                title="Cancelar"
              >
                <Square className="h-6 w-6 fill-current" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export { Timer };
