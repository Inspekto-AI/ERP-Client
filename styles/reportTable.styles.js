import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 60px;

  .header {
    background: #051c3f;
    box-shadow: 5.95181px 5.95181px 5.95181px rgb(0 0 0 / 8%);
    color: white;
    padding: 26px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-family: 'Titillium Web';
      font-style: normal;
      font-weight: 600;
      font-size: 26px;
    }
  }

  .controls {
    display: flex;
    align-items: center;
  }

  .view {
    display: flex;
    align-items: center;
    // margin-right: 20px;

    p {
      margin-right: 20px;
    }
  }

  .search {
    display: flex;
    align-items: center;

    p {
      margin-right: 20px;
    }

    .MuiTextField-root {
      background: white;
      border-radius: 5px;
    }

    .MuiOutlinedInput-input {
      padding: 12.5px 10px;
    }
  }

  .view-toggle-buttons {
    padding: 0;
    min-width: 0;
    margin: 0 10px;
  }

  .table-container {
    padding: 20px;
    background: white;

    .MuiPaper-elevation1 {
      box-shadow: none;
      border: 2px solid #e8ecef;
    }

    .MuiTableCell-root {
      padding: 15px;
      text-align: center;
      font-size: 12px;
    }

    .MuiTableCell-head {
      font-weight: 900;
      text-align: left;
    }

    tr:nth-of-type(even) {
      background-color: #e8ecef;
    }
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #485057;

    @media all and (max-width: 960px) {
      flex-direction: column;
    }

    .left {
      display: flex;
      align-items: center;

      @media all and (max-width: 960px) {
        margin-bottom: 20px;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .page-layout {
        display: flex;
        align-items: center;
      }
    }

    .pipe {
      background: #485057;
      width: 1.5px;
      height: 20px;
      margin: 0 10px;
    }

    .number-of-records {
      display: flex;
      align-items: center;

      .MuiFormControl-root {
        margin: 0 10px;
      }

      .MuiOutlinedInput-input {
        padding: 10px 16px;
        width: 60px;
      }
    }
  }

  .page-layout {
    p {
      background: #7209b7;
      color: white;
      padding: 2px 5px;
    }

    .previous {
      border: 2px solid #e8ecef;
      background: white;
      color: black;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 2px 5px;
      font-size: 14px;
      cursor: pointer;
    }

    .next {
      border: 2px solid #e8ecef;
      background: white;
      color: black;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 2px 5px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .MuiTableSortLabel-root {
    white-space: nowrap;
  }

  .MuiTableContainer-root {
    ::-webkit-scrollbar {
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .MuiTableCell-head {
    text-align: center !important;
  }
`;

export const ProgressBarContainer = styled.div`
  .MuiLinearProgress-root {
    height: 20px;
    background: #f5f5f5;
    box-shadow: inset 0px 4.75152px 9.50303px rgb(0 0 0 / 10%);
    border-radius: 4.75152px;
  }

  .MuiLinearProgress-barColorPrimary {
    background-color: ${props => props.progressBackground};
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
`;

export default Container;
