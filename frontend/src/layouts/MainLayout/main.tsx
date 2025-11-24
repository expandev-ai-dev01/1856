import { ErrorBoundary } from '@/router/error-boundary';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Button } from '@/core/components/button';
import { Settings } from 'lucide-react';

function MainLayout() {
  const { location } = useNavigation();

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased">
        <header className="border-b px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              Pomo
            </Link>
            <nav>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex h-full min-h-fit flex-1">
          <div className="container mx-auto flex-1 px-6 py-8">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingSpinner size={40} />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
        <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pomo App. All rights reserved.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export { MainLayout };
