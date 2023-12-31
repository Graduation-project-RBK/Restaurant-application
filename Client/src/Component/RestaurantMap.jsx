import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const RestaurantMap = ({ latitude, longitude }) => {
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title="Restaurant Location"
                    description="This is the restaurant's location"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        height:400,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default RestaurantMap;
