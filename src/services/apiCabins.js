import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async () => {

  const { data, error } = await supabase
    .from('cabins')
    .select('*')
  if (error) {
    console.error(error)
    throw new Error("Cabins could not be loaded")
  }
  return data


}

export const deleteCabin = async (id) => {

  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }

}

export const createOrEditCabin = async (cabin, id = null) => {

  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${cabin.image.name}`.replace('/', '')
  const imagePath = hasImagePath ?
    cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins')

  if (!id) query = query.insert([{ ...cabin, image: imagePath }])

  if (id) query = query.update({ ...cabin, image: imagePath })
    .eq('id', id)




  const { data, error } = await query.select().single()
  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }


  //upload image
  if (hasImagePath) return data

  const { error: uploadError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabin.image)
  // delete the cabin if there is uploading error
  if (uploadError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(error)
    throw new Error("Cabin image could not be uploaded")
  }
  return data
}



