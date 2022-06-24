import {View, Text} from 'react-native';
import React from 'react';
import {theme} from '../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function CustomView(props: any) {
  return (
    <View style={{flex: 1, backgroundColor: theme.backgroundColor}}>
      <SafeAreaView
      edges={['bottom', 'left', 'right']} 
        style={[
          {
            flex: 1,
            backgroundColor: theme.backgroundColor,
          },
          props.style,
        ]}>
        {props.children}
      </SafeAreaView>
    </View>
  );
}
