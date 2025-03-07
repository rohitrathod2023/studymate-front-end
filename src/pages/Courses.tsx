import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HelpCircle } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  progress: number;
  icon: string;
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const courses: Course[] = [
    { id: '1', name: 'Mathematics', progress: 60, icon: '📐' },
    { id: '2', name: 'Science', progress: 80, icon: '🔬' },
    { id: '3', name: 'History', progress: 45, icon: '📜' },
    { id: '4', name: 'English', progress: 70, icon: '📖' },
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      
      {/* Search Bar */}
      <Input 
        placeholder="Search for a course..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="mb-6 w-full md:w-1/2"
      />

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center space-x-3">
              <span className="text-3xl">{course.icon}</span>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {course.progress}% completed
              </p>
            </CardContent>
            <CardFooter>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Floating Help Button */}
      <Button 
        variant="secondary" 
        size="icon" 
        className="fixed bottom-6 right-6 shadow-lg" 
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Courses;
