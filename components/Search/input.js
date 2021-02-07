import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  background-color: white;
  margin: 0px 30px;
  padding: 10px 20px;
  border-radius: 15px;
  margin-bottom: 50px;
`;

const Input = ({ placeholder, value, onChange, onSubmit }) => (
  // returnKeyType : 키보드에서 제출 버튼 타입을 정의 가능(done,go,next,search 등)
  // onChange 는 단순히 input이 바뀌는 것이고 onChangeText는 input의 텍스트가 바뀌는것(native에서는 onChangeText가 존재)
  // onSubmit 대신에 native 에서는 onSubmitEditing이 존재(사용자가 검색을 눌렀을 때 작동)
  <TextInput
    value={value}
    onChangeText={onChange}
    placeholder={placeholder}
    onSubmitEditing={onSubmit}
    returnKeyType={"search"}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Input;
