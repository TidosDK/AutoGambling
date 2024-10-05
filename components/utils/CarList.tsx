import { FlatList } from "react-native";
import CarItem from './CarItem';
import CarJSONData from '../../assets/cars/cars.json';


export default function CarList() {
    return (
        <FlatList
        data={CarJSONData}
        renderItem={({ item }) => (
                <CarItem
                    id={item.id.toString()}
                    make={item.make}
                    model={item.model}
                    year={item.year}
                    color={item.color}
                    pricePerDay={item.pricePerDay}
                    isAvailable={item.isAvailable}
                />
            )}
        />
    )
}
