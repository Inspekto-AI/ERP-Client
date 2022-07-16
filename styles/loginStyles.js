import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  background: ${theme.palette.royalBlue.main};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-form {
    margin-top: 50px;
    background: white;
    padding: 50px 40px;

    .title {
      color: ${theme.palette.grey.grey100};
    }

    .MuiOutlinedInput-root {
      border-radius: ${theme.root.borderRadius};
    }

    .MuiOutlinedInput-input {
      padding: 14px;
    }

    .MuiButtonBase-root {
      width: 100%;
    }

    .MuiFormControl-root {
      width: 100%;
    }

    .forgot {
      margin-top: 20px;

      span {
        font-weight: 900;
      }
    }
  }
`;

export default Container;
