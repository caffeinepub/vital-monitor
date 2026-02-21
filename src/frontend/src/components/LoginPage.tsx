import { Heart, Activity, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Alert, AlertDescription } from './ui/alert';

export function LoginPage() {
  const { login, loginStatus, isLoggingIn, isLoginError } = useInternetIdentity();
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'vital-monitor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-bg-start to-health-bg-end flex flex-col">
      {/* Header */}
      <header className="border-b border-health-border bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-health-primary/10">
              <Heart className="w-6 h-6 text-health-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-health-text-primary">Vital Monitor</h1>
              <p className="text-sm text-health-text-secondary">Real-time Health Monitoring</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-health-lg p-8 border border-health-border">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-health-primary/10 flex items-center justify-center">
                <Activity className="w-10 h-10 text-health-primary" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-health-text-primary text-center mb-2">
              Welcome to Vital Monitor
            </h2>
            <p className="text-health-text-secondary text-center mb-8">
              Secure health monitoring powered by blockchain technology
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-health-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-health-text-primary">Real-time Monitoring</h3>
                  <p className="text-sm text-health-text-secondary">Track your vital signs continuously</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-health-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-health-text-primary">Secure & Private</h3>
                  <p className="text-sm text-health-text-secondary">Your data is encrypted and protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="w-4 h-4 text-health-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-health-text-primary">Smart Alerts</h3>
                  <p className="text-sm text-health-text-secondary">Get notified of any anomalies</p>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {isLoginError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  Authentication failed. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {/* Login Button */}
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-health-primary hover:bg-health-primary/90 text-white font-medium py-6 text-base"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Sign In Securely
                </>
              )}
            </Button>

            <p className="text-xs text-health-text-secondary text-center mt-4">
              Secure authentication powered by Internet Computer
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-health-border bg-white/60 backdrop-blur-sm">
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
