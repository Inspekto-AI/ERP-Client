import styled from '@emotion/styled';

import theme from 'styles/theme';

const Container = styled.div`
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    background: ${theme.palette.royalBlue.main};
    padding: 0 60px 0 60px;
    position: realtive;

    @media all and (max-width: 960px) {
      padding: 0 20px 0 20px;
      height: 80px;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 50px;
    width: 53px;
    position: relative;
  }

  .links {
    display: flex;
    align-items: center;

    .MuiButtonBase-root {
      min-width: auto;
      border-radius: 12px;
      margin-right: 15px;
      background: ${theme.palette.byzantine.main};
      font-weight: 600;
      font-size: 12px;

      &:hover {
        background: ${theme.palette.gradient.pink};
      }

      .button-label {
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .purple-button {
      background: ${theme.palette.purple.main};
      font-weight: 600;
    }
  }

  .notification {
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 32px;
    padding: 10px 15px;
    margin-right: 15px;

    hr {
      margin: 0 20px;
      height: 20px;
    }

    .icon {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      .counter {
        background: ${theme.palette.flickrPink.main};
        z-index: 2;
        border-radius: 100px;
        width: 15px;
        height: 15px;
        position: absolute;
        top: -5px;
        right: -7px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        color: white;
        font-size: 8px;
      }

      .blue-counter {
        background: ${theme.palette.dodgerBlue.main};
      }
    }
  }

  .menu-button {
    border-radius: 100px !important;
    background: #1e3352 !important;
  }

  .popper {
    background: #f5f5f5;
    padding: 14px 14px;
    font-size: 17px;
    width: 139px;
    color: ${theme.palette.royalBlue.main};
    font-family: 'Inter';
    position: relative;

    .logout-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    hr {
      margin: 10px 0;
      opacity: 0.1;
    }

    .arrow {
      position: absolute;
      top: -15px;
      right: 10px;
      color: #f5f5f5;
    }
  }

  #transitions-popper {
    top: 17px !important;
    z-index: 2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default Container;
