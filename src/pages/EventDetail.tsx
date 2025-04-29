
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useProofOfPresence, EventInfo } from '@/hooks/useProofOfPresence';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import RegisterPresenceDialog from '@/components/RegisterPresenceDialog';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractAbi';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    allEvents, 
    userPresences,
    registerPresence,
    isRegisteringPresence
  } = useProofOfPresence();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  
  useEffect(() => {
    if (allEvents && id) {
      const foundEvent = allEvents.find(e => e.locationId.toString() === id);
      if (foundEvent) {
        setEvent(foundEvent);
        fetchAttendees(foundEvent.locationId);
      } else {
        toast({
          title: "Event not found",
          description: "The requested event could not be found",
          variant: "destructive",
        });
      }
    }
  }, [allEvents, id, toast]);
  
  const fetchAttendees = async (locationId: bigint) => {
    try {
      // This is a read-only operation, so we're using a provider directly
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const attendeeList = await contract.getLocationUsers(locationId);
      setAttendees(attendeeList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      setIsLoading(false);
    }
  };
  
  const isRegisteredForEvent = () => {
    if (!userPresences || !event) return false;
    return userPresences.some(presence => presence.locationId === event.locationId);
  };
  
  const handleRegisterPresence = (metadata: string) => {
    if (event) {
      registerPresence(event.locationId, metadata);
      setIsRegisterDialogOpen(false);
    }
  };
  
  if (isLoading || !event) {
    return (
      <Layout>
        <div className="mb-4">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>
          </Button>
          
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const eventDate = new Date(Number(event.eventDate) * 1000);
  const isPast = eventDate < new Date();
  const isRegistered = isRegisteredForEvent();
  
  return (
    <Layout>
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </Button>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{event.locationName}</h1>
            <p className="text-gray-500 flex items-center mt-1">
              <MapPin className="mr-1 h-4 w-4" />
              Location ID: {event.locationId.toString()}
            </p>
          </div>
          
          <Badge className={isPast ? "bg-gray-500" : "bg-brand-purple"}>
            {isPast ? "Past Event" : "Upcoming"}
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-5 w-5 text-brand-purple" />
                <span>Date: {eventDate.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-brand-purple" />
                <span>Time: {eventDate.toLocaleTimeString()}</span>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{event.eventDescription}</p>
              </div>
              
              {isRegistered && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-700 font-medium flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    You're registered for this event
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              {!isRegistered && !isPast && (
                <Button 
                  onClick={() => setIsRegisterDialogOpen(true)}
                  className="bg-brand-purple hover:bg-brand-purple/90"
                  disabled={isRegisteringPresence}
                >
                  {isRegisteringPresence ? 'Processing...' : 'Register Presence'}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Attendees
                <Badge variant="outline" className="ml-2">
                  {attendees.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                People who registered for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              {attendees.length === 0 ? (
                <p className="text-gray-500">No attendees registered yet</p>
              ) : (
                <div className="space-y-2">
                  {attendees.map((address, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <span className="text-sm font-mono">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Event ID</h3>
                <p>{event.locationId.toString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p>{eventDate.toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                <p>{eventDate.toLocaleTimeString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p>{isPast ? "Completed" : "Upcoming"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Attendees</h3>
                <p>{attendees.length}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Your Status</h3>
                <p>{isRegistered ? "Registered" : "Not Registered"}</p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Link to="/history" className="w-full">
                <Button variant="outline" className="w-full">
                  View Your History
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <RegisterPresenceDialog
        event={event}
        isOpen={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
        onRegister={handleRegisterPresence}
        isRegistering={isRegisteringPresence}
      />
    </Layout>
  );
};

export default EventDetail;
