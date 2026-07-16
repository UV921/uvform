import { trpc } from "~/trpc/client";



export function useCreateForm() {
    
  const utils=trpc.useUtils();
  const {
    mutate: createFormAsync,
    mutateAsync:createForm,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status
  } = trpc.form.createForm.useMutation({
    onSuccess:async ()=>{
        await utils.form.listFormById.invalidate()
    }
   
  });
  return {
     createFormAsync,
    createForm,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status
   
  };

}


export const useListForms = () => {
    const {
        data: forms,
        error,
        isFetched,
        isFetching,
        isLoading,
        status,
    } = trpc.form.listFormById.useQuery();

    return {
        forms,
        error,
        isFetched,
        isFetching,
        isLoading,
        status,
    };
};
