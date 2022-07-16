import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  min-width: 800px;
  max-width: 800px;
  margin: auto;
  padding-top: 80px;

  .defect {
    display: flex;

    .stepper {
      position: relative;

      .thumb {
        width: 70px;
        height: 70px;
        background: #efde48;
        border-radius: 100px;
        margin: 0 25px;
        margin-top: 3px;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .vr {
        height: 100%;
        width: 2px;
        opacity: 0.16;
        background: #b6b6b6;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 0;
        margin-top: 3px;
      }
    }

    .title {
      font-size: 16px;
      font-weight: 900;
      text-align: right;
      opacity: 0.6;
      min-width: 70px;
    }
  }

  .defect > .title {
    padding-top: 27px;
  }

  .image {
    display: flex;
    align-items: flex-start;

    .image-container {
      position: relative;
      width: 120px;
      aspect-ratio: 1.5/1;
      margin: 2px 24px 14px 0;
    }

    .time {
      font-weight: 400;
    }
  }

  .notification {
    min-width: 80%;
    padding-bottom: 35px;

    .info-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      color: black;
      padding: 10px 30px;
      border-radius: 10px;
      min-width: 80%;
      margin-bottom: 35px;

      .title {
        text-align: left;
        color: black;
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: 900;
        opacity: 1;
      }

      .sub-title {
        font-size: 15px;
      }

      .count {
        font-size: 25px;
        font-weight: 900;
      }
    }

    .image-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .image {
        flex-direction: column;
      }
    }
  }

  .active {
    .title {
      color: ${theme.palette.byzantine.main};
      opacity: 1;
    }

    .thumb {
      background: ${theme.palette.byzantine.main} !important;
    }

    .info-container {
      background: ${theme.palette.byzantine.main};
      color: white;

      .title {
        color: white;
      }
    }
  }

  .invert-vr {
    height: 200px;
    top: -90px;
  }

  .incorrect-container {
    margin-top: 20px;

    .MuiButtonBase-root {
      border-color: red;
      color: red;
    }
  }
`;

export default Container;
