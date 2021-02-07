import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Platform } from "react-native";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native"; // 자꾸 getFocusedRouteNameFromRoute 쓰래서 오류해결하기 위해 임시로 넣음

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
  //   route.state?.routeNames[route.state.index] || "Movies";  // 자꾸 getFocusedRouteNameFromRoute 쓰래서 오류해결하기 위해 임시로 넣음
  getFocusedRouteNameFromRoute(route) || "Movies";

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ title: getHeaderName(route) });
  }, [route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "Movies") {
            iconName += "film";
          } else if (route.name === "Tv") {
            iconName += "tv";
          } else if (route.name === "Search") {
            iconName += "search";
          } else if (route.name === "Discovery") {
            iconName += "heart";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "white" : "grey"}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false, // 메뉴 바에 라벨(movies,tv,search..)를 보여주지 않음
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Movies" component={Movies} />
      <Tabs.Screen name="Tv" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Discovery" component={Favs} />
    </Tabs.Navigator>
  );
};
