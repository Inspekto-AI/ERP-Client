import styled from '@emotion/styled';

import theme from 'styles/theme';

const Container = styled.div`
  .footer {
    background: ${theme.palette.royalBlue.main};
    color: ${theme.palette.smokyWhite.main};
    display: flex;
    // align-items: flex-start;
    justify-content: space-between;
    // padding: 40px 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index:200;

    @media all and (max-width: 960px) {
      padding: 40px 20px;
    }

    .sub-heading {
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 900;
    }

    .links {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      line-height: 24px;

      a {
        color: white;
      }
    }

    .top-links {
      margin-bottom: 25px;
    }
  }

  .copyright {
    // text-align: right;
    // margin-top: 20px;
  }
`;

export default Container;
