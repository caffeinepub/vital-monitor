import { useState, useCallback } from 'react';

interface BluetoothDeviceInfo {
  id: string;
  name: string | undefined;
}

interface UseBluetoothReturn {
  device: BluetoothDeviceInfo | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useBluetooth(): UseBluetoothReturn {
  const [device, setDevice] = useState<BluetoothDeviceInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setError(null);
    setIsConnecting(true);

    try {
      // Check if Web Bluetooth API is supported
      if (!navigator.bluetooth) {
        throw new Error('Web Bluetooth API is not supported in this browser. Please use Chrome, Edge, or Opera.');
      }

      // Request a Bluetooth device
      // Accept all devices for maximum compatibility
      const bluetoothDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['heart_rate', 'battery_service', 'device_information']
      });

      // Store device information
      setDevice({
        id: bluetoothDevice.id,
        name: bluetoothDevice.name
      });

      // Set up disconnect handler
      bluetoothDevice.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        setDevice(null);
      });

      // Connect to GATT server
      const server = await bluetoothDevice.gatt?.connect();
      
      if (server) {
        setIsConnected(true);
      } else {
        throw new Error('Failed to connect to device GATT server');
      }

    } catch (err) {
      if (err instanceof Error) {
        // Handle specific error cases
        if (err.name === 'NotFoundError') {
          setError('No device selected. Please try again.');
        } else if (err.name === 'SecurityError') {
          setError('Bluetooth access denied. Please check your browser permissions.');
        } else if (err.name === 'NotSupportedError') {
          setError('Bluetooth is not supported on this device or browser.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unknown error occurred while connecting to the device.');
      }
      setDevice(null);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setDevice(null);
    setIsConnected(false);
    setError(null);
  }, []);

  return {
    device,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect
  };
}
