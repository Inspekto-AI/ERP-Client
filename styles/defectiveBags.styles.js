import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  max-height: 500px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  .defect {
    display: flex;

    .stepper {
      position: relative;

      .thumb {
        width: 14px;
        height: 14px;
        background: #666666;
        border-radius: 100px;
        margin: 0 34px;
        margin-top: 3px;
        position: relative;
        z-index: 1;
      }

      .vr {
        height: 100%;
        width: 1px;
        opacity: 0.2;
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

    .active {
      opacity: 1;
      color: ${theme.palette.byzantine.main};
    }
  }

  .image {
    display: flex;
    align-items: flex-start;

    .image-container {
      position: relative;
      width: 180px;
      aspect-ratio: 1.5/1;
      margin: 2px 24px 40px 0;
    }
  }

  .description {
    .heading {
      font-weight: 900;
      font-size: 22px;
      letter-spacing: 1px;
    }

    .sub-heading {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .no-defects {
    height: 100px;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: gray;
  }
`;

export default Container;
