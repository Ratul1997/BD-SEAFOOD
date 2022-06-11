import firestore from '@react-native-firebase/firestore'
import {authenticationStatus} from '../../constants/authenticationStatus'
import {getUserId} from '../utils'
import auth from '@react-native-firebase/auth'

const emailSignUp = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth().createUserWithEmailAndPassword(email, password)
      resolve({user, additionalUserInfo})
    } catch (err) {
      let error = {
        status: authenticationStatus.SOMETHING_WENT_WRONG,
        msg: 'Something went wrong!',
      }
      if (err.code === 'auth/email-already-in-use') {
        error = {
          status: authenticationStatus.EMAIL_ALREADY_EXISTS,
          msg: 'That email address is already in use!',
        }
      }
      if (err.code === 'auth/invalid-email') {
        error = {
          status: authenticationStatus.INVALID_EMAIL_PASSWORD,
          msg: 'That email address is already in use!',
        }
      }
      console.log(err)
      reject(error)
    }
  })
}

const emailSignIn = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        additionalUserInfo,
        user,
      } = await auth().signInWithEmailAndPassword(email, password)
      const isNewUser = additionalUserInfo.isNewUser
      resolve({isNewUser, user, additionalUserInfo})
    } catch (err) {
      const error = {
        status: authenticationStatus.INVALID_EMAIL_PASSWORD,
        msg: 'Invalid email or password!',
      }
      reject(error)
    }
  })
}

const storeUserInfo = async (data, uid) => {
  return await firestore()
    .collection('Users')
    .doc(uid)
    .set({
      ...data,
    })
}

const getUserInfo = async uid => {
  return new Promise(async (resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          resolve({userData: documentSnapshot.data()})
        } else {
          reject({
            error: {
              status: authenticationStatus.INVALID_USER,
              msg: 'Invalid User',
            },
          })
        }
      })
      .catch(error => {
        const err = {
          status: authenticationStatus.SOMETHING_WENT_WRONG,
          msg: 'Something went wrong!',
        }
        reject(err)
      })
  })
}

const signOut = async (type = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth().signOut()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const sendEmailVerification = () => {
  auth().currentUser.sendEmailVerification()
}

const passwordReset = async email => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth().sendPasswordResetEmail(email)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
const userServices = {
  emailSignUp,
  storeUserInfo,
  emailSignIn,
  getUserInfo,
  signOut,
  sendEmailVerification,
  passwordReset,
}

export default userServices
