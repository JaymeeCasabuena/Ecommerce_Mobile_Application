import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { TabView, SceneMap } from "react-native-tab-view";
import { noTabBar, renderTabBar } from "../components/TabBar";

const FirstPage = () => (
  <View style={styles.tabPage} />
);

const SecondPage = () => (
  <View style={styles.tabPage} />
);

const ThirdPage = () => (
  <View style={styles.tabPage} />
);

const FourthPage = () => (
  <View style={styles.tabPage} />
);

const renderScene = SceneMap({
  first: FirstPage,
  second: SecondPage,
  third: ThirdPage,
  fourth: FourthPage,
});

export default function Home() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Electronics" },
    { key: "second", title: "Jewelry" },
    { key: "third", title: "Men's Clothing" },
    { key: "fourth", title: "Women's Clothing" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.firstTabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={noTabBar}
        />
      </View>
      <View style={styles.secondTabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.GrayishWhite,
  },
  firstTabView: {
    flex: 1,
  },
  secondTabView: {
    flex: 2,
  },
  tabPage: {
    backgroundColor: Colors.PurplishBlue,
    height: 600,
  },
  tabText: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    color: Colors.DarkestBlue,
    textTransform: "uppercase",
  },
});
