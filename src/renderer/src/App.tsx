import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { AppRoutes } from "./Routes";
import "./styles/global.css";

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />;
    </QueryClientProvider>
  );
}

export { App };
