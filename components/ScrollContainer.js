import React, { useState } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";

const ScrollContainer = ({
  refreshFn,
  loading,
  children,
  contentContainerStyle,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setTimeout(() => setRefreshing(false), 5000);
  };
  // 웹은 자동으로 스크롤 바가 생기는 반면 모바일에서는 그렇지 않음. 따라서 Mobile Device에서 Scroll 기능을 사용할 수 있게 해줌.
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={"white"}
        />
      } // 당겨서 새로고침 기능을 구현해줌
      style={{
        backgroundColor: "black",
      }}
      contentContainerStyle={{
        flex: loading ? 1 : "auto",
        justifyContent: loading ? "center" : "flex-start",
        ...contentContainerStyle,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" /> // ActivityIndicator : 로딩될때 돌아가는 화면 표시
      ) : (
        children
      )}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  refreshFn: PropTypes.func,
};

export default ScrollContainer;
