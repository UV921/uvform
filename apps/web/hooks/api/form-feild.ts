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