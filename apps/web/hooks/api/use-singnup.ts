import { trpc } from "~/trpc/client";

export function useSignup() {
  const utils=trpc.useUtils();
  const {
    mutate: createUserWithEmailAndPassword,
    mutateAsync:createUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess:async ()=>{
      await utils.auth.getUser.invalidate()
    }
  });

   
 
  
  return {
    createUserWithEmailAndPassword,
    createUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  };
}
