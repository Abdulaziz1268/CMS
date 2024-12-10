import { ImageBackground, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Toaster, toast } from 'sonner-native'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
    const handleToast = () => {
        toast.error('hurrah')
    }
    return ( 
        <GestureHandlerRootView>
        <View style={styles.homeContainer}>
            <ImageBackground
                source={require('../assets/mobile-home.png')}
                style={styles.background}
            >
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.button} onPress={()=> handleToast()}>
                        <Text style={styles.buttonText}>+ Add</Text>
                    </TouchableOpacity>
                </View>
                <Toaster position="bottom-center"/>
                <Text style={styles.homeHeader}>WELCOME{'\n'}       TO</Text>
                <Text style={styles.homeHeaderName}>CMS</Text>
            </ImageBackground>
        </View>
        </GestureHandlerRootView>
     );
}
 
export default Home;

const styles = StyleSheet.create({
    background: {
        height: '100%'
    },
    homeHeader: {
        fontSize: 40,
        color: '#005ccc',
        fontFamily: 'serif',
        marginLeft: 20,
        marginTop: 100
    },
    homeHeaderName: {
        fontSize: 90,
        color: '#005ccc',
        fontFamily: 'serif',
        marginLeft: 20,
    },
    topBar: {
        marginTop: 30,
        height: 50,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        width: 80,
        height: 40,
        backgroundColor: '#005ccc',
        borderRadius: 30,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    buttonText: {
        color: 'white'
    }
})