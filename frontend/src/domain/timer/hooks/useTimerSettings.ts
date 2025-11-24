import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settingsService';

export const useTimerSettings = () => {
  const queryClient = useQueryClient();
  const queryKey = ['timer-settings'];

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: settingsService.getSettings,
  });

  const { mutateAsync: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: settingsService.updateSettings,
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
