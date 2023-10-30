"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ChildrenProps } from "@/types";

const queryClient = new QueryClient();

const QueryProvider = ({ children }: ChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
