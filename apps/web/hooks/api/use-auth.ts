import { trpc } from "~/trpc/client";

export function useSignup() {
  const {
    mutate: createUserWithEmailAndPassword,
    mutateAsync:createUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation();
  return {
    createUserWithEmailAndPassword,
    createUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  };
}
