import styled from '@emotion/styled';
import theme from 'styles/theme';

const Container = styled.div`
  .trackbar {
    background: white;
    display: flex;
    align-items: center;
    padding: 5px 60px;
    color: #485057;

    @media all and (max-width: 960px) {
      padding: 10px;
    }

    .option {
      padding: 8px 16px;
      border-radius: 4px;
      margin-right: 18px;

      @media all and (max-width: 600px) {
        width: 22%;
      }

      h6 {
        cursor: pointer;
      }
    }

    .active {
      color: white;
      background: #485057;
      padding: 5px 10px;

      h6 {
        cursor: default;
        font-weight: 900;
      }
    }
  }

  .analysis-container {
    padding: 30px 60px 20px 60px;
    background: #e5e5e5;

    @media all and (max-width: 960px) {
      padding: 20px;
    }

    .head {
      color: ${theme.palette.trypanBlue.main};
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media all and (max-width: 960px) {
        flex-direction: column;
      }

      .search-container {
        display: flex;
        align-items: center;

        p {
          font-weight: 900;
          margin-right: 20px;
        }

        .MuiOutlinedInput-input {
          background: white;
          border-radius: 5px;
          padding: 12px;
        }

        .MuiOutlinedInput-notchedOutline {
          border-color: white;
        }
      }
    }

    .analytics {
      background: #f3f4f6;
      margin-top: 40px;
      padding: 20px;

      .MuiGrid-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
    }

    .shipment-type {
      display: flex;
      align-items: center;
      margin-bottom: 25px;

      hr {
        width: 100%;
        border-top: 1px dashed gray;
      }
    }

    .category-name {
      white-space: nowrap;
      margin-right: 14px;
      color: gray;
      font-size: 20px;
    }
  }
`;

export default Container;
