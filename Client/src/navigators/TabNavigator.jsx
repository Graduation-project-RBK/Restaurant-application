import React from 'react'
import { StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Homescreen , ReservationListScreen, MessagesScreen, LoginScreen, RestaurantDetails} from '../screens'
import { AntDesign  } from '@expo/vector-icons'
import { Colors } from "../contants";
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
<Tab.Navigator
screenOptions={{
    headerShown: false,
    tabBarHideOnKeyboard:true, 
    tabBarShowLabel:false, 
    tabBarStyle:styles.tabBarStyle,

    
    topBarBackground:()=>(
        <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles}/>
    )
    }}>
    <Tab.Screen name="Home" component={Homescreen}options={{
        tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="home" size={24} color={focused?Colors.DEFAULT_RED : Colors.primaryLightGreyHex}/>
        )
    }}></Tab.Screen>

    <Tab.Screen name="Reservation" component={ReservationListScreen} options={{
        tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="calendar" size={24} color={focused?Colors.DEFAULT_RED : Colors.primaryLightGreyHex}/>
        )
    }}></Tab.Screen>
    <Tab.Screen name="Messages" component={MessagesScreen} options={{

        tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="message1" size={24} color={focused?Colors.DEFAULT_RED : Colors.primaryLightGreyHex}/>
        )
    }}></Tab.Screen>
    <Tab.Screen name="Login" component={LoginScreen}  options={{
        
        tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="login" size={24} color={focused?Colors.DEFAULT_RED : Colors.primaryLightGreyHex}/>
            
        )
    }} ></Tab.Screen>
    
</Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle:{
        height:90,
        position: 'absolute',
        backgroundColor: Colors.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent',
    },
    BlurViewStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})