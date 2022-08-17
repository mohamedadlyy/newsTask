import React, { Component } from 'react';
import { I18nManager,  View, Text } from "react-native";
import RNRestart from 'react-native-restart';
import AsyncStorage from "@react-native-community/async-storage";
import { appFontBold, screenHeight, screenWidth } from '../components/Styles';
import { Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../screens/i18n'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: '',

    }
  }

  async componentDidMount() {
    this.LoadInitialState()
  }


  LoadInitialState = async () => {
    let lan = await AsyncStorage.getItem('lan')
    if (lan != null) {
        this.props.navigation.navigate('Home')
    } else {
      AsyncStorage.setItem('lan', 'en')
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      RNRestart.Restart();
        this.props.navigation.navigate('Home')

    }


  }

  render() {
    return (
      <Container style={{ justifyContent: "center" }}>
        <View style={{ width: screenWidth, height: screenHeight, justifyContent: "center" }}>
          <LinearGradient colors={['#4a7fc3','#688fc6', '#053e85',]} start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }} style={{ width: screenWidth, height: screenHeight, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#fff", fontFamily: appFontBold ,fontSize:screenWidth/22}}>{(strings('lang.NewsApp'))}</Text>
          </LinearGradient>
        </View>
      </Container>
    )
  }
}

