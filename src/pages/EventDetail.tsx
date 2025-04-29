
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useProofOfPresence, EventInfo } from '@/hooks/useProofOfPresence';
import RegisterPresenceDialog from '@/components/RegisterPresenceDialog';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { allEvents, userPresences, registerPresence, isRegisteringPresence } = useProofOfPresence();
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (allEvents && id) {
      const locationId = BigInt(id);
      const foundEvent = allEvents.find(e => e.locationId === locationId);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
  }, [allEvents, id]);

  useEffect(() => {
    if (userPresences && event) {
      const found = userPresences.find(p => p.locationId === event.locationId);
      setIsRegistered(!!found);
    }
  }, [userPresences, event]);

  const handleRegister = (metadata: string) => {
    if (event) {
      registerPresence(event.locationId, metadata);
      setIsDialogOpen(false);
    }
  };

  const handleShare = async () => {
    if (event) {
      const shareData = {
        title: `${event.locationName} - Proof of Presence`,
        text: `Join me at ${event.locationName}: ${event.eventDescription}`,
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied",
            description: "Link copied to clipboard!"
          });
        }
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <p className="text-gray-500">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  const eventDate = new Date(Number(event.eventDate) * 1000);
  const isPast = eventDate < new Date();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{event.locationName}</h1>
          
          {isPast ? (
            <Badge variant="secondary">Past Event</Badge>
          ) : (
            <Badge className="bg-brand-purple">Upcoming</Badge>
          )}
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-brand-lavender/30">
            <CardTitle className="text-xl">Event Details</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Location ID: {event.locationId.toString()}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{eventDate.toLocaleString()}</span>
            </div>
            
            <div className="prose prose-sm max-w-none mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{event.eventDescription}</p>
            </div>
            
            {isRegistered && (
              <div className="flex items-center gap-2 text-green-600 mt-4 p-3 bg-green-50 rounded-md">
                <Users className="h-5 w-5" />
                <span className="font-medium">You're registered for this event</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button 
            variant="outline"
            onClick={handleShare}
          >
            Share Event
          </Button>
          
          {!isRegistered && !isPast && (
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-brand-purple hover:bg-brand-purple/90"
              disabled={isRegisteringPresence}
            >
              {isRegisteringPresence ? 'Processing...' : 'Register Presence'}
            </Button>
          )}
        </div>
      </div>
      
      <RegisterPresenceDialog 
        event={event}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onRegister={handleRegister}
        isRegistering={isRegisteringPresence}
      />
    </Layout>
  );
};

export default EventDetail;
