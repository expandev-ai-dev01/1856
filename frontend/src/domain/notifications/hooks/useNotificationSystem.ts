import { useState, useEffect, useCallback, useRef } from 'react';
import { notificationService } from '../services/notificationService';
import type {
  NotificationType,
  NotificationPermission,
  DeviceCapabilities,
} from '../types/notification';
import { useNotificationSettings } from './useNotificationSettings';

export const useNotificationSystem = () => {
  const { settings } = useNotificationSettings();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    notifications: false,
    audio: false,
    backgroundAudio: false,
    vibration: false,
  });
  const audioContextRef = useRef<AudioContext | null>(null);

  // Detect device capabilities
  useEffect(() => {
    const detected: DeviceCapabilities = {
      notifications: 'Notification' in window,
      audio: 'Audio' in window,
      backgroundAudio: 'AudioContext' in window || 'webkitAudioContext' in window,
      vibration: 'vibrate' in navigator,
    };
    setCapabilities(detected);

    if (detected.notifications) {
      setPermission(Notification.permission as NotificationPermission);
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!capabilities.notifications) {
      return 'denied';
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result as NotificationPermission);
      return result as NotificationPermission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }, [capabilities.notifications]);

  // Show visual alert
  const showVisualAlert = useCallback(
    async (type: NotificationType) => {
      if (!settings?.visualAlertsEnabled) return;

      try {
        const content = await notificationService.getContent(type);
        // Visual alert will be handled by a toast/alert component
        // This hook just provides the data
        return content;
      } catch (error) {
        console.error('Failed to show visual alert:', error);
      }
    },
    [settings?.visualAlertsEnabled]
  );

  // Show push notification
  const showPushNotification = useCallback(
    async (type: NotificationType) => {
      if (
        !settings?.pushNotificationsEnabled ||
        !capabilities.notifications ||
        permission !== 'granted'
      ) {
        return;
      }

      try {
        const content = await notificationService.getContent(type);
        const notification = new Notification(content.titulo_notificacao, {
          body: content.corpo_notificacao,
          icon: '/assets/icons/pomo-icon.png',
          badge: '/assets/icons/pomo-icon.png',
          tag: type,
          requireInteraction: false,
        });

        // Auto-close after 5 seconds
        setTimeout(() => notification.close(), 5000);
      } catch (error) {
        console.error('Failed to show push notification:', error);
      }
    },
    [settings?.pushNotificationsEnabled, capabilities.notifications, permission]
  );

  // Play sound alert
  const playSoundAlert = useCallback(
    async (type: NotificationType) => {
      if (!settings?.soundAlertsEnabled || !capabilities.audio) return;

      try {
        const content = await notificationService.getContent(type);
        const audio = new Audio(content.arquivo_som);
        audio.volume = (settings.soundVolume || 80) / 100;

        // Try to use AudioContext for background playback
        if (capabilities.backgroundAudio && !audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }

        await audio.play();
      } catch (error) {
        console.error('Failed to play sound alert:', error);
      }
    },
    [
      settings?.soundAlertsEnabled,
      settings?.soundVolume,
      capabilities.audio,
      capabilities.backgroundAudio,
    ]
  );

  // Trigger vibration (mobile)
  const triggerVibration = useCallback(() => {
    if (capabilities.vibration) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [capabilities.vibration]);

  // Trigger all enabled notifications
  const triggerNotification = useCallback(
    async (type: NotificationType) => {
      const content = await showVisualAlert(type);
      await showPushNotification(type);
      await playSoundAlert(type);
      triggerVibration();
      return content;
    },
    [showVisualAlert, showPushNotification, playSoundAlert, triggerVibration]
  );

  // Test notification
  const testNotification = useCallback(
    async (type: NotificationType, methods: ('visual' | 'push' | 'sound' | 'all')[]) => {
      const results: Record<string, boolean> = {};

      try {
        if (methods.includes('visual') || methods.includes('all')) {
          const content = await showVisualAlert(type);
          results.visual = !!content;
        }

        if (methods.includes('push') || methods.includes('all')) {
          await showPushNotification(type);
          results.push = permission === 'granted';
        }

        if (methods.includes('sound') || methods.includes('all')) {
          await playSoundAlert(type);
          results.sound = capabilities.audio;
        }

        return results;
      } catch (error) {
        console.error('Test notification failed:', error);
        return results;
      }
    },
    [showVisualAlert, showPushNotification, playSoundAlert, permission, capabilities.audio]
  );

  return {
    permission,
    capabilities,
    requestPermission,
    triggerNotification,
    testNotification,
    showVisualAlert,
    showPushNotification,
    playSoundAlert,
  };
};
