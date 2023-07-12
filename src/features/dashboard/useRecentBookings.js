import { useMutation, useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"


export default function useRecentBookings () {
  const [searchParams] = useSearchParams()
  const days = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), days).toISOString()

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last=${days}`]

  })

  return { isLoading, bookings }
}

