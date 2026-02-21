import { HealthDashboard } from './components/HealthDashboard';
import { MovementAnomalySection } from './components/MovementAnomalySection';
import { AlarmNotificationSystem } from './components/AlarmNotificationSystem';
import { HealthTrendsView } from './components/HealthTrendsView';
import { PageLayout } from './components/PageLayout';
import { LoginPage } from './components/LoginPage';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useInternetIdentity } from './hooks/useInternetIdentity';

function App() {
  const { identity, isInitializing } = useInternetIdentity();

  // Show loading state while checking authentication
  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-gradient-to-br from-health-bg-start to-health-bg-end flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-health-primary mx-auto mb-4"></div>
            <p className="text-health-text-secondary">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Show login page if not authenticated
  if (!identity) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LoginPage />
        <Toaster />
      </ThemeProvider>
    );
  }

  // Show main dashboard when authenticated
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <PageLayout>
        <div className="space-y-6">
          {/* Critical alerts at the top */}
          <AlarmNotificationSystem />
          
          {/* Current health metrics dashboard */}
          <HealthDashboard />
          
          {/* Movement anomalies */}
          <MovementAnomalySection />
          
          {/* Historical trends */}
          <HealthTrendsView />
        </div>
      </PageLayout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
