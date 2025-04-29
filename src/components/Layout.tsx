
import React from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import { useToast } from '@/hooks/use-toast';
import { useAccount } from 'wagmi';

interface LayoutProps {
  children: React.ReactNode;
  requireWallet?: boolean;
}

const Layout = ({ children, requireWallet = false }: LayoutProps) => {
  const { isConnected } = useAccount();
  const { toast } = useToast();
  
  React.useEffect(() => {
    if (requireWallet && !isConnected) {
      toast({
        title: "Please connect your wallet",
        description: "You need to connect your wallet to access this page",
        variant: "destructive",
      });
    }
  }, [isConnected, requireWallet, toast]);
  
  if (requireWallet && !isConnected) {
    return (
      <div>
        <Header />
        <main className="container py-12 min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <h1 className="text-3xl font-bold">Wallet Not Connected</h1>
            <p className="text-gray-500">Please connect your wallet to access this page</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div>
      <Header />
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <MobileNav />
      </div>
      <main className="container py-12 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
