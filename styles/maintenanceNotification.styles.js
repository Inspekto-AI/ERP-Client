import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  padding: 20px;
  background: white;
  margin: auto;

  .defect {
    display: flex;

    .stepper {
      position: relative;

      .thumb {
        width: 50px;
        height: 50px;
        background: #efde48;
        border-radius: 100px;
        margin: 0 15px;
        margin-top: 3px;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .blank-thumb {
        margin: 0 25px;
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
      font-size: 12px;
      font-weight: 900;
      text-align: right;
      opacity: 0.6;
      min-width: 55px;
    }
  }

  .defect > .title {
    padding-top: 18px;
  }

  .image {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

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
    width: 100%;
    padding-bottom: 35px;

    .ticket-title {
      color: #434343;
      font-weight: 900;
      font-size: 18px;
    }

    .description {
      font-size: 12px;
      margin-bottom: 20px;
      margin-top: 8px;
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
    .MuiButtonBase-root {
      border-color: red;
      color: red;
    }
  }
`;

export default Container;
