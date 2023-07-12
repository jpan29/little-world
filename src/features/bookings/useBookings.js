import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getBookings } from "../../services/apiBookings"
import { PAGE_SIZE } from "../../utils/constants"

export const useBookings = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  //filter
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all'
    ? null
    : { field: 'status', value: filterValue }


  //sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, order] = sortByRaw.split('-')
  const sortBy = { field, order }


  //pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))


  const {
    isLoading,
    data: bookings = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  //pre-fetching
  const pageCount = Math.ceil(bookings.count / PAGE_SIZE)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
  }

  return { isLoading, bookings, error }
}