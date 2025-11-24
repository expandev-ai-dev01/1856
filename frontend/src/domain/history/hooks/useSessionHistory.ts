import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '../services/sessionService';

export const useSessionHistory = () => {
  const queryClient = useQueryClient();
  const queryKey = ['session-history'];

  const {
    data: sessions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: sessionService.getHistory,
  });

  const { mutateAsync: deleteSession, isPending: isDeleting } = useMutation({
    mutationFn: sessionService.deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutateAsync: createSession, isPending: isCreating } = useMutation({
    mutationFn: sessionService.createEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    sessions,
    isLoading,
    error,
    deleteSession,
    isDeleting,
    createSession,
    isCreating,
  };
};
