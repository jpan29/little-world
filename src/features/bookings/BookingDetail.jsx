import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Empty from '../../ui/Empty'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import { HiMiniCheckCircle } from 'react-icons/hi2'
import useCheckout from '../check-in-out/useCheckout'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const navigate = useNavigate()
  const { checkout, isCheckingOut } = useCheckout()
  const moveBack = useMoveBack()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isLoading) return <Spinner />
  if (!booking) return <Empty />
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}
        {booking.status === 'checked-in' && (
          <Button
            icon={<HiMiniCheckCircle />}
            onClick={() => checkout(booking.id)}
            disabled={isCheckingOut}>
            Check out
          </Button>
        )}
        {/* <Button variation="secondary" onClick={moveBack}>
          Back
        </Button> */}
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
