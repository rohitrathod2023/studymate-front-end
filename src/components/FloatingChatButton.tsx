// File: src/components/FloatingChatButton.tsx
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingChatButton = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingChatButton;