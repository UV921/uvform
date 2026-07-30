import { error } from "console";
import { trpc } from "~/trpc/client";

export const useCreateField = (formId: string) => {
    const utils = trpc.useUtils();

    const {
        mutateAsync: createFieldAsync,
        mutate: createField,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
    } = trpc.formFeild.createFormFeild.useMutation({
        onSuccess: async () => {
            await utils.formFeild.getFormFeild.invalidate({ formId });
        },
    });

    return {
        createFieldAsync,
        createField,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
    };
};

export const useGetFields = (formId: string) => {
    const {
        data: fields,
        error,
        isFetched,
        isFetching,
        isLoading,
        status,
    } = trpc.formFeild.getFormFeild.useQuery({formId})

    return {
        fields,
        error,
        isFetched,
        isFetching,
        isLoading,
        status,
    };
};
export const useUpdateFeild=(formID:string)=>{
    const utils = trpc.useUtils();
    const {mutateAsync:updateFeildAsync,mutate:updateFeild,isError,error,isIdle,isSuccess,status,isPending
       
}=trpc.updateFeild.updateFeild.useMutation({
        onSuccess:async(updatedFeild)=>{
            await utils.formFeild.getFormFeild.setData({formId:formID},(oldData)=>{
                if(!oldData) return oldData;

          

      return oldData.map((field) =>
        field.id === updatedFeild.id
          ? updatedFeild
          : field
        )

                

                }
            

            )
            
        }
})

    return{
        updateFeild,
        updateFeildAsync,
        isError,
        error,
        isIdle,
        isSuccess,
        status,
        isPending

    }
}


export const useDeleteFeild=(formID:string)=>{
    const utils=trpc.useUtils()

    const { mutateAsync: deleteFeildAsync,
    mutate: deleteFeild,
    error,
    isPending,
    isSuccess,
    status,}=trpc.delete.deleteFeild.useMutation({
        onSuccess:async(deletFeild)=>{
            await utils.formFeild.getFormFeild.setData({formId:formID},(oldData=>{
                if(!oldData) return oldData
              return  oldData.filter(e=>e.id!==deletFeild.id)
            

            }))


        }
    })

  return {
    deleteFeildAsync,
    deleteFeild,
    error,
    isPending,
    isSuccess,
    status,
  };


}