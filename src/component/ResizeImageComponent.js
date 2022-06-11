import React, {Component} from 'react'
import {Image, Pressable, Text} from 'react-native'
import {getDeviceScreenInfo} from '../config/utils'
import CacheImageComponent from './CacheImageComponent'

const [WIDTH, HEIGHT] = getDeviceScreenInfo()
export default class ResizeImageComponent extends Component {
  state = {
    heightScaled: HEIGHT,
    height: HEIGHT / 2.5,
    width: WIDTH - 40,
    aspectRatio: 1,
  }
  componentDidMount () {
    Image.getSize(this.props.url, (width, height) => {
      const ratio = (WIDTH - 40) / width
      this.setState({
        // width: WIDTH - 40,
        // height: (height - 200) * ratio,
        // ratio: width / (height - 100),
        aspectRatio: width / height,
      })
    })
  }
  render () {
    const {onPress, url} = this.props
    const {aspectRatio} = this.state
    return (
      <Pressable
        style={{
          width: WIDTH - 20,
          height: undefined,
          aspectRatio: aspectRatio,
        }}
        onPress={onPress}>
        <CacheImageComponent
          styles={{width: '100%', height: '100%', flex: 1, alignSelf: 'center'}}
          url={url}
        />
      </Pressable>
    )
  }
}
