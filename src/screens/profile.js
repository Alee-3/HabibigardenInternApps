import React, { Component } from 'react';
import {
    Text,
    View,
    StatusBar,
    Image,
} from 'react-native';
import styles from '../styles';

export default class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Sistem Pakar',
            headerTitleStyle: {
                flex: 1,
                fontFamily: 'Lato-Bold',
                fontWeight: '300',
                color: '#ffffff',
            },
            headerStyle: {
                backgroundColor: '#30ccbc',
                shadowColor: 'transparent',
                elevation: 1,
            },
            headerTintColor: 'white',
            // headerLeft: (
            //     <Image
            //         source={require('../assets/logo_hg.png')}
            //         style={{ marginLeft: 20, height: 33, width: 33 }}
            //     />
            // ),
            // headerRight: (
            //     <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
            //         <TouchableOpacity style={styles.btnCamera} onPress={() => Linking.openURL('market://details?id=com.xiaomi.smarthome&launch=true')}>
            //             <FontAwesome5 size={15} name={'video'} solid />
            //         </TouchableOpacity>
            //     </View>
            // ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <StatusBar backgroundColor="#2ab7a8" barStyle="light-content" />
                <View style={[styles.card, { padding: 20 }]}>
                    <Image
                        style={{ height: 100, width: 100, marginBottom: 20 }}
                        source={require('../assets/under-construction.png')} />
                    <Text style={[styles.txtBold, { textAlign: 'center' }]}>Mohon maaf, menu ini sedang dalam pengembangan.</Text>
                </View>
            </View>
        );
    }
}
