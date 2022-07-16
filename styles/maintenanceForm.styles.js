import styled from '@emotion/styled';

const Container = styled.div`
  margin: auto;
  min-width: 1080px;
  max-width: 1080px;
  padding-top: 80px;
  padding-bottom: 50px;

  .sub-heading {
    font-size: 20px;
    font-weight: 900;
    padding: 20px 40px 40px 40px !important;
  }

  .form {
    padding: 0 40px 20px 40px;

    .label {
      font-weight: 900;
      margin-bottom: 10px;
    }

    .MuiFormControl-root {
      width: 100%;
    }

    .input-container {
      width: 100%;
      margin-right: 24px;
      margin-bottom: 40px;

      .counter-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .MuiFormControl-root {
          width: 54px;
          margin: 0 10px;
        }

        .MuiOutlinedInput-input {
          padding: 10px;
        }

        .MuiInputBase-root {
          font-size: 25px;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }

  .submit-container {
    padding: 40px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    p {
      color: black;
      font-size: 16px;
    }

    .MuiButtonBase-root {
      width: 220px;
      border-radius: 12px;
    }
  }

  .select-label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(40%, -50%);
    color: #b1b1b1;
    font-size: 17px;
  }
`;

export default Container;
