
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useProofOfPresence } from '@/hooks/useProofOfPresence';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/EventCard';
import { Calendar, Plus, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAccount } from 'wagmi';

const formSchema = z.object({
  locationName: z.string().min(3, {
    message: "Location name must be at least 3 characters.",
  }),
  eventDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  eventDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date and time.",
  }),
});

const Admin = () => {
  const { isConnected } = useAccount();
  const { 
    isOwner, 
    allEvents, 
    addEvent, 
    removeEvent,
    isAddingEvent,
    isRemovingEvent,
  } = useProofOfPresence();
  
  const [removingEventId, setRemovingEventId] = useState<bigint | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationName: "",
      eventDescription: "",
      eventDate: new Date().toISOString().slice(0, 16),
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const eventTimestamp = Math.floor(new Date(values.eventDate).getTime() / 1000);
    addEvent(values.locationName, values.eventDescription, eventTimestamp);
    form.reset();
  };
  
  const handleRemoveEvent = (locationId: bigint) => {
    setRemovingEventId(locationId);
    removeEvent(locationId);
  };
  
  if (!isConnected || !isOwner) {
    return (
      <Layout requireWallet>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-500 mb-8">
            Only the contract owner can access the admin panel
          </p>
          <Button asChild>
            <a href="/">
              Return to Home
            </a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout requireWallet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-500">
          Manage events and locations
        </p>
      </div>
      
      <Tabs defaultValue="add" className="mb-8">
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
          <TabsTrigger value="add">Add New Event</TabsTrigger>
          <TabsTrigger value="manage">Manage Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>
                Add a new event or location to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="locationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tech Conference 2025" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of the event or location
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eventDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the event details..." 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about the event
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date & Time</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormDescription>
                          When the event will take place
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-brand-purple hover:bg-brand-purple/90"
                    disabled={isAddingEvent}
                  >
                    {isAddingEvent ? (
                      <>
                        <Calendar className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage">
          <h3 className="text-xl font-bold mb-4">Manage Existing Events</h3>
          
          {!allEvents ? (
            <p>Loading events...</p>
          ) : allEvents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">No events available</h3>
              <p className="text-gray-500 mb-4">
                Add your first event in the "Add New Event" tab
              </p>
              <Button onClick={() => form.reset()} variant="outline">
                <TabsTrigger value="add" asChild>
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Event
                  </span>
                </TabsTrigger>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allEvents.map((event) => (
                <EventCard
                  key={event.locationId.toString()}
                  event={event}
                  isAdmin={true}
                  onRemove={handleRemoveEvent}
                  isLoading={isRemovingEvent && removingEventId === event.locationId}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Admin;
