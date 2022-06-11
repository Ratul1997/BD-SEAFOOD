import React, {Component} from 'react'
import {Text, View} from 'react-native'
import LeftArrow from '../assets/icons/ic_arrow_left.svg'
import Hand from '../assets/icons/ic_hand_outlined.svg'
import HandSolid from '../assets/icons/ic_hand_solid.svg'
import CommentIcon from '../assets/icons/ic_comment.svg'
import SendIcon from '../assets/icons/ic_send.svg'
import ThreeDot from '../assets/icons/ic_three_dot.svg'
import LeftArrowPoint from '../assets/icons/ic_arrow_left_point.svg'
import Feather from '../assets/icons/ic_feather.svg'
import Fire from '../assets/icons/ic_fire_2.svg'
import Lightining from '../assets/icons/ic_lighiting.svg'
import Diamond from '../assets/icons/ic_diamond.svg'
import PlusCircle from '../assets/icons/ic_plus_circle.svg'
import Image from '../assets/icons/ic_image.svg'
import Camera from '../assets/icons/ic_camera.svg'
import Person from '../assets/icons/ic_person.svg'
import Download from '../assets/icons/ic_download.svg'
import Food from '../assets/icons/ic_food.svg'
import HeartFilled from '../assets/icons/ic_heart_filled.svg'
import HeartOutLined from '../assets/icons/ic_heart_unfilled.svg'
import Medal from '../assets/icons/ic_medal.svg'
import Play from '../assets/icons/ic_play.svg'
import Profile from '../assets/icons/ic_profile.svg'
import Social from '../assets/icons/ic_social.svg'
import WorkOut from '../assets/icons/ic_workout.svg'
import Notification from '../assets/icons/ic_notification.svg'
import Snow from '../assets/icons/ic_cool.svg'
import Pin from '../assets/icons/ic_pin.svg'
import Settings from '../assets/icons/ic_settings.svg'
import SingleTick from '../assets/icons/ic_single_tick.svg'
import At from '../assets/icons/ic_at.svg'
import Lock from '../assets/icons/ic_lock.svg'
import UnLock from '../assets/icons/ic_unlock.svg'
import Pause from '../assets/icons/ic_pause.svg'
import Cross from '../assets/icons/ic_circle_cross.svg'
import Clock from '../assets/icons/ic_clock.svg'
import Trophy from '../assets/icons/ic_trophy.svg'
import Star from '../assets/icons/ic_star.svg'
import Check from '../assets/icons/ic_check.svg'
import Fullscreen from '../assets/icons/ic_fullscreen.svg'
import Search from '../assets/icons/ic_search.svg'
import DoubleCheck from '../assets/icons/ic_double_check.svg'
import Message from '../assets/icons/ic_message.svg'
import DietPlan from '../assets/icons/ic_diet_plan.svg'
import CrossPlain from '../assets/icons/ic_cross.svg'
import Default from '../assets/icons/default.svg'
import Plus from '../assets/icons/ic_plus.svg'
import Minus from '../assets/icons/ic_minus.svg'
import ShoppingBag from '../assets/icons/ic_shopping_bag.svg'
import Bin from '../assets/icons/ic_bin.svg'
import Share from '../assets/icons/ic_share.svg'
import Logout from '../assets/icons/ic_logout.svg'
import Upload from '../assets/icons/ic_upload.svg'
import NotePad from '../assets/icons/ic_notepad.svg'
import Transfer from '../assets/icons/ic_transfer.svg'
import HelpCenter from '../assets/icons/ic_help_center.svg'
const CustomIcon = ({name, color, size, customStyle = {}}) => {
  const getIcon = iconName => {
    switch (iconName) {
      case 'ic_help_center':
        return HelpCenter
      case 'ic_transfer':
        return Transfer
      case 'ic_notepad':
        return NotePad
      case 'ic_upload':
        return Upload
      case 'ic_logout':
        return Logout
      case 'ic_share':
        return Share
      case 'ic_bin':
        return Bin
      case 'ic_shopping_bag':
        return ShoppingBag
      case 'ic_minus':
        return Minus
      case 'ic_plus':
        return Plus
      case 'ic_diet_plan':
        return DietPlan
      case 'ic_clock':
        return Clock
      case 'ic_fullscreen':
        return Fullscreen
      case 'ic_circle_cross':
        return Cross
      case 'ic_pause':
        return Pause
      case 'ic_lock':
        return Lock
      case 'ic_unlock':
        return UnLock
      case 'ic_at':
        return At
      case 'ic_single_tick':
        return SingleTick
      case 'ic_cool':
        return Snow
      case 'ic_notification':
        return Notification
      case 'ic_pin':
        return Pin
      case 'ic_settings':
        return Settings
      case 'ic_download':
        return Download
      case 'ic_food':
        return Food
      case 'ic_heart_solid':
        return HeartFilled
      case 'ic_heart_outlined':
        return HeartOutLined
      case 'ic_medal':
        return Medal
      case 'ic_play':
        return Play
      case 'ic_profile':
        return Profile
      case 'ic_social':
        return Social
      case 'ic_workout':
        return WorkOut
      case 'ic_arrow_left':
        return LeftArrow
      case 'ic_hand_outlined':
        return Hand
      case 'ic_hand_solid':
        return HandSolid
      case 'ic_comment':
        return CommentIcon
      case 'ic_send':
        return SendIcon
      case 'ic_three_dot':
        return ThreeDot
      case 'ic_arrow_left_point':
        return LeftArrowPoint
      case 'ic_feather':
        return Feather
      case 'ic_diamond':
        return Diamond
      case 'ic_fire_2':
        return Fire
      case 'ic_lighiting':
        return Lightining
      case 'ic_plus_circle':
        return PlusCircle
      case 'ic_camera':
        return Camera
      case 'ic_image':
        return Image
      case 'ic_person':
        return Person
      case 'ic_trophy':
        return Trophy
      case 'ic_star':
        return Star
      case 'ic_check':
        return Check
      case 'ic_search':
        return Search
      case 'ic_double_check':
        return DoubleCheck
      case 'ic_message':
        return Message
      case 'ic_cross':
        return CrossPlain
      default:
        return Default
    }
  }
  const Icon = getIcon(name)
  return !name ? null : (
    <Icon color={color} height={size} width={size} style={customStyle} />
  )
}

export default CustomIcon
