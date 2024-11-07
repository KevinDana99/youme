import styled from "styled-components";

export const Container = styled.div`
  max-width: 350px;
  color: #69727d;
  position: relative;
`;
export const Label = styled.div`
  margin-bottom: 3px;
  height: 40px;
  line-height: 2;
  font-weight: 600;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  font-family: inherit;
  clear: both;
  float: none;
  width: 100%;
  margin-left: 0;
`;
export const Selector = styled.div`
  cursor: pointer;
  border: solid 1px #69727d;
  height: 16px;
  padding: 20px;
  font-family: "Lato", "Helvetica Neue", Arial, Verdana, sans-serif;
  color: #69727d;
  background-color: #f9fafa;
  border-radius: var(--forms-fields-border-radius, 0);
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  margin: 0;
  outline: 0;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

export const Abbr = styled.abbr`
  color: red;
  font-weight: 700;
  border: 0 !important;
  text-decoration: none;
  margin-left: 4px;
`;

export const Options = styled.div<{ visible: boolean }>`
  background-color: white;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  width: 100%;
  max-height: 300px;
  position: absolute;
`;

export const Option = styled.div`
  border-bottom: solid 0.1px #adacac7a;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-family: "Lato", "Helvetica Neue", Arial, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 400;
`;

export const Icon = styled.div`
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
