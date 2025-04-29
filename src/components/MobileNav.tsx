
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home, Menu, User, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useProofOfPresence } from '@/hooks/useProofOfPresence';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { isOwner } = useProofOfPresence();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6 pr-0">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Calendar className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold text-gray-800">
              ProofOfPresence
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/history" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setOpen(false)}
          >
            <Calendar className="h-5 w-5" />
            <span>My History</span>
          </Link>
          
          {isOwner && (
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Admin</span>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
