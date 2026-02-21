import { Bluetooth, BluetoothConnected, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { useBluetooth } from '../hooks/useBluetooth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

export function BluetoothConnectionButton() {
  const { device, isConnected, isConnecting, error, connect, disconnect } = useBluetooth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isConnected ? "default" : "outline"}
          size="sm"
          className={isConnected ? "bg-health-primary hover:bg-health-primary/90" : ""}
        >
          {isConnected ? (
            <>
              <BluetoothConnected className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Connected</span>
            </>
          ) : (
            <>
              <Bluetooth className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Connect Device</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-health-text-primary mb-1">Bluetooth Device</h3>
            <p className="text-sm text-health-text-secondary">
              Connect your health monitoring device via Bluetooth
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {isConnected && device ? (
            <div className="space-y-3">
              <div className="p-3 bg-health-primary/5 rounded-lg border border-health-border">
                <div className="flex items-center gap-2 mb-1">
                  <BluetoothConnected className="w-4 h-4 text-health-primary" />
                  <span className="font-medium text-health-text-primary text-sm">
                    {device.name || 'Unknown Device'}
                  </span>
                </div>
                <p className="text-xs text-health-text-secondary">
                  Device ID: {device.id.substring(0, 20)}...
                </p>
              </div>
              <Button
                onClick={disconnect}
                variant="outline"
                className="w-full"
                size="sm"
              >
                Disconnect Device
              </Button>
            </div>
          ) : (
            <Button
              onClick={connect}
              disabled={isConnecting}
              className="w-full bg-health-primary hover:bg-health-primary/90"
              size="sm"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Bluetooth className="w-4 h-4 mr-2" />
                  Scan for Devices
                </>
              )}
            </Button>
          )}

          <p className="text-xs text-health-text-secondary">
            Make sure your device is powered on and in pairing mode
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
