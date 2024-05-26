import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { TabBar } from "react-native-tab-view";

// customized TabBar

const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.Peach }}
      style={{ backgroundColor: Colors.PurplishBlue, color: Colors.White, marginTop: 10 }}
      renderLabel={({ route, focused }) => (
        <Text style={styles.tabText}>{route.title}</Text>
      )}
    />
  );

// removes tabBar

const noTabBar = () => null;


const styles = StyleSheet.create({
    tabText: {
      fontSize: 12,
      fontFamily: 'Poppins-SemiBold',
      color: Colors.White,
      textTransform: "capitalize",
    }
  });

export {noTabBar, renderTabBar};

