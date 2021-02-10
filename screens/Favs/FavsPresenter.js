import React, { useState } from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;

const styles = {
  top: 80,
  height: HEIGHT / 1.5,
  width: "90%",
  position: "absolute",
};

const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

export default ({ results }) => {
  const [topIndex, setTopIndex] = useState(0);
  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // 사용자가 커서를 움직였을 때
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 250) {
        // dx값이 300 이상일 때 화면에서 손을 떼면 카드를 오른쪽으로 버린다.
        Animated.spring(position, {
          toValue: {
            x: WIDTH + 100,
            y: dy,
          },
        }).start(nextCard); // start()는 callback을 갖게 해준다. 따라서 nextCard라는 index 증가 함수를 만들어서 callback으로 지정하게 한다.
      } else if (dx <= -250) {
        // dx값이 -300 이하일 때 화면에서 손을 떼면 카드를 왼쪽으로 버린다.
        Animated.spring(position, {
          toValue: {
            x: -WIDTH - 100,
            y: dy,
          },
        }).start(nextCard);
      }
      // 그 이외의 상황에서는 다시 카드를 원상태로 복귀하게 한다.
      else {
        // Animated.spring()은 어떤 값을 가지면, 그걸 애니메이션으로 만든다.
        // 즉, 값을 애니메이션처럼 천천히 0으로 바뀌게 만든다.
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          // 드래그 후 놨을 때 원래 포지션으로 돌아가면서 얼마나 바운스 효과를 줄건지
          // bounciness: 10,
        }).start();
      }
    },
  });
  // interpolate: input 값을 다른 output값으로 설정 가능
  const rotationValues = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp", // extrapolate: "clamp" => interpolate에 제한을 건다.
  });
  const secondCardOpacity = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.2, 1],
    extrapolate: "clamp", // extrapolate: "clamp" => interpolate에 제한을 건다.
  });
  const secondCardScale = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp", // extrapolate: "clamp" => interpolate에 제한을 건다.
  });
  return (
    <Container>
      {results.map((result, index) => {
        // 버려진 카드는 더이상 Rendering 되지 않게 작업(최적화)
        if (index < topIndex) {
          return null;
        }
        if (index === topIndex) {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: 1,
                transform: [
                  { rotate: rotationValues },
                  ...position.getTranslateTransform(),
                ], //getTranslateTransform() => x와 y에 대해서 css 표현을 얻어내는 함수
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        } else if (index === topIndex + 1) {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: secondCardOpacity,
                transform: [{ scale: secondCardScale }],
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: 0,
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        }
      })}
    </Container>
  );
};
