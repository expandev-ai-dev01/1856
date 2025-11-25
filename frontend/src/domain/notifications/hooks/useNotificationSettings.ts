import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';
import type { NotificationSettings } from '../types/notification';

export const useNotificationSettings = () => {
  const queryClient = useQueryClient();
  const queryKey = ['notification-settings'];

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: notificationService.getSettings,
  });

  const { mutateAsync: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (settings: Partial<NotificationSettings>) =>
      notificationService.updateSettings(settings),
    onSuccess: (newSettings) => {
      queryClient.setQueryData(queryKey, newSettings);
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    isUpdating,
  };
};
