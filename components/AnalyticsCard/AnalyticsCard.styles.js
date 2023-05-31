import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  background: ${(props) => props.isRunning === false || props.status > 0
    ? props.status === 1
      ? '#CB952B'
      : props.active === 1 && props.isRunning !== false
        ? 'white'
        : theme.palette.error.main
    : '#26A84A'};
  border-radius: 10px;
  padding: ${(props) => (props.packerCard ? '35px 5px' : '35px 20px')};
  padding-top: ${(props) => (props.isRunning === false ? '40px' : '20px')};
  // padding-top: 20px;
  padding-bottom: ${(props) => (props.isRunning === false ? '15px' : '25px')};
  padding-bottom: ${(props) => (props.packerCard ? '8px' : '25px')};
  max-width: 330px;
  width: 100%;
  position: relative;

  .head {
    font-size: 18px;
    margin-bottom: 20px;
    align-items: flex-start !important;
    padding: ${(props) => (props.packerCard ? '0 15px' : '0 0')};

    .id-container {
      display: flex;

      .status {
        background: ${(props) => (props.status === 0
    ? '#01ba8f'
    : props.status === 1
      ? 'white'
      : 'white')};
        height: 18px;
        width: 18px;
        border-radius: 100px;
        border: 2px solid #f5f5f5;
        margin-top: ${(props) => (props.printingCard ? '1px' : '8px')};
      }

      .id {
        color: ${(props) => (props.isRunning === false || props.status <= 1 ? 'white' : 'black')};
        font-weight: 600;
        margin-left: 5px;
        font-size: 15px;

        span {
          font-size: 20px;
          padding-right: 4px;
          padding-top: 3px;
        }

        .tag-id {
          font-size: ${(props) => (props.printingCard ? '18px' : '14px')};
        }
      }
    }

    .timer {
      font-weight: 900;
      font-size: 14px;
      color: white;
    }
  }

  .count-container {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    margin-top: ${(props) => (props.printingCard
    ? '10px'
    : props.isRunning === false
      ? '34px'
      : '54px')};
    padding: ${(props) => (props.packerCard ? '0 15px' : '0 0')};

    h2 {
      margin-right: 10px;
      font-weight: 900;
      color: ${(props) => (props.status >= 2 ? 'black' : 'white')};
    }

    .MuiAvatar-circular {
      background: ${theme.palette.ultramarineBlue.main};
      cursor: pointer;
      width: 30px;
      height: 30px;
    }

    .count {
      font-size: 44px;
    }
  }

  .type {
    font-size: 16px;
    color: ${(props) => (props.isRunning === false || props.status <= 1
    ? 'white'
    : theme.palette.grey.grey100)};
    margin: 2px 0 20px 0;
    margin-bottom: ${(props) => (props.status <= 1
    ? props.printingCard
      ? '70px'
      : '10px'
    : props.status === 1
      ? '10px'
      : '40px')};

    span {
      font-weight: 900;
      color: white;
    }
  }

  .rejected {
    background: ${(props) => (props.isRunning === false ? 'white' : '#f5f5f5')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    position: absolute;
    left: 0;
    // bottom: ${(props) => (props.printingCard ? '30px' : '70px')};
    width: 100%;

    .count {
      display: flex;
      align-items: center;

      .MuiAvatar-root {
        margin-right: 10px;
        color: ${theme.palette.dodgerBlue.main};
        background: white;
        border: 1px solid #cccccc;
        font-weight: 600;
        width: 30px;
        height: 30px;
        font-size: 12px;
      }

      h6 {
        font-size: 18px;
        font-weight: 600;
        color: black;
      }
    }

    .MuiButtonBase-root {
      .MuiButton-label {
        font-size: 14px;
        font-weight: 900;
        color: ${theme.palette.purple.main};
      }
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .view-button {
    width: ${(props) => ((props.countReached && props.status === 0) || props?.isRunning === false
    ? '48%'
    : '100%')};
    border: 3px solid ${theme.palette.byzantine.main};
    background: white;
    border-radius: 12px;
    font-size: 15px;
    height: 35px;
    padding: 20px;
    color: ${theme.palette.byzantine.main};
    font-weight: 900;

    svg {
      font-size: 25px;
      margin-bottom: 3px;
      margin-left: 5px;
    }
  }

  .view-button2 {
    width: 100%;
    border: 3px solid white;
    background: white;
    border-radius: 12px;
    font-size: 15px;
    height: 35px;
    color: ${theme.palette.byzantine.main};
    font-weight: 900;

    svg {
      font-size: 25px;
      margin-bottom: 3px;
      margin-left: 5px;
    }
  }

  .error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 13px;
    -webkit-box-shadow: 1px 4px 12px -8px black;
    -moz-box-shadow: 1px 4px 12px -8px black;
    box-shadow: 1px 4px 12px -8px black;
    color: white;
    display: ${(props) => (props.isRunning === false ? 'flex' : 'none')};
    background: ${theme.palette.error.main};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      font-weight: 600;
      font-size: 12px;

      svg {
        margin-right: 5px;
        margin-bottom: 2px;

        path {
          stroke: white;
        }
      }
    }

    .know-more-button {
      text-transform: uppercase;
      cursor: pointer;
      font-weight: 600;
      font-size: 10px;
    }
  }

  .progress-container {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 13px;
    padding-bottom: 5px;

    .MuiLinearProgress-root {
      height: 20px;
      background: #f5f5f5;
      box-shadow: inset 0px 4.75152px 9.50303px rgb(0 0 0 / 10%);
      border-radius: 4.75152px;
    }

    .MuiLinearProgress-barColorPrimary {
      background-color: ${(props) => props.progressBackground};
    }

    .productivity {
      font-family: 'Roboto';
      font-size: 13px;
      margin-top: 10px;
      color: #808080;

      .bold {
        font-weight: 900;
        color: black;
      }
    }
  }
`;

export default Container;
