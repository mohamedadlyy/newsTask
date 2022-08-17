import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, BackHandler, RefreshControl, I18nManager, Platform, FlatList } from "react-native";
import { screenWidth, appFontBold, appFont, grey, AppColor, DarkGrey, backgroundColor, borderColor } from "../../../components/Styles";
import { Container, Input, Toast } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../components/Loading'
import { strings } from '../../i18n'
import Model from '../Model/Model'
import Footer from '../../../components/Footer';
import News from '../../../components/News';
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            refreshing: false,
            SearchTxt: 'Egypt',
            NewsList: []
        }
    }


    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp()
                return true;
            });
        })
    }

    async componentDidMount() {
        this.GetNewsList(this.state.SearchTxt)
    }

    _onRefresh = () => {
        this.GetNewsList(this.state.SearchTxt)
        this.setState({ refreshing: false })
    }

    async GetNewsList(searchTxt) {
        this.setState({ Loading: true })
        let NewsList = await Model.GetNewsList(searchTxt);
        if (NewsList.status == 'ok') {
            this.setState({ Loading: false, NewsList: NewsList.articles })
        } else {
            this.setState({ Loading: false, })
            Toast.show({
                position: "top", type: "success",
                text: (strings('lang.No_Results')), textStyle: { color: "#fff", textAlign: 'center', fontFamily: appFont },
                duration: 3000,
                style: { backgroundColor: 'red', width: "60%", alignSelf: "center", borderRadius: 10 }
            })
        }
    }


    async search(txt) {
        this.setState({ SearchTxt: txt })
        let NewsList = await Model.GetNewsList(txt);
        if (NewsList.status == 'ok') {
            this.setState({ Loading: false, NewsList: NewsList.articles })
        } else {
            this.setState({ Loading: false, NewsList: [] })
        }
    }


    render() {
        if (this.state.Loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <Container style={{ backgroundColor: backgroundColor }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{(strings('lang.Last News'))}</Text>
                    </View>
                    <View style={styles.input} >
                        <View style={styles.searchContainer}>
                            <Image source={require("../../../images/s.png")} style={{ alignSelf: "center", resizeMode: "contain", width: 25, height: 25, tintColor: "#fff" }} />
                        </View>
                        <Input value={this.state.SearchTxt} onChangeText={(text) => this.search(text)}
                            placeholderTextColor={grey} placeholder={'Search'}
                            style={styles.inputText}
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        <View style={styles.container}>
                            <View style={{ width: "100%", marginTop: "2%" }}>
                                {this.state.NewsList.length > 0 ?
                                    <FlatList
                                        data={this.state.NewsList}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <News news={item} key={index} navigation={this.props.navigation} />
                                            )
                                        }} />
                                    :
                                    <View style={{ justifyContent: "center", alignSelf: "center" }}>
                                        <Text style={styles.txt}>{(strings('lang.No_Results'))}</Text>
                                    </View>

                                }

                            </View>
                        </View>
                    </ScrollView>
                    <Footer current="Home" navigation={this.props.navigation} />
                </Container>

            )
        }
    }
}


const styles = StyleSheet.create({
    header: {
        width: "95%", flexDirection: "row", justifyContent: "flex-start", height: 60, alignContent: 'center',
        alignItems: 'center', paddingHorizontal: "5%", marginTop: Platform.OS == 'ios' ? '4%' : '2%'
    },
    title: {
        fontFamily: appFontBold, fontSize: screenWidth / 22, color: AppColor
    },
    searchContainer: {
        width: "15%", height: "100%", backgroundColor: AppColor, justifyContent: "center", borderRadius: 3
    },
    input: {
        height: 45, borderWidth: 1, borderRadius: 5, borderColor: borderColor, flexDirection: 'row', justifyContent: 'center',
        width: "90%", marginVertical: 5, backgroundColor: "#fff", alignSelf: 'center'
    },

    inputText: {
        textAlign: I18nManager.isRTL ? 'right' : 'left', color: DarkGrey, width: '100%', fontFamily: appFont,
        fontSize: screenWidth / 30, alignSelf: 'center'
    },
    container: { width: "95%", alignSelf: 'center', flexDirection: "column" },
    txt: { fontFamily: appFontBold, textAlign: "center", alignSelf: "center" }


});

