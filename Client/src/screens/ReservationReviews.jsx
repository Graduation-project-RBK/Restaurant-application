import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { Colors } from "../contants";
import ReservationReviewList from './ReservationReviewList.jsx'
import axios from '../../services/axiosInterceptor.jsx';
import { useIsFocused } from '@react-navigation/native';
import { Display } from "../utils";
import { setReviewNotificationBadge } from "../../src/features/notificationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from "../../src/features/loggedinSlice.js";
import * as SecureStore from 'expo-secure-store';




export default function ReservationReviews({ navigation }) {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.loggedin);

    const [pending, setPending] = useState([])
    const [restaurants, setRestaurants] = useState([])

    const getPendingReviews = async () => {
        try {

            const { data } = await axios.get(`http://${apiUrl}:3000/api/reviews`)
            setPending(data)
        }
        catch (error) {
            console.log(error)

        }
    }


    const findRestaurantName = async () => {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            dispatch(setToken(token))
            try {

                const { data } = await axios.get(`http://${apiUrl}:3000/api/restaurants`)
                setRestaurants(data)

            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeNotificationBadge = async () => {
        try {
            const { data } = await axios.put(`http://${apiUrl}:3000/api/reservations/notification`);
            dispatch(setReviewNotificationBadge(data));
            console.log('removed')
        } catch (error) {
            console.log(error);
        }
    };

    const handleButtonPress = (reservation, restaurants) => {
        navigation.navigate("ReviewForm", { reservation, restaurants });
    };

    useEffect(() => {
        if (isFocused) {
            getPendingReviews()
            findRestaurantName()
            removeNotificationBadge()
        }
    }, [isFocused])


    return (

        <View style={styles.container}>
            {pending.length > 0 && (<ScrollView
                style={styles.constainer2}
                contentContainerStyle={styles.scrollViewContent}

            >
                {pending.map((reservation) => (
                    <View key={reservation.id} style={styles.card}
                    >

                        <ReservationReviewList reservation={reservation} restaurants={restaurants}
                            onPress={(reservation) => handleButtonPress(reservation, restaurants)} ></ReservationReviewList>
                    </View>
                ))}


            </ScrollView>
            )}
            {!pending.length && token && (
                <View style={styles.loginMessage}>

                    <Text style={styles.loginMessageText}>You don't have currently any reservations to review.</Text>
                </View>
            )}
            {!pending.length && !token && (
                <View style={styles.loginMessage}>

                    <Text style={styles.loginMessageText}>Log in to see your pending reservation reviews!</Text>
                </View>
            )}
            <View style={styles.topedite}></View>

        </View>
    )


}


const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,


    },
    constainer2: {
        flex: 1,
        backgroundColor: Colors.DARK_ONE,
        marginTop: -150,

    },
    topedite: {
        marginTop: 100,

    },
    scrollViewContent: {
        paddingVertical: 100,
    },
    card: {
        borderRadius: 10,
        margin: 5,
        padding: 2,
        width: Display.setWidth(90),
        marginBottom: 100,

    },
    loginMessage: {
        borderRadius: 10,
        margin: 5,
        padding: 2,
        marginTop: 350,
    },
    loginMessageText: {
        color: 'white',
        alignSelf: 'center'
    }
})