import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { createOrEditCabin } from "../../services/apiCabins"
export const useCreateCabin = () => {
  const queryClient = useQueryClient()

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })

    },

    onError: (err) => {
      toast.error(err.message)
    },
  })
  return { isCreating, createCabin }
}