import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

import { updateBooking } from "../../services/apiBookings"


export default function useCheckout () {
  const queryClient = useQueryClient()

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, {
      status: 'checked-out'

    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryClient.invalidateQueries({ active: true })

    },

    onError: () => {
      toast.error('Error check out')
    }

  })
  return { checkout, isCheckingOut }
}

