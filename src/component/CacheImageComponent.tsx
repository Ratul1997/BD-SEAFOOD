import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
interface Props {
  url: string;
  styles?: object;
  resizeMode?: any;
}
export default function CacheImageComponent({
  url,
  styles,
  resizeMode = FastImage.resizeMode.cover,
}: Props) {
  return (
    <FastImage
      style={styles}
      source={{
        uri: url,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={resizeMode}
    />
  );
}
