import { trpc } from "~/trpc/client";
import { createUserWithEmailAndPassword } from "../../../../packages/services/user/model";

export function useSignin() {
  const utils=trpc.useUtils();
  const {
    mutate: signInUserWithEmailAndPassword,
    mutateAsync:signInUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  } = trpc.auth.signInUserWithEmailandPass.useMutation({
    onSuccess:async ()=>{
      await utils.auth.getUser.invalidate()
    }
  });
  return {
    signInUserWithEmailAndPassword,
    signInUserWithEmailAndPasswordAsync,
    isError,
    error,
    isSuccess,
    isPending,
  };
}
