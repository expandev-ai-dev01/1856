import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';

function NotFoundPage() {
  const { goHome } = useNavigation();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-9xl font-black text-muted/50">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <Button onClick={goHome} size="lg">
        Back to Home
      </Button>
    </div>
  );
}

export { NotFoundPage };
