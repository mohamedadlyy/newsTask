import React from 'react';
import { View , Dimensions, ActivityIndicator} from 'react-native';
import { AppColor } from './Styles';
const { width, height } = Dimensions.get('window');

const Loading = () => (
  <View>
    <View style={{
      height: height, width: width, justifyContent: 'center',
      alignSelf: 'center', backgroundColor: '#fff', opacity: 0.3
    }}>
    </View>
    <View style={{
      position: 'absolute',
      backgroundColor: AppColor, alignSelf: 'center', marginTop: height / 3 +100,
      borderRadius: 10, justifyContent: 'center', height: 80, width: 80,zIndex:1000
    }}>
      <ActivityIndicator size="large" color="#fff" style={{
        alignSelf: 'center',
      }} />
    </View>
  </View >
);
export default Loading;