// File: src/pages/Dashboard.tsx
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Types for our module data
interface Module {
  id: string;
  name: string;
  progress: number;
  lastAccessed?: boolean;
}

const Home = () => {
  // Mock data for modules
  const modules: Module[] = [
    { id: '1', name: 'Algebra Basics', progress: 85, lastAccessed: true },
    { id: '2', name: 'Trigonometry', progress: 60 },
    { id: '3', name: 'Geometry', progress: 30 },
    { id: '4', name: 'Calculus', progress: 10 },
  ];

  // Find the last accessed module
  const lastAccessedModule = modules.find(module => module.lastAccessed);

  // Filter incomplete modules (less than 100% progress)
  const incompleteModules = modules.filter(module => module.progress < 100);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your learning journey!</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Hero Section (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Motivational Quote */}
          <div className="bg-blue-50 p-4 rounded-lg italic text-blue-600 border-l-4 border-blue-500">
            "Consistency is the key to success! Keep going."
          </div>

          {/* Last Accessed Module Card */}
          {lastAccessedModule && (
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Start from where you left</CardTitle>
                <CardDescription className="text-blue-100">
                  Continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold mb-2">{lastAccessedModule.name}</h3>
                <Progress value={lastAccessedModule.progress} className="h-2 bg-blue-300" />
                <p className="mt-2">{lastAccessedModule.progress}% completed</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" asChild>
                  <Link to={`/courses/${lastAccessedModule.id}`}>Resume</Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Incomplete Modules */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incompleteModules.map(module => (
                <Card key={module.id} className={module.lastAccessed ? 'hidden' : ''}>
                  <CardHeader>
                    <CardTitle>{module.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={module.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {module.progress}% completed
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link to={`/courses/${module.id}`}>Continue</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Section (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Streak Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Daily Streak</CardTitle>
              <Flame className="h-6 w-6 text-orange-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">🔥 5-Day Streak!</p>
              <p className="text-sm text-muted-foreground mt-2">
                You're on fire! Keep learning daily.
              </p>
            </CardContent>
          </Card>

          {/* Daily Random Formula Card */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Random Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="font-semibold">Pythagoras Theorem:</p>
                <p className="text-lg font-mono mt-2">a² + b² = c²</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.
              </p>
            </CardContent>
          </Card>

          {/* Help Button Card */}
          <Card>
            <CardHeader>
              <CardTitle>Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Struggling with concepts or have questions? Our support team is here to help.
              </p>
              <Button className="w-full" asChild>
                <Link to="/help">Get Help</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;