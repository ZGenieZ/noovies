import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";
import Link from "../../components/Detail/Link";
import Poster from "../../components/Poster";
import ScrollContainer from "../../components/ScrollContainer";
import Votes from "../../components/Votes";
import { formatDate } from "../../utils";

const BG = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  position: absolute;
`;

const Header = styled.View`
  height: ${Dimensions.get("window").height / 3}px;
  align-items: center;
  justify-content: flex-end;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  top: 30px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Info = styled.View`
  width: 50%;
  margin-left: 40px;
`;

const Data = styled.View`
  margin-top: 30px;
  padding: 0px 30px;
`;

const DataName = styled.Text`
  margin-top: 30px;
  color: white;
  opacity: 0.8;
  font-weight: 800;
  margin-bottom: 10px;
`;

const DataValue = styled.Text`
  color: white;
  opacity: 0.8;
  font-weight: 500;
`;

// && 패턴을 쓰면 만약 false일시 {""} 가 되는데 앱에서 text는 반드시
// <Text> 안에 들어가야 하므로 오류가 발생한다. 따라서 이런 오류가 발생할 때는
// 삼항연산자를 써줘서 false일시 null을 return 하게 해야 한다.

export default ({ openBrowser, result, loading }) => (
  <ScrollContainer
    loading={false}
    contentContainerStyle={{ paddingBottom: 80 }}
  >
    <Header>
      <BG source={{ uri: apiImage(result.backgroundImage, "") }} />
      <Container>
        <Poster url={result.poster} />
        <Info>
          <Title>{result.title}</Title>
          {result.votes ? <Votes votes={result.votes} /> : null}
        </Info>
      </Container>
    </Header>
    <Data>
      {result.overview ? (
        <>
          <DataName>Overview</DataName>
          <DataValue>{result.overview}</DataValue>
        </>
      ) : null}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          color="white"
          size="small"
        />
      ) : null}
      {result.spoken_languages ? (
        <>
          <DataName>Languages</DataName>
          <DataValue>
            {result.spoken_languages.map((lan) => `${lan.name} `)}
          </DataValue>
        </>
      ) : null}
      {result.release_date ? (
        <>
          <DataName>Release Date</DataName>
          <DataValue>{formatDate(result.release_date)}</DataValue>
        </>
      ) : null}
      {result.status ? (
        <>
          <DataName>Status</DataName>
          <DataValue>{result.status}</DataValue>
        </>
      ) : null}
      {result.runtime ? (
        <>
          <DataName>Runtime</DataName>
          <DataValue>{result.runtime} minutes</DataValue>
        </>
      ) : null}
      {result.first_air_date ? (
        <>
          <DataName>First Air Date</DataName>
          <DataValue>{formatDate(result.first_air_date)}</DataValue>
        </>
      ) : null}
      {result.genres ? (
        <>
          <DataName>Genres</DataName>
          <DataValue>
            {result.genres.map((g, index) =>
              index === result.genres.length - 1 ? g.name : `${g.name}, `
            )}
          </DataValue>
        </>
      ) : null}
      {result.number_of_episodes ? (
        <>
          <DataName>Seasons / Episodes</DataName>
          <DataValue>
            {result.number_of_seasons} / {result.number_of_episodes}
          </DataValue>
        </>
      ) : null}
      {result.imdb_id ? (
        <>
          <DataName>Links</DataName>
          <Link
            text={"IMDB Page"}
            icon={"imdb"}
            onPress={() =>
              openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)
            }
          />
        </>
      ) : null}
      {result.videos.results?.length > 0 ? (
        <>
          <DataName>Videos</DataName>
          {result.videos.results.map((video) => (
            <Link
              text={video.name}
              key={video.id}
              icon="youtube-play"
              onPress={() =>
                openBrowser(`https://www.youtube.com/watch?v=${video.key}`)
              }
            />
          ))}
        </>
      ) : null}
    </Data>
  </ScrollContainer>
);
