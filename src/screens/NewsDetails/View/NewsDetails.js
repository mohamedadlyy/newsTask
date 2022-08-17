import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { screenHeight, appFont, AppColor, BrownColor, backgroundColor, appFontBold, placeHolder, Small, DarkGrey } from "../../../components/Styles";
import { Container, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { strings } from '../../i18n'
import Header from '../../../components/Header';
import FastImage from 'react-native-fast-image'
import moment from 'moment';

export default class NewsDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

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
        let news = this.props.navigation.getParam("news")
        return (
            <Container style={{ backgroundColor: backgroundColor }}>
                <Header title={(strings('lang.Details'))} back={() => this.props.navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.containerView}>
                        <Text style={styles.title}>{news.title}</Text>
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: news.urlToImage ? news.urlToImage : '',
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ width: "50%", justifyContent: "flex-start", flexDirection: "row" }}>
                                <Text style={styles.label}>{(strings('lang.author'))} : </Text>
                                <Text style={[styles.label, { color: DarkGrey }]}>{news.author}</Text>
                            </View>

                            <View style={{ width: "50%", justifyContent: "flex-end", flexDirection: "row" }}>
                                <Text style={styles.label}>{(strings('lang.publishedAt'))} : </Text>
                                <Text style={[styles.label, { color: DarkGrey }]}>{news.publishedAt ? moment(news.publishedAt).format('L') : ''}</Text>
                            </View>
                        </View>

                        <Text style={styles.desc}>{news.description}</Text>

                    </View>

                </ScrollView>
            </Container>

        )
    }
}


const styles = StyleSheet.create({
    containerView: {
        width: "100%", alignSelf: "center", justifyContent: "flex-start", paddingHorizontal: "4%", marginTop: "2%"
    },
    title: {
        fontFamily: appFontBold, textAlign: "left", color: AppColor, marginTop: "5%", lineHeight: 20
    },
    img: {
        width: '100%', height: screenHeight / 4, borderRadius: 5, borderWidth: 1, borderColor: 'transparent', alignSelf: "center", marginTop: "2%"
    },
    label: {
        fontFamily: appFont, textAlign: "left", color: '#000', fontSize: Small
    },
    desc: {
        fontFamily: appFontBold, textAlign: "left", color: DarkGrey, marginTop: "5%", lineHeight: 20
    }


});

