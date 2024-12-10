import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings = ({ handleLogout }) => {
    const logoutHandler = () => {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('fname')
        AsyncStorage.removeItem('role')
        handleLogout()
    }
    return ( 
        <View style={styles.settingContainer}>
            <TouchableOpacity style={styles.logoutContainer} onPress={logoutHandler}>
                <MaterialIcons style={styles.logout} name="logout" size={34} color="black" />
                <Text style={styles.logoutText}>logout </Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default Settings;

const styles = StyleSheet.create({
    settingContainer: {
        marginTop: 30,
        padding: 20
    },
    logoutContainer: {
        backgroundColor: 'lightgray',
        display: 'flex',
        flexDirection: 'row'
    },
    logout: {
        marginRight: 5
    },
    logoutText: {
        fontSize: 20
    }
})