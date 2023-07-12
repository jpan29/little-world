import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestPerBooking,
    } = {},
  } = useSettings()

  const { isUpdating, updateSetting } = useUpdateSetting()
  const updateHandler = (e, field) => {
    if (!e.target.value) return
    updateSetting({ [field]: e.target.value })
  }
  if (isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'minBookingLength')}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'maxBookingLength')}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'maxGuestPerBooking')}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'breakfastPrice')}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
