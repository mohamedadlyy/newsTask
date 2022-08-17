import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, BackHandler, Modal, I18nManager } from "react-native";
import { screenHeight, appFont, AppColor, appFontSemiBold, BrownColor, screenWidth, burble, appFontBold, placeHolder, medium, Red, borderColor, DarkGrey, TextGrayColor, backgroundColor } from "../../../components/Styles";
import { Button, Container, Left, Right, Switch } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../../../components/Loading'
import { strings } from '../../i18n'
import Footer from '../../../components/Footer'
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import Header from '../../../components/Header';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            ModalVisible: false,
            lan: '',

        }

    }
    setModalVisible() {
        this.setState({ ModalVisible: !this.state.ModalVisible })
    }
    set_en() {
        this.setState({
            lan: 'en',
        })
        AsyncStorage.setItem('lan', 'en')
        I18nManager.forceRTL(false);
        RNRestart.Restart();
    }

    set_ar() {
        this.setState({
            lan: 'ar',
        })
        AsyncStorage.setItem('lan', 'ar')
        I18nManager.forceRTL(true);
        RNRestart.Restart();
    }
    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigation.goBack()
                return true;
            });
        })
    }





    render() {
        if (this.state.Loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <Container style={{ backgroundColor: backgroundColor }}>
                    <Header title={(strings('lang.setting'))} back={() => this.props.navigation.goBack()} />
                    <ScrollView showsVerticalScrollIndicator={false}>


                        <View style={{ width: "90%", alignSelf: "center", justifyContent: "center", flexDirection: "column" }}>
                            <Button onPress={() => this.setModalVisible()} transparent block style={{ width: "100%", height: 50, flexDirection: "row", justifyContent: "center", }}>
                                <Left style={{ flexDirection: "row" }}>
                                    <Image style={styles.icon} source={require('../../../images/lan.png')} />
                                    <Text style={styles.title}>{(strings('lang.Language'))}</Text>
                                </Left>
                                <Right style={styles.rightView}>
                                    <Text style={styles.valueTxt}>{I18nManager.isRTL ? "عربي" : "english"}</Text>
                                    <TouchableOpacity>
                                        <Image style={styles.backIcon} source={require('../../../images/back.png')} />
                                    </TouchableOpacity>
                                </Right>
                            </Button>
                            <View>
                            </View>






                        </View>
                    </ScrollView>
                    <Footer current="Settings" navigation={this.props.navigation} />
                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={this.state.ModalVisible}
                    >

                        <Button transparent onPress={() => this.setModalVisible()} style={{ backgroundColor: '#000', opacity: 0.5, width: screenWidth, height: screenHeight }} >
                        </Button>

                        <View style={styles.modal}>
                            <Text style={styles.text}>{strings('lang.Change Language')}</Text>

                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginVertical: '5%', width: '85%', }}>
                                <Button style={styles.buttonContainer} onPress={() => { this.setModalVisible(); this.set_en() }}>
                                    <Text style={styles.buttonText}>English</Text>
                                </Button>
                                <Button style={styles.buttonContainer2} onPress={() => { this.setModalVisible(); this.set_ar() }}>
                                    <Text style={styles.buttonText2}>العربية</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>

                </Container>

            )
        }
    }
}


const styles = StyleSheet.create({
    backIcon:
    {
        width: 10, height: 10, alignSelf: "center",
        resizeMode: "contain", tintColor: "#000", marginTop: 2
    },
    icon:
    {
        width: 20, height: 20, resizeMode: "contain",
        alignSelf: "center", marginHorizontal: 5
    },
    title:
    {
        fontFamily: appFont, textAlign: "left", fontSize: medium, color: TextGrayColor
    },
    valueTxt:
    {
        fontFamily: appFont, textAlign: "center", fontSize: medium, color: placeHolder, alignSelf: 'center', marginHorizontal: 3
    },
    rightView:
    {
        flexDirection: "row", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        width: screenWidth / 1.3,
        height: screenHeight / 4.5,
        position: 'absolute',
        top: screenHeight / 2.6,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: "center"
    },
    text: {
        fontFamily: appFontBold,
        color: AppColor,
        fontSize: screenWidth / 22,
        marginTop: '4%'
    },
    buttonContainer: {
        width: screenWidth / 4,
        height: 50,
        backgroundColor: AppColor,
        alignSelf: 'center',
        marginHorizontal: 5,
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center',
        padding: 12,
        marginTop: 7,
    },
    buttonContainer2: {
        width: screenWidth / 4,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: AppColor,
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontFamily: appFontBold,
        fontSize: screenWidth / 28
    },
    buttonText2: {
        color: AppColor, marginVertical: 5,
        alignSelf: 'center', fontSize: screenWidth / 25, fontFamily: 'Cairo-Bold'
    },
});

