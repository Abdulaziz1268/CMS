import { createStackNavigator} from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Loggin from '../Authentication/Loggin'
import Register from '../Authentication/Register'

const AuthRoute = ({handleLoggin}) => {
    const stack = createStackNavigator()
    return (
        <stack.Navigator
            initialRouteName='Loggin'
        >
            <stack.Screen name='Loggin' component={ props => <Loggin {...props} handleLoggin={handleLoggin} />} options={{ headerShown: false }} />
            <stack.Screen name='Register' component={Register} />

        </stack.Navigator>
    );
}
 
export default AuthRoute;