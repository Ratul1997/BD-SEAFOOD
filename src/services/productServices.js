import PromiseModules from '../helpers/PromiseModules'
const uploadProduct = async productData => {
  return new Promise(async (resolve, reject) => {
    try {
      const downloadLink = await PromiseModules.multipleFileUpload(
        [{path: productData.path}],
        'images',
      )
      const uploadedData = {
        uri: downloadLink?.[0]?.url ?? null,
        productName: productData.productName,
        amountPerUnit: productData.amountPerUnit,
        category: productData.category,

        order: productData.order,
      }
      await PromiseModules.storeDataInCollection('Products', null, uploadedData)
      resolve(uploadedData)
    } catch (error) {
      reject(error)
    }
  })
}
const updateProduct = async (productData, dockKey) => {
  return new Promise(async (resolve, reject) => {
    console.log(productData.path.includes('firebasestorage.googleapis.com'))
    try {
      const downloadLink = productData.path.includes(
        'firebasestorage.googleapis.com',
      )
        ? [{url: productData.path}]
        : await PromiseModules.multipleFileUpload(
            [{path: productData.path}],
            'images',
          )
      const uploadedData = {
        uri: productData.path.includes('firebasestorage.googleapis.com')
          ? productData.path
          : downloadLink?.[0]?.url ?? null,
        productName: productData.productName,
        amountPerUnit: productData.amountPerUnit,
        category: productData.category,
        order: productData.order,
      }
      await PromiseModules.updateDocumentsById(
        'Products',
        productData.id,
        uploadedData,
      )
      resolve(uploadedData)
    } catch (error) {
      reject(error)
    }
  })
}

const productServices = {
  uploadProduct,
  updateProduct,
}
export default productServices
