import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

const updateDependentDocuments = (
  collectionName,
  conditionKey,
  conditionValue,
  updatedData,
) => {
  return new Promise(async (resolve, reject) => {
    const ref = firestore().collection(collectionName)

    try {
      const querySnapShot = await ref
        .where(conditionKey, '==', conditionValue)
        .get()
      querySnapShot.docs.map(doc => {
        ref.doc(doc.id).update({
          ...updatedData,
        })
      })
      resolve('Updated')
    } catch (error) {
      reject(error)
    }
  })
}

const updateDocumentsById = async (
  collectionName,
  documentKey,
  updatedData,
) => {
  const ref = firestore()
    .collection(collectionName)
    .doc(documentKey)
  return await ref.update({
    ...updatedData,
  })
}

const storeDataInCollection = async (
  collectionName,
  documentKey = null,
  storedData,
) => {
  const ref = documentKey
    ? firestore()
        .collection(collectionName)
        .doc(documentKey)
    : firestore().collection(collectionName)
  return documentKey
    ? await ref.set(
        {
          ...storedData,
        },
        {merge: true},
      )
    : await ref.add({...storedData})
}
const getDataByCollection = async (
  collectionName,
  keyName = null,
  keyValue = null,
  orderBy = null,
  type = 'asc',
) => {
  let ref = firestore().collection(collectionName)
  ref = keyValue ? ref.where(keyName, '==', keyValue) : ref
  ref = orderBy ? ref.orderBy(orderBy, type) : ref
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapShot = await ref.get()
      const datas = querySnapShot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      resolve(datas)
    } catch (error) {
      reject(error)
    }
  })
}

const getDataByDoc = async (collectionName, docId) => {
  return new Promise(async (resolve, reject) => {
    firestore()
      .collection(collectionName)
      .doc(docId)
      .get()
      .then(snapshot => {
        resolve({...snapshot.data(), id: docId})
      })
      .catch(err => {
        reject(err)
      })
  })
}

const removeMultipleDocByKey = async (collectionName, keyName, keyValue) => {
  const query = firestore()
    .collection(collectionName)
    .where(keyName, '==', keyValue)
  return new Promise((resolve, reject) => {
    query
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => doc.ref.delete())
        resolve('Removed')
      })
      .catch(error => reject(error))
  })
}

const removeDocument = async (collectionName, docId) => {
  return await firestore()
    .collection(collectionName)
    .doc(docId)
    .delete()
}
const multipleFileUpload = async (files, type) => {
  return await Promise.all(
    files.map(async file => {
      const uri = file.path

      const fileName =
        new Date().getTime().toString() + uri.split(/['/',]+/).pop()
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

      const task = storage()
        .ref(`${type}/${fileName}`)
        .putFile(uploadUri)
      const url = await new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          snapshot => {
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          },
          error => reject(error),
          async () => {
            try {
              const downloadUrl = await getImageDownloadLink(type, fileName)
              resolve(downloadUrl)
            } catch (error) {
              reject(error)
            }
          },
        )
      })

      return {url}
    }),
  )
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const getImageDownloadLink = async (path, filePath) => {
  await delay(7000)
  return await storage()
    .ref(`${path}/${filePath}`)
    .getDownloadURL()
}

const PromiseModules = {
  updateDependentDocuments,
  updateDocumentsById,
  getDataByCollection,
  getDataByDoc,
  removeMultipleDocByKey,
  removeDocument,
  multipleFileUpload,
  storeDataInCollection,
}

export default PromiseModules
