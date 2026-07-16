import { trpc } from "~/trpc/client";

export function useUser() {
  const {
    data:user,
   
    isError,
    error,
    isSuccess,
    isPending,
    isLoading,
    status
  } = trpc.auth.getUser.useQuery()
  return {
    
    user,
   
    isError,
    error,
    isSuccess,
    isPending,
    isLoading,

    status
  };
}
