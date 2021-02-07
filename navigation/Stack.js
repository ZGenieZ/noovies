import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    // screenOptions : navigator에서 모든 screen에 대한 style을 정할 수 있는 prop
    screenOptions={{
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerTintColor: "white", // tintColor : 기본적으로 사용자가 보는 강조색(title 색이라고 알면 될듯?)
      headerBackTitleVisible: false, // 왼쪽 상단 위 뒤로 돌아가기 버튼에서 돌아가는 screen의 title 보이기 유무
    }}
  >
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);
