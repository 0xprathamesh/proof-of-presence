
import React from 'react';
import Layout from '@/components/Layout';
import { useProofOfPresence } from '@/hooks/useProofOfPresence';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const History = () => {
  const { userPresences } = useProofOfPresence();
  
  const sortedPresences = React.useMemo(() => {
    if (!userPresences) return [];
    
    return [...userPresences].sort((a, b) => {
      return Number(b.timestamp) - Number(a.timestamp);
    });
  }, [userPresences]);
  
  const pastPresences = React.useMemo(() => {
    return sortedPresences.filter(p => Number(p.eventDate) * 1000 < Date.now());
  }, [sortedPresences]);
  
  const upcomingPresences = React.useMemo(() => {
    return sortedPresences.filter(p => Number(p.eventDate) * 1000 >= Date.now());
  }, [sortedPresences]);
  
  return (
    <Layout requireWallet>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Attendance History</h1>
          <p className="text-gray-500">
            View all events you've registered for
          </p>
        </div>
        
        <Button asChild className="bg-brand-purple hover:bg-brand-purple/90">
          <Link to="/">
            <Calendar className="mr-2 h-4 w-4" />
            View Events
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All ({sortedPresences.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingPresences.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastPresences.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderPresences(sortedPresences)}
        </TabsContent>
        
        <TabsContent value="upcoming">
          {renderPresences(upcomingPresences)}
        </TabsContent>
        
        <TabsContent value="past">
          {renderPresences(pastPresences)}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

const renderPresences = (presences: any[]) => {
  if (!presences) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (presences.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium text-gray-600 mb-2">No attendance records found</h3>
        <p className="text-gray-500">
          You haven't registered for any events yet
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {presences.map((presence, index) => {
        const eventDate = new Date(Number(presence.eventDate) * 1000);
        const registrationDate = new Date(Number(presence.timestamp) * 1000);
        const isPast = eventDate < new Date();
        
        return (
          <Card key={index}>
            <CardHeader className="bg-brand-lavender/30">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{presence.locationName}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>Location ID: {presence.locationId.toString()}</span>
                  </CardDescription>
                </div>
                
                {isPast ? (
                  <Badge variant="secondary">Past Event</Badge>
                ) : (
                  <Badge className="bg-brand-purple">Upcoming</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Event Date: {eventDate.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Registered: {registrationDate.toLocaleString()}</span>
                </div>
                
                <p className="text-sm text-gray-700">{presence.eventDescription}</p>
                
                {presence.metadata && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700">Your Notes:</h4>
                    <p className="text-sm text-gray-600 mt-1">{presence.metadata}</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Link to={`/event/${presence.locationId.toString()}`}>
                <Button variant="outline">View Event Details</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default History;
