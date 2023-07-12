import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { updateCurrentUser } from '../../services/apiAuth'

export default function useUpdateUser () {
  const queryClient = useQueryClient()
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      // queryClient.setQueryData('user', user)
      toast.success('Account successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  })
  return { updateUser, isLoading }
}
