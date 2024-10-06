import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
    make: string;
    model: string;
    pricePerDay: number;
    extraKM: number;
    extraDriver: number;
    daysRented: number;
    totalPrice: number;
};

export default function ProceedPage() {
    const route = useRoute();
    const {
        make,
        model,
        pricePerDay,
        extraKM,
        extraDriver,
        daysRented,
        totalPrice,
    } = route.params as RouteParams;

    return (
        <View style={styles.container}>

            <Text style={styles.headerText}>Your Cart</Text>

            <View style={styles.cartItem}>
                <Image
                    source={require('../../assets/images/NotFound.png')}
                    style={styles.carImage}
                />
                <View style={styles.cartDetails}>
                    <Text style={styles.cartTitle}>{make} {model}</Text>
                    <Text style={styles.cartText}>{daysRented} x car rental</Text>
                    <Text style={styles.cartText}>
                        {daysRented > 1 ? `Total days: ${daysRented}` : "Total days: 1"}
                    </Text>
                </View>
                <Text style={styles.cartPrice}>{pricePerDay * daysRented} kr.</Text>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summary}>Extra km:</Text>
                    <Text style={styles.summary}>{extraKM} km</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summary}>Added drivers:</Text>
                    <Text style={styles.summary}>{extraDriver}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summary}>Tax 25%:</Text>
                    <Text style={styles.summary}>{((pricePerDay * daysRented) * 0.25).toFixed(2)} kr.</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summary}>Subtotal:</Text>
                    <Text style={styles.summaryTotalValue}>{totalPrice.toFixed(2)} kr.</Text>
                </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.checkoutIconButton}>
                    <Image source={require('../../assets/images/ticket.png')} style={styles.checkoutIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 20,
        width: screen.availWidth * 0.85,
        marginBottom: 20,
    },
    carImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    cartDetails: {
        flex: 1,
    },
    cartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartText: {
        fontSize: 14,
        color: '#777',
    },
    cartPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    summaryContainer: {
        width: screen.availWidth * 0.8,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    summary: {
        fontSize: 16,
        color: '#777',
    },
    summaryTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ddd',
        marginVertical: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    checkoutButton: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    checkoutIconButton: {
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 18,
        color: '#777',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    checkoutIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
});

