import Stat from './Stat'
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineReceiptPercent,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

export default function Stats({ bookings, confirmedStays, days, cabinCount }) {
  const numBookings = bookings.length
  const income = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  )
  const checkins = confirmedStays.length

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (days * cabinCount)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Income"
        color="green"
        value={income}
        icon={<HiOutlineCurrencyDollar />}
      />
      <Stat
        title="Checkins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="red"
        value={Math.round(occupancyRate * 100) + '%'}
        icon={<HiOutlineReceiptPercent />}
      />
    </>
  )
}
