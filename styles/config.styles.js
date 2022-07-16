import styled from '@emotion/styled';
import theme from './theme';

const Container = styled.div`
  min-width: 90vw;
  max-width: 90vw;
  margin: auto;
  padding: 30px 0;

  .form-container {
    background: white;
    max-width: 1080px;
    min-width: 1080px;
    margin: auto;
    border-radius: 10px;

    .title {
      padding: 30px 0;
      opacity: 0.6;
      font-size: 17px;
      font-weight: 900;
      line-height: 25px;
      font-family: 'Roboto';
      text-align: center;
      margin-bottom: 30px;
    }

    .MuiFormControl-root {
      width: 100%;
    }

    .MuiStepper-root {
      padding: 0;
      padding: 0 30px;
    }

    .MuiInputBase-root {
      font-weight: 900;
      border-radius: 12px;
    }

    .MuiStepContent-root {
      border-left: 1px solid #e3e5e5;
    }

    .MuiStepLabel-label {
      font-size: 22px;
      margin-bottom: 5px;
      font-weight: 900;
      font-family: 'Titillium Web';
    }

    .MuiSelect-outlined {
      padding: 16px 18px;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: #e3e5e5;
    }

    .label {
      color: #0e0f0f;
      font-weight: 900;
      margin-bottom: 12px;
      font-family: 'Inter';
      font-size: 14px;
    }

    .select-label {
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translate(-15%, -50%);
      font-size: 17px;
      font-weight: 900;
    }

    .form-part {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 700px;

      .input-container {
        width: 100%;
        margin-right: 24px;

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

      .add-more-btn {
        color: ${theme.palette.byzantine.main};
        border: 3px solid ${theme.palette.byzantine.main};
        margin-top: 24px;
        font-size: 18px;
        width: 326px;
        border-radius: 12px;
        font-weight: 900;
        background: #f5f5f5;

        svg {
          font-size: 22px;
          margin-bottom: 3px;
          margin-right: 10px;
        }
      }
    }

    .MuiOutlinedInput-input {
      padding: 16px 18px;
    }

    .submit-container {
      padding: 40px;
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
  }

  .MuiStepConnector-vertical {
    span {
      border: none;
    }
  }
`;

export default Container;
