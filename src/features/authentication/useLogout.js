import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { logout as logoutApi } from "../../services/apiAuth"

export default function useLogout () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login', { replace: true })
    },
    onError: () => {
      toast.error("Logout error")
    }
  })
  return { logout, isLoading }
}
