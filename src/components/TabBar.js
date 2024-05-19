import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { TabBar } from "react-native-tab-view";

// customized TabBar

const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.DarkestBlue }}
      style={{ backgroundColor: "transparent", color: Colors.DarkestBlue, marginTop: 10 }}
      renderLabel={({ route, focused }) => (
        <Text style={styles.tabText}>{route.title}</Text>
      )}
    />
  );

// removes tabBar

const noTabBar = () => null;


const styles = StyleSheet.create({
    tabText: {
      fontSize: 11,
      fontFamily: 'Lato-Bold',
      color: Colors.DarkestBlue,
      textTransform: 'uppercase',
    }
  });

export {noTabBar, renderTabBar};

