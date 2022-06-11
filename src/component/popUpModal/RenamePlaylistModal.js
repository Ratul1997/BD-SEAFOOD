import React, {useCallback, useState} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {getFontFamily} from '../../helpers/styles/customStyles'

const RenamePlaylistModal = ({
  isVisible,
  onOkPress,
  onCancelPress,
  title = 'Update Playlist Name',
  okBtnLabel = 'Save',
  cancelBtnLabel = 'Cancel',
  onChangeText,
  value,
  placeholder,
}) => {
  const [duplicateError, setDuplicateError] = useState(false)
  const [zeroLengthError, setZeroLengthError] = useState(false)
  const [isConfirmationModalOpen, setConfirmationModal] = useState(false)

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      presentationStyle='overFullScreen'>
      <Pressable style={styles.centeredView} onPress={onCancelPress}>
        <View style={[styles.modalView]}>
          <View style={styles.modalViewTopContainer}>
            <Text style={[styles.modalText, {color: '#FFFFFF'}]}>{title}</Text>
          </View>

          <View
            style={[
              {
                ...styles.contentContainerStyle,
                height: duplicateError || zeroLengthError ? 80 : 60,
                paddingHorizontal: 20,
              },
            ]}>
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  borderWidth: 0.4,
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor='#AAAAAA'
              onChangeText={onChangeText}
              value={value}
            />
          </View>
          <View opacity={0.35} style={{...styles.lineStyle, marginTop: 10}} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={onCancelPress}>
              <Text style={[{...styles.textStyle, fontWeight: 'normal'}]}>
                {cancelBtnLabel}
              </Text>
            </TouchableOpacity>

            <View opacity={0.35} style={styles.buttonDivStyle} />

            <TouchableOpacity style={styles.buttonStyle} onPress={onOkPress}>
              <Text style={[{...styles.textStyle, fontWeight: 'bold'}]}>
                {okBtnLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
export default RenamePlaylistModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 'auto',
    margin: 20,
    backgroundColor: '#4082FF',
    borderRadius: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  modalViewTopContainer: {
    padding: 15,
  },
  contentContainerStyle: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  lineStyle: {
    height: 1,
    width: 300,
    backgroundColor: '#C4C4C4',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  buttonStyle: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDivStyle: {
    height: 50,
    width: 1,
    backgroundColor: '#C4C4C4',
  },
  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: 'transparent',
    paddingTop: 7,
    paddingBottom: 7,
  },
  listItemSelectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: '#00FAFF',
    paddingTop: 7,
    paddingBottom: 7,
  },
  selectImageStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    right: 30,
    top: 15,
  },
  textInputStyle: {
    minHeight: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: getFontFamily(),
    fontSize: RFValue(12),
    color: 'black',
  },
})
