import { Timer } from '@/domain/timer';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { History } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-6">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          Pomo<span className="text-primary">Focus</span>
        </h1>
        <p className="text-muted-foreground">Mantenha o foco, gerencie seu tempo.</p>
      </div>

      <Timer />

      <div className="pt-8">
        <Button variant="outline" className="gap-2" onClick={() => navigate('/history')}>
          <History className="h-4 w-4" />
          Ver Histórico
        </Button>
      </div>
    </div>
  );
}

export { HomePage };
