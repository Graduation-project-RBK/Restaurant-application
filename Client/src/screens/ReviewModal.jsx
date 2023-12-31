import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";
import StarRating from 'react-native-star-rating-widget';

const ReviewModal = ({ isVisible, reviews, onClose, customers }) => {

  const latestCustomer = (customerId) => customers.slice().find((customer) => {
    return customer.id === customerId
  })


  const sortedReviews = reviews.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const altProfileImage = require('../assets/images/icons8-customer-50.png')



  return (
    <Modal transparent={true} visible={isVisible}>
      <Pressable
        style={{ backgroundColor: "#000000aa", flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            {sortedReviews.map((review) => (
              <View style={styles.reviewContainer} key={review.id}>
                <View style={styles.header}>
                  <Text style={styles.reviewTitle}>{review.review_title}</Text>
                  <View style={styles.cardRating}>
                    <StarRating
                      rating={review.rating} starSize={25} enableHalfStar={true} starStyle={{ width: 10 }}
                      onChange={() => { return }} enableSwiping={false} />
                  </View>
                </View>
                <View style={styles.reviewDetails}>
                  <Image
                    source={latestCustomer(review.customerId)?.profilePic ? { uri: latestCustomer(review.customerId)?.profilePic } : altProfileImage}
                    style={styles.myImage} />
                  <Text style={styles.reviewAuthor}>{latestCustomer(review.customerId)?.fullname}</Text>
                </View>
                <Text style={styles.reviewBody}>{review.review_body}</Text>

              </View>
            ))}

          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={Colors.DARK_ONE} />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 24,
    borderRadius: 10,
    flex: 1,
  },
  myImage: {
    width: 30,
    height: 30,
    borderRadius: 16,
    marginRight: 5,
    backgroundColor: 'black'

  },
  reviewContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",

  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    maxWidth: '60%'
  },
  reviewBody: {
    color: "#666",
    marginBottom: 8,
    marginTop: 10,
    padding: 10


  },
  reviewAuthor: {
    fontStyle: "italic",
    color: "#888",
    color: "#666",
    fontWeight: '800',
    alignSelf: 'center'


  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  reviewLabel: {
    fontWeight: "500",
    marginRight: 5,
  },


  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  reviewDetails: {
    flexDirection: "row",
    marginBottom: 5,
    padding: 10

  },
});

export default ReviewModal;
