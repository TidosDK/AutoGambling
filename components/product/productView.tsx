import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Calendar, DateObject } from 'react-native-calendars';

type RouteParams = {
    make: string;
    model: string;
    year: number;
    color: string;
    pricePerDay: number;
    isAvailable: boolean;
};

export default function ProductView() {
    const route = useRoute();
    const {
        make,
        model,
        year,
        color,
        pricePerDay,
        isAvailable,
    } = route.params as RouteParams;

    const [extraKM, setExtraKM] = useState(0);
    const [extraDriver, setExtraDriver] = useState(0);

    const extra_km_cost = 100;
    const extra_driver_cost = 150;

    const [totalPrice, setTotalPrice] = useState(0);

    const [selectedRange, setSelectedRange] = useState<{ [date: string]: { startingDay?: boolean; endingDay?: boolean; color: string } }>({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDayPress = (day: DateObject) => {
        const selectedDate = day.dateString;

        if (Object.keys(selectedRange).length === 0) {
            setSelectedRange({
                [selectedDate]: { startingDay: true, endingDay: true, color: "#70d7c7" },
            });
        } else {
            const dates = Object.keys(selectedRange);
            const startDate = dates[0];
            const daysDifference = new Date(selectedDate).getTime() - new Date(startDate).getTime();

            if (daysDifference < 0) {
                setSelectedRange({
                    [selectedDate]: { startingDay: true, endingDay: true, color: "#70d7c7" },
                });
            } else {
                const newRange = {};
                let currentDate = new Date(startDate);
                for (let i = 0; i <= daysDifference / (1000 * 60 * 60 * 24); i++) {
                    const formattedDate = currentDate.toISOString().split("T")[0];
                    newRange[formattedDate] = {
                        startingDay: i === 0,
                        endingDay: i === daysDifference / (1000 * 60 * 60 * 24),
                        color: "#70d7c7",
                    };
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setSelectedRange(newRange);
            }
        }
    };

    const openDatePicker = () => {
        setSelectedRange({});
        setShowDatePicker(true);
    };

    const calculateTotalDays = () => {
        const dates = Object.keys(selectedRange);
        if (dates.length > 1) {
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[dates.length - 1]);
            return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        }
        return 1;
    };

    const daysRented = calculateTotalDays();

    const calculateTotalPrice = () => {
        const numberOfDays = calculateTotalDays();
        const kmCost = (extraKM / 100) * extra_km_cost; /* divide by 100 to offset the 100 extra kilometers added */
        const driverCost = extraDriver > 0 ? extraDriver * extra_driver_cost * numberOfDays : 0;
        const dayCost = numberOfDays > 0 ? pricePerDay * numberOfDays : 0;
        const tax = (kmCost + driverCost + dayCost) * 0.25;
        return kmCost + driverCost + dayCost + tax;
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [extraKM, extraDriver, selectedRange]);

    const incrementKM = () => setExtraKM(extraKM + 100);
    const decrementKM = () => extraKM > 0 && setExtraKM(extraKM - 100);

    const incrementDriver = () => setExtraDriver(extraDriver + 1);
    const decrementDriver = () => extraDriver > 0 && setExtraDriver(extraDriver - 1);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{make} {model}</Text>

                <Image source={require('../../assets/images/NotFound.png')} style={styles.mainImage} />

                <View style={styles.thumbnailContainer}>
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                </View>



                <View style={styles.priceContainer}>
                    <View style={styles.textRow}>
                    <Text style={styles.infoLabel}>Year:</Text>
                        <Text style={styles.infoValue}>{year}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Color:</Text>
                        <Text style={styles.infoValue}>{color}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Price per day:</Text>
                        <Text style={styles.infoValue}>{pricePerDay} DKK</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Avaliability:</Text>
                        <Text style={styles.infoValue}>{isAvailable ? 'Avaliable' : 'Not Available'}</Text>
                    </View>
                </View>

                <View style={styles.dateContainer}>
                    <TouchableOpacity style={styles.dateInput} onPress={openDatePicker}>
                        <Text>
                            {Object.keys(selectedRange).length > 0
                                ? `${formatDate(Object.keys(selectedRange)[0])} to ${formatDate(Object.keys(selectedRange)[Object.keys(selectedRange).length - 1])}`
                                : "Select Dates"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={showDatePicker}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <View style={styles.fullScreenModal}>
                        <Text style={styles.modalTitle}>Choose Dates</Text>
                        <Calendar
                            markingType={'period'}
                            markedDates={selectedRange}
                            onDayPress={handleDayPress}
                            theme={{
                                textSectionTitleColor: "#b6c1cd",
                                selectedDayBackgroundColor: "#50cebb",
                                selectedDayTextColor: "#ffffff",
                                todayTextColor: "#00adf5",
                                dayTextColor: "#2d4150",
                                textDisabledColor: "#d9e1e8",
                                arrowColor: "#50cebb",
                                disabledArrowColor: "#d9e1e8",
                                monthTextColor: "#50cebb",
                                indicatorColor: "#50cebb",
                                textDayFontFamily: "monospace",
                                textMonthFontFamily: "monospace",
                                textDayHeaderFontFamily: "monospace",
                                textDayFontWeight: "300",
                                textMonthFontWeight: "bold",
                                textDayHeaderFontWeight: "300",
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16,
                            }}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={() => setShowDatePicker(false)} color="#FF6347" />
                            <Button title="OK" onPress={() => setShowDatePicker(false)} color="#50cebb" />
                        </View>
                    </View>
                </Modal>

                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.counterButton} onPress={decrementKM}>
                        <Image source={require('../../assets/images/minus.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionText}>Extra km: {extraKM}</Text>

                    </View>
                    <TouchableOpacity style={styles.counterButton} onPress={incrementKM}>
                        <Image source={require('../../assets/images/plus.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.counterButton} onPress={decrementDriver}>
                        <Image source={require('../../assets/images/minus.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionText}>Additional driver: {extraDriver}</Text>

                    </View>
                    <TouchableOpacity style={styles.counterButton} onPress={incrementDriver}>
                        <Image source={require('../../assets/images/plus.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.priceContainer}>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Added km:</Text>
                        <Text style={styles.infoValue}>{extraKM}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Added drivers:</Text>
                        <Text style={styles.infoValue}>{extraDriver}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Number of days:</Text>
                        <Text style={styles.infoValue}>{daysRented}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.infoLabel}>Tax:</Text>
                        <Text style={styles.infoValue}>25%</Text>
                    </View>
                    <View style={[styles.textRow, { marginTop: 10 }]}>
                        <Text style={[styles.infoLabel, styles.totalLabel]}>Total Price:</Text>
                        <Text style={[styles.infoValue, styles.totalValue]}>{totalPrice} DKK</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.proceedButton}>
                    <Text style={styles.proceedButtonText}>PROCEED</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    mainImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    thumbnailContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    dateContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        width: screen.availWidth * 0.8,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        marginVertical: 5,
        alignItems: "center"
    },
    fullScreenModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 20,
    },
    counterButton: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        borderRadius: 20,
    },
    counterButtonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: screen.availWidth * 0.8,
        marginBottom: 15,
    },
    optionTextWrapper: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: "#e6e6e6",
        borderRadius: 20,
        height: 50,
        justifyContent: "center",
    },
    optionText: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 18,
    },
    proceedButton: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: "#333",
        borderRadius: 20,
        width: screen.availWidth * 0.8,
        alignItems: "center",
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: "contain",
    },
    priceContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        width: screen.availWidth * 0.8,
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
    },
    infoLabel: {
        fontSize: 15,
        color: "#333",
        flex: 1,
        textAlign: "left",
    },
    infoValue: {
        fontSize: 15,
        color: "#333",
        textAlign: "right",
    },
    totalLabel: {
        fontWeight: "bold",
    },
    totalValue: {
        fontWeight: "bold",
        color: "#000",
    },
});
