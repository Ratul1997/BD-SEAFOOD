import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Colors, theme} from '../config/colors'
import {getFontFamily} from '../helpers/styles/customStyles'

export default class CustomButton extends Component {
  render () {
    const {
      bordered,
      filled,
      onPress,
      title,
      fontSize,
      fontWeight,
      width,
      padding,
      borderRadius,
      borderWidth,
      customStyle,
      isLoading = false,
      disabled,
    } = this.props
    const borders = bordered
      ? {
          borderColor: 'white',
          borderWidth: borderWidth ?? 1,
        }
      : {}
    const backgroundColors = filled
      ? {
          backgroundColor: theme.primaryColor,
        }
      : {
          backgroundColor: 'transparent',
        }
    const styles = customStyle ?? {}
    return (
      <TouchableOpacity
        style={[
          {
            width: width ?? '48%',
            borderRadius: borderRadius ?? 20,
            padding: padding ?? 10,
            justifyContent: 'center',
            alignItems: 'center',
            ...borders,
            ...backgroundColors,
            opacity: isLoading ? 0.5 : 1,
          },
          styles,
        ]}
        disabled={isLoading === true || disabled === true ? true : false}
        onPress={isLoading ? null : onPress}>
        {isLoading ? (
          <ActivityIndicator color='white' size='small' />
        ) : (
          <Text
            style={{
              color: Colors.white,
              fontSize: fontSize ?? 15,
              fontFamily: getFontFamily(),
              fontWeight: fontWeight ?? '500',
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    )
  }
}
