import { TouchableOpacity } from "react-native-gesture-handler"
import Feather from '@expo/vector-icons/Feather'


const CustomNavIcon = ({ onPress, iconName, color, size }) => {

return (
    <TouchableOpacity onPress={onPress} style={{marginLeft: 10, marginRight: 10}}>
        <Feather color={color} size={size} name={iconName} />
    </TouchableOpacity>
)

}


export default CustomNavIcon;