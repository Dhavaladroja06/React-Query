import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './Screens/HomeScreen';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <HomeScreen />
    </QueryClientProvider>
  );
}
