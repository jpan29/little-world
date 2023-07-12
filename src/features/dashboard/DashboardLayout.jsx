import styled from 'styled-components'
import useRecentBookings from './useRecentBookings'
import Spinner from '../../ui/Spinner'
import useRecentStays from './useRecentStays'
import Stats from './Stats'
import { useCabins } from '../cabins/useCabins'
import DurationChart from './DurationChart'
import TodayActivity from '../check-in-out/TodayActivity'
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  margin: 5rem 2rem 2.4rem;
`

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings()
  const {
    stays,
    confirmedStays,
    days,
    isLoading: isLoading2,
  } = useRecentStays()
  const { cabins, isLoading: isLoading3 } = useCabins()

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        stays={stays}
        cabinCount={cabins.length}
        days={days}
      />

      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
    </StyledDashboardLayout>
  )
}