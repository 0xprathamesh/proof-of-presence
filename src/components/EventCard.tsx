
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventInfo } from '@/hooks/useProofOfPresence';

interface EventCardProps {
  event: EventInfo;
  isRegistered?: boolean;
  isAdmin?: boolean;
  onRegister?: (locationId: bigint) => void;
  onRemove?: (locationId: bigint) => void;
  isLoading?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isRegistered = false,
  isAdmin = false,
  onRegister,
  onRemove,
  isLoading = false,
}) => {
  const eventDate = new Date(Number(event.eventDate) * 1000);
  const isPast = eventDate < new Date();
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-brand-lavender/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{event.locationName}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Location ID: {event.locationId.toString()}</span>
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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4" />
          <span>{eventDate.toLocaleString()}</span>
        </div>
        
        <p className="text-sm text-gray-700">{event.eventDescription}</p>
        
        {isRegistered && (
          <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
            <Users className="h-4 w-4" />
            <span>You're registered for this event</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-between border-t pt-4">
        <Link to={`/event/${event.locationId.toString()}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        
        {isAdmin ? (
          <Button 
            variant="destructive" 
            onClick={() => onRemove?.(event.locationId)}
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove Event'}
          </Button>
        ) : (
          !isRegistered && !isPast && (
            <Button 
              onClick={() => onRegister?.(event.locationId)}
              disabled={isLoading}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              {isLoading ? 'Registering...' : 'Register Presence'}
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
