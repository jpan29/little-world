import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { createOrEditCabin } from "../../services/apiCabins"
export const useEditCabin = () => {
  const queryClient = useQueryClient()

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => createOrEditCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })

    },

    onError: (err) => {
      toast.error(err.message)
    },
  })
  return { isEditing, editCabin }
}