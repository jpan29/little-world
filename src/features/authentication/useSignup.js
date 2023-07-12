import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { signup as signupApi } from '../../services/apiAuth'

export default function useSignup () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      toast.success('Account successfully created')
      navigate('/', { replace: true })
    }
  })
  return { signup, isLoading }
}
