import { Activity, Heart, LogOut } from 'lucide-react';
import { ReactNode } from 'react';
import { BluetoothConnectionButton } from './BluetoothConnectionButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { clear } = useInternetIdentity();
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'vital-monitor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-bg-start to-health-bg-end">
      {/* Header */}
      <header className="border-b border-health-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-health-primary/10">
                <Heart className="w-6 h-6 text-health-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-health-text-primary">Vital Monitor</h1>
                <p className="text-sm text-health-text-secondary">Real-time Health Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BluetoothConnectionButton />
              <Button
                onClick={clear}
                variant="ghost"
                size="sm"
                className="text-health-text-secondary hover:text-health-text-primary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-health-border bg-white/60 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-health-text-secondary">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>© {currentYear} Vital Monitor. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-health-primary fill-health-primary" />
              <span>using</span>
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-health-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
