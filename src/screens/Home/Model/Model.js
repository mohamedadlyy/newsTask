import AsyncStorage from "@react-native-community/async-storage";

export default class Model {
    static async GetNewsList(SearchTxt) {
        let apiKey =  'f1c214324c6c4f229e893bbec65316e1'
        let lan = await AsyncStorage.getItem("lan")
        var url = `https://newsapi.org/v2/everything?q=${SearchTxt}&sortBy=publishedAt&apiKey=${apiKey}`;
        console.log("url", url)
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(response => {
                console.log('GetNewsList response', response)
                return response
            })
            .catch(error => {
                console.log('error', error)
            });
    }
    
}

