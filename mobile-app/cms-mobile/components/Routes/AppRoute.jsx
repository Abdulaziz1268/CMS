import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ComplaintList from "../complaintList"
import Home from "../Home"
import Setting from "../Setting"
import Dashboard from "../Dashboard"
import { useEffect, useState } from "react"

const AppRoute = ({ handleLogout }) => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    setRole(AsyncStorage.getItem("role"))
  }, [])

  const Tab = createBottomTabNavigator()
  console.log(AsyncStorage.getItem("role"))
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon

          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline"
          } else if (route.name === "ComplaintList") {
            icon = focused ? "list" : "list-outline"
          } else if (route.name === "Dashboard") {
            icon = focused ? "view-dashboard" : "view-dashboard-outline"
          } else {
            icon = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={icon} color={color} size={size} />
        },
        tabBarActiveTintColor: "#005ccc",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {role === "admin" && (
        <Tab.Screen name="Dashboard" component={Dashboard} />
      )}
      <Tab.Screen
        name="ComplaintList"
        component={ComplaintList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={() => <Setting handleLogout={handleLogout} />}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default AppRoute

const styles = StyleSheet.create({})
