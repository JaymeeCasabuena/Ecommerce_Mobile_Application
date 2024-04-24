import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";



export default function Categories () {
    return (
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GrayishWhite,
    }
})