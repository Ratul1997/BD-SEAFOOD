import {View, Text, Pressable, Share, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import CacheImageComponent from '../../component/CacheImageComponent'
import {getDeviceScreenInfo} from '../../config/utils'
import {Colors, theme} from '../../config/colors'
import {RFValue} from 'react-native-responsive-fontsize'
import CustomIcon from '../../component/CustomIcon'

const [WIDTH, HEIGHT] = getDeviceScreenInfo()
export default function OfferItem ({
  item,
  navigation,
  isAdmin = false,
  onDelete,
  index,
}) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item.uri,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <Pressable
      style={{
        alignSelf: 'center',
        marginVertical: 10,
        width: WIDTH - 40,
        height: HEIGHT / 3,
      }}>
      <CacheImageComponent
        styles={{width: '100%', height: '100%', flex: 1, alignSelf: 'center'}}
        url={item.uri}
      />
      {isAdmin && (
        <TouchableOpacity
          style={{
            padding: 5,
            borderColor: Colors.lightPurple,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 50,
            bottom: 10,
            backgroundColor: Colors.lightPurple,
          }}
          onPress={onDelete}>
          <CustomIcon name='ic_bin' size={RFValue(20)} color={'red'} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          padding: 5,
          borderColor: Colors.lightPurple,
          borderRadius: 10,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          right: 10,
          bottom: 10,
          backgroundColor: Colors.lightPurple,
        }}
        onPress={onShare}>
        <CustomIcon
          name='ic_share'
          size={RFValue(20)}
          color={theme.primaryColor}
        />
      </TouchableOpacity>
    </Pressable>
  )
}
