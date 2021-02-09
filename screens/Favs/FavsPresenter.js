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
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // 사용자가 커서를 움직였을 때
    onPanResponderMove: (evt, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: () => {
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
    },
  });

  return (
    <Container>
      {results.reverse().map((result, index) => {
        if (index === topIndex) {
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: 1,
                transform: [...position.getTranslateTransform()], //getTranslateTransform() => x와 y에 대해서 css 표현을 얻어내는 함수
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }} />
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={{
              ...styles,
            }}
            key={result.id}
            {...panResponder.panHandlers}
          >
            <Poster source={{ uri: apiImage(result.poster_path) }} />
          </Animated.View>
        );
      })}
    </Container>
  );
};
