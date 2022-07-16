import styled from '@emotion/styled';

import theme from 'styles/theme';

const Container = styled.div`
  .footer {
    background: ${theme.palette.royalBlue.main};
    color: ${theme.palette.smokyWhite.main};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 40px 60px;

    @media all and (max-width: 960px) {
      padding: 40px 20px;
    }

    .sub-heading {
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 900;

      @media all and (max-width: 960px) {
        margin-bottom: 10px;
      }
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

    .logo-container {
      margin-bottom: 25px;
    }

    .top-links {
      margin-bottom: 25px;
    }
  }
`;

export default Container;
