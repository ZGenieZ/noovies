import { AppLoading } from "expo";
import { Asset } from "expo-asset"; // asset은 external module이다. expo-asset은 기본적으로 asset에 접근하게 해준다.
import React, { useState } from "react";
import { Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";

const cacheImages = (images) =>
  images.map((image) => {
    // images의 형태는 array이다.
    if (typeof image === "string") {
      // 만약 image의 형태가 url 이면 Image.prefetch(image)를 통해 이미지를 미리 다운로드 한다.
      return Image.prefetch(image);
    } else {
      // 만약 image의 형태가 module 이면 Asset.fromModule(image).downloadAsync()를 통해 이미지를 assets으로 접근하여 다운로드 한다.
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80",
      require("./assets/splash.png"),
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    // console.log(Promise.all([...images, ...fonts]));
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsReady(true);

  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  ) : (
    <AppLoading // splash screen을 보여준다.
      startAsync={loadAssets} // promise를 return 하는 function이다. 기본적으로 모든 걸 load 해줘야 하는 function이다.
      onError={console.error} // AppLoading에 Error가 발생할때 작동하는 function
      onFinish={onFinish} // AppLoading이 작업완료 되었을 때 작동하는 function
    />
  );
}
