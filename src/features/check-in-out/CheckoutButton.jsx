import Button from '../../ui/Button'
import useCheckout from './useCheckout'
function CheckoutButton({ bookingId }) {
  const { checkout, isLoading } = useCheckout()

  return (
    <Button
      onClick={() => checkout(bookingId)}
      variation="primary"
      size="small"
      disabled={isLoading}>
      Check out
    </Button>
  )
}

export default CheckoutButton
