import { Button } from '@/core/components/button';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Focus with <span className="text-primary">Pomo</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Boost your productivity with our Pomodoro timer. Track your sessions, manage tasks, and
          stay focused.
        </p>
      </div>

      <div className="flex gap-4">
        <Button size="lg" onClick={() => console.log('Start Timer')}>
          Start Timer
        </Button>
        <Button variant="outline" size="lg" onClick={() => console.log('View History')}>
          View History
        </Button>
      </div>
    </div>
  );
}

export { HomePage };
