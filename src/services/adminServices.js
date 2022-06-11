import PromiseModules from '../helpers/PromiseModules'

const uploadOffers = async offerData => {
  return new Promise(async (resolve, reject) => {
    try {
      const downloadLink = await PromiseModules.multipleFileUpload(
        [{path: offerData.path}],
        'images',
      )
      const uploadedData = {
        uri: downloadLink?.[0]?.url ?? null,
        createdAt: new Date(),
      }
      await PromiseModules.storeDataInCollection('Offers', null, uploadedData)
      resolve(uploadedData)
    } catch (error) {
      reject(error)
    }
  })
}

const adminServices = {
  uploadOffers,
}
export default adminServices
