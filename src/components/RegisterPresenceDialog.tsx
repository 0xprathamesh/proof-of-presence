
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EventInfo } from '@/hooks/useProofOfPresence';

interface RegisterPresenceDialogProps {
  event: EventInfo | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (metadata: string) => void;
  isRegistering: boolean;
}

const RegisterPresenceDialog: React.FC<RegisterPresenceDialogProps> = ({
  event,
  isOpen,
  onOpenChange,
  onRegister,
  isRegistering,
}) => {
  const [metadata, setMetadata] = useState('');
  
  if (!event) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(metadata);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Presence</DialogTitle>
          <DialogDescription>
            Register your attendance for {event.locationName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="metadata" className="font-medium">
                Additional Notes (Optional)
              </label>
              <Textarea
                id="metadata"
                placeholder="Add any notes or comments about your attendance..."
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isRegistering}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              {isRegistering ? 'Processing...' : 'Register Presence'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPresenceDialog;
