import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, ChevronLeft } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  modules: Module[];
}

const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Algebra',
    modules: [
      { id: '1-1', name: 'Linear Equations', completed: true },
      { id: '1-2', name: 'Quadratic Equations', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Geometry',
    modules: [
      { id: '2-1', name: 'Triangles', completed: false },
      { id: '2-2', name: 'Circles', completed: false },
    ],
  },
];

const ModulePage = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(chapters[0].modules[0]);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-gray-100 border-r">
        <h2 className="text-lg font-bold mb-4">Chapters</h2>
        <Accordion type="single" collapsible>
          {chapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id}>
              <AccordionTrigger>{chapter.title}</AccordionTrigger>
              <AccordionContent>
                {chapter.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`block w-full text-left p-2 rounded-md ${
                      selectedModule?.id === module.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                    }`}
                  >
                    {module.name}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Link to="/courses">
          <Button variant="outline" className="mb-4 flex items-center">
            <ChevronLeft className="mr-2" /> Back to Courses
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>{selectedModule?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Study material and notes for {selectedModule?.name}.</p>
            <Progress value={selectedModule?.completed ? 100 : 40} className="mt-4" />
            <Button className="mt-4">Take Quiz</Button>
          </CardContent>
        </Card>
      </main>

      {/* Chat Window */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogTrigger>
          <Button className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed bottom-16 right-4 w-80 bg-white p-4 shadow-lg">
          <h2 className="text-lg font-bold">AI Chatbot</h2>
          <div className="h-40 overflow-y-auto bg-gray-50 p-2 rounded-md mb-2">
            <p>Chat responses will appear here.</p>
          </div>
          <input type="text" placeholder="Ask a question..." className="w-full p-2 border rounded-md" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulePage;
