import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { updateBooking } from "../../services/apiBookings"


export default function useCheckin () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (id) => updateBooking(id, {
      status: 'checked-in',
      isPaid: true
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ active: true })
      navigate('/')
    },

    onError: () => {
      toast.error('Error check in')
    }

  })
  return { checkin, isCheckingIn }
}
