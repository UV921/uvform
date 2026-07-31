import { trpc } from "~/trpc/client";

export function useCreateForm() {
  const utils = trpc.useUtils();
  const {
    mutate: createFormAsync,
    mutateAsync: createForm,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.listFormById.invalidate();
    },
  });
  return {
    createFormAsync,
    createForm,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
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

export function useEditForm() {
  const utils = trpc.useUtils();
  const {
    mutate: editForm,
    mutateAsync: editFormAsync,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
  } = trpc.editForm.updateForm.useMutation({
    onSuccess: async (updatedForm) => {
      utils.form.listFormById.setData(undefined, (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((form) => (form.id === updatedForm.id ? updatedForm : form));
      });
    },
  });
  return {
    editForm,
    editFormAsync,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
  };
}

export function useDeleteForm() {
  const utils = trpc.useUtils();
  const {
    mutate: deleteForm,
    mutateAsync: deleteFormAsync,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
  } = trpc.deleteForm.delete.useMutation({
    onSuccess: async (deletedForm) => {
      utils.form.listFormById.setData(undefined, (oldData) => {
        if (!oldData) return oldData;

        return oldData.filter((feild) => feild.id !== deletedForm.id);
      });
    },
  });
  return {
    deleteFormAsync,
    deleteForm,
    isError,
    error,
    isIdle,
    isSuccess,
    isPending,
    status,
  };
}
