import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AccomplishBoard from "@/components/board/AccomplishBoard";

const queryClient = new QueryClient();

const AccomplishPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AccomplishBoard />
    </QueryClientProvider>
  );
};

export default AccomplishPage;
