import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ComplaintList from './components/complaintList'
import Home from './components/Home';
import Setting from './components/Setting'

const App = () => {
  const Tab = createBottomTabNavigator()
  return(
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="ComplaintList" component={ComplaintList} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;


const styles = StyleSheet.create({

})