import React, {Component} from 'react'
import {Text, View, TextInput} from 'react-native'
import {Colors} from '../config/colors'
import {getFontFamily, shadows} from '../helpers/styles/customStyles'
export default class CustomTextInput extends Component {
  render () {
    const {
      Icon,
      title,
      placeholder,
      iconName,
      onChangeText,
      size,
      securedText,
      value,
      numberOfLines,
      multiline,
      disabled,
      iconOnPress,
      leftIcon,
      onTextLayout,
      maxLength,
    } = this.props
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          marginVertical: 1,
        }}>
        {title && (
          <Text
            style={{
              color: 'black',
              marginVertical: 5,
              fontFamily: getFontFamily(),
            }}>
            {title}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 5,
            justifyContent: 'space-between',
            borderRadius: 5,
            borderColor: Colors.lightBlack,
            borderWidth: 0.5,
          }}>
          {leftIcon && Icon && (
            <Icon
              name={iconName}
              color='gray'
              size={size}
              style={{width: '6%'}}
              onPress={iconOnPress}
            />
          )}
          <TextInput
            placeholder={placeholder}
            style={{
              height: multiline ? 100 : 50,
              width: '94%',
              alignSelf: 'center',
              color: 'black',
              opacity: 1,
              textAlignVertical: multiline ? 'top' : 'center',
              fontFamily: getFontFamily(),
            }}
            numberOfLines={numberOfLines ?? 1}
            onChangeText={onChangeText}
            secureTextEntry={securedText}
            value={value}
            multiline={multiline}
            editable={disabled}
            onTextLayout={onTextLayout}
            maxLength={maxLength}
          />
          {!leftIcon && Icon && (
            <Icon
              name={iconName}
              color='gray'
              size={size}
              style={{width: '6%'}}
              onPress={iconOnPress}
            />
          )}
        </View>
      </View>
    )
  }
}
