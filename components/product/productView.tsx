import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

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

    const [startDay, setStartDay] = useState("01");
    const [startMonth, setStartMonth] = useState("01");
    const [startYear, setStartYear] = useState("2024");

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);

    const incrementKM = () => setExtraKM(extraKM + 1);
    const decrementKM = () => extraKM > 0 && setExtraKM(extraKM - 1);

    const incrementDriver = () => setExtraDriver(extraDriver + 1);
    const decrementDriver = () => extraDriver > 0 && setExtraDriver(extraDriver - 1);

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() + i).toString());

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{make} {model}</Text>

                {/* Main image */}
                <Image source={require('../../assets/images/NotFound.png')} style={styles.mainImage} />

                {/* Smaller pictures */}
                <View style={styles.thumbnailContainer}>
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                    <Image source={require('../../assets/images/NotFound.png')} style={styles.thumbnail} />
                </View>

                <Text>Year: {year}</Text>
                <Text>Color: {color}</Text>
                <Text>Price Per Day: {pricePerDay}</Text>
                <Text>Availability: {isAvailable ? 'Available' : 'Not Available'}</Text>

                {/* Date Selection Area */}
                <View style={styles.dateContainer}>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => {
                            setShowStartDatePicker(true);
                        }}
                    >
                        <Text>
                            {startDay}/{startMonth}/{startYear}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Start Date Picker Modal */}
                <Modal
                    visible={showStartDatePicker}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setShowStartDatePicker(false)}
                >
                    <View style={styles.fullScreenModal}>
                        <Text style={styles.modalTitle}>Select Start Date</Text>
                        <View style={styles.pickerContainer}>
                            {/* Day Picker */}
                            <Picker
                                selectedValue={startDay}
                                onValueChange={(itemValue) => setStartDay(itemValue)}
                                style={styles.picker}
                            >
                                {days.map((day) => (
                                    <Picker.Item key={day} label={day} value={day} />
                                ))}
                            </Picker>

                            {/* Month Picker */}
                            <Picker
                                selectedValue={startMonth}
                                onValueChange={(itemValue) => setStartMonth(itemValue)}
                                style={styles.picker}
                            >
                                {months.map((month) => (
                                    <Picker.Item key={month} label={month} value={month} />
                                ))}
                            </Picker>

                            {/* Year Picker */}
                            <Picker
                                selectedValue={startYear}
                                onValueChange={(itemValue) => setStartYear(itemValue)}
                                style={styles.picker}
                            >
                                {years.map((year) => (
                                    <Picker.Item key={year} label={year} value={year} />
                                ))}
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowStartDatePicker(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* Extra KM and Driver Options */}
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.counterButton} onPress={decrementKM}>
                        <Text style={styles.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Add an extra 100 km: {extraKM}</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={incrementKM}>
                        <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.counterButton} onPress={decrementDriver}>
                        <Text style={styles.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.optionText}>Extra driver: {extraDriver}</Text>
                    <TouchableOpacity style={styles.counterButton} onPress={incrementDriver}>
                        <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        width: 160,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
    },
    fullScreenModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    picker: {
        width: '30%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#007BFF',
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    counterButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        borderRadius: 5,
    },
    counterButtonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    optionText: {
        marginHorizontal: 15,
        fontSize: 16,
    },
    proceedButton: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: "#333",
        borderRadius: 10,
    },
    proceedButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
