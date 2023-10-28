import styled from "styled-components";

export const StyledForm = styled.form`
  
  // max-width: 350px;
  width: 400px;
  height: 300px;
  margin: 2rem auto;
  border: 1px solid #202122;
  box-sizing: border-box;
  border-radius: 5px;
  background: white;
  box-shadow: 1px 3px 10px #adadad;
  padding-left: 10px;

  h2 {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  button,
  input {
    display: flex;
    height: 35px;
    width: 90%;
    padding-top: 5px;
    padding-left: 10px;
    outline: none;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgb(36, 33, 33);
    margin-bottom: 1rem;

    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }

  button {
    cursor: pointer;
    background: #4b70e2;
    color: white;

    &:focus {
      border: none;
    }
  }

  p {
    font-size: 14px;
    color: red;
  }
`;
