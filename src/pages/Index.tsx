
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useProofOfPresence, EventInfo } from '@/hooks/useProofOfPresence';
import EventCard from '@/components/EventCard';
import RegisterPresenceDialog from '@/components/RegisterPresenceDialog';
import { Calendar, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();
  const { 
    allEvents, 
    userPresences, 
    registerPresence,
    isRegisteringPresence
  } = useProofOfPresence();
  const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  
  const handleOpenRegisterDialog = (event: EventInfo) => {
    setSelectedEvent(event);
    setIsRegisterDialogOpen(true);
  };
  
  const handleRegisterPresence = (metadata: string) => {
    if (selectedEvent) {
      registerPresence(selectedEvent.locationId, metadata);
      setIsRegisterDialogOpen(false);
    }
  };
  
  const isRegisteredForEvent = (locationId: bigint) => {
    if (!userPresences) return false;
    return userPresences.some(presence => presence.locationId === locationId);
  };

  return (
    <Layout>
      <section className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Proof of Presence</h1>
            <p className="text-gray-500">
              Register your attendance and verify your presence at events
            </p>
          </div>
          
          {isConnected && (
            <Button asChild className="bg-brand-purple hover:bg-brand-purple/90">
              <a href="/history">
                <Calendar className="mr-2 h-4 w-4" />
                View My History
              </a>
            </Button>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-brand-lavender to-brand-softBlue rounded-lg p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Connect your wallet to interact with the platform</li>
            <li>Browse available events and their details</li>
            <li>Register your presence at an event</li>
            <li>Your attendance is permanently recorded on the blockchain</li>
            <li>View your attendance history anytime</li>
          </ol>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Events</h2>
        
        {!allEvents ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border shadow">
                <div className="h-40 bg-gray-100 rounded-t-lg">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : allEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No events available</h3>
            <p className="text-gray-500">
              Check back later or contact the administrator
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <EventCard
                key={event.locationId.toString()}
                event={event}
                isRegistered={isRegisteredForEvent(event.locationId)}
                onRegister={() => handleOpenRegisterDialog(event)}
                isLoading={isRegisteringPresence && selectedEvent?.locationId === event.locationId}
              />
            ))}
          </div>
        )}
      </section>
      
      <RegisterPresenceDialog
        event={selectedEvent}
        isOpen={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
        onRegister={handleRegisterPresence}
        isRegistering={isRegisteringPresence}
      />
    </Layout>
  );
};

export default Index;
