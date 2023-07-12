import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'

import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabin

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editId ? editValues : {},
  })

  const { errors } = formState
  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (editId)
      editCabin(
        { cabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
  }
  const onError = (errors) => {
    // console.log(errors)
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: editId ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {editId ? 'Update cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
