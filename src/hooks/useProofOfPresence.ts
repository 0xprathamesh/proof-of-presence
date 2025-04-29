
import { useEffect, useState } from 'react';
import { useContractRead, useContractWrite, useAccount, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractAbi';
import { useToast } from '@/hooks/use-toast';

export interface EventInfo {
  locationId: bigint;
  locationName: string;
  eventDescription: string;
  eventDate: bigint;
}

export interface Presence {
  timestamp: bigint;
  locationId: bigint;
  locationName: string;
  eventDescription: string;
  eventDate: bigint;
  metadata: string;
}

export const useProofOfPresence = () => {
  const { address: walletAddress, isConnected } = useAccount();
  const { toast } = useToast();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  
  // Read owner address from contract
  const { data: ownerAddress } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  // Check if current user is owner
  useEffect(() => {
    if (walletAddress && ownerAddress) {
      setIsOwner(walletAddress.toLowerCase() === (ownerAddress as string).toLowerCase());
    } else {
      setIsOwner(false);
    }
  }, [walletAddress, ownerAddress]);

  // Get all events
  const { data: allEvents, refetch: refetchEvents } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getAllEvents',
    watch: true,
  });

  // Get user presences
  const { data: userPresences, refetch: refetchPresences } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserPresences',
    args: [walletAddress as `0x${string}`],
    enabled: !!walletAddress,
    watch: true,
  });

  // Add location (admin only)
  const { 
    write: addLocation,
    data: addLocationData,
    isLoading: isAddingLocation,
    error: addLocationError
  } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'addLocation',
  });

  const { isLoading: isAddLocationPending } = useWaitForTransaction({
    hash: addLocationData?.hash,
    onSuccess: () => {
      toast({
        title: 'Event added successfully!',
        description: 'Your new event has been added to the blockchain.',
      });
      refetchEvents();
    },
    onError: (error) => {
      toast({
        title: 'Error adding event',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Remove location (admin only)
  const {
    write: removeLocation,
    data: removeLocationData,
    isLoading: isRemovingLocation,
    error: removeLocationError
  } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'removeLocation',
  });

  const { isLoading: isRemoveLocationPending } = useWaitForTransaction({
    hash: removeLocationData?.hash,
    onSuccess: () => {
      toast({
        title: 'Event removed successfully!',
        description: 'The event has been removed from the blockchain.',
      });
      refetchEvents();
    },
    onError: (error) => {
      toast({
        title: 'Error removing event',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Register presence
  const {
    write: registerPresence,
    data: registerPresenceData,
    isLoading: isRegisteringPresence,
    error: registerPresenceError
  } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'registerPresence',
  });

  const { isLoading: isRegisterPresencePending } = useWaitForTransaction({
    hash: registerPresenceData?.hash,
    onSuccess: () => {
      toast({
        title: 'Presence registered successfully!',
        description: 'Your attendance has been recorded on the blockchain.',
      });
      refetchPresences();
    },
    onError: (error) => {
      toast({
        title: 'Error registering presence',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Get event info
  const getEventInfo = async (locationId: bigint) => {
    try {
      const { data } = await useContractRead({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'getEventInfo',
        args: [locationId]
      });
      return data as EventInfo;
    } catch (error) {
      console.error("Error fetching event info:", error);
      return null;
    }
  };

  return {
    isOwner,
    allEvents: allEvents as EventInfo[] | undefined,
    userPresences: userPresences as Presence[] | undefined,
    addEvent: (locationName: string, eventDescription: string, eventDate: number) => {
      if (!isConnected) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to continue.',
          variant: 'destructive',
        });
        return;
      }
      addLocation?.({ args: [locationName, eventDescription, BigInt(eventDate)] });
    },
    removeEvent: (locationId: bigint) => {
      if (!isConnected) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to continue.',
          variant: 'destructive',
        });
        return;
      }
      removeLocation?.({ args: [locationId] });
    },
    registerPresence: (locationId: bigint, metadata: string) => {
      if (!isConnected) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to continue.',
          variant: 'destructive',
        });
        return;
      }
      registerPresence?.({ args: [locationId, metadata] });
    },
    getEventInfo,
    isAddingEvent: isAddingLocation || isAddLocationPending,
    isRemovingEvent: isRemovingLocation || isRemoveLocationPending,
    isRegisteringPresence: isRegisteringPresence || isRegisterPresencePending,
    addEventError: addLocationError,
    removeEventError: removeLocationError,
    registerPresenceError: registerPresenceError,
  };
};
