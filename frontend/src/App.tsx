import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserPage } from "./components/UserPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserPage />
    </QueryClientProvider>
  );
}

export default App;
