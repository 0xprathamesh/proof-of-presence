
import React from 'react';
import { ConnectButton } from '@/lib/web3Config';
import { Calendar, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useProofOfPresence } from '@/hooks/useProofOfPresence';

const Header = () => {
  const { address, isConnected } = useAccount();
  const { isOwner } = useProofOfPresence();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold text-gray-800">
              ProofOfPresence
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-brand-purple">
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            
            <Link to="/history" className="text-sm font-medium text-gray-700 hover:text-brand-purple">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>My History</span>
              </div>
            </Link>
            
            {isOwner && (
              <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-brand-purple">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
