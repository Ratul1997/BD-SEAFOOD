import ImagePicker from 'react-native-image-crop-picker'
export const openImagePicker = async (isMultiple = false) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        multiple: isMultiple,
      })
      resolve(image)
    } catch (error) {
      reject(error)
    }
  })
}
