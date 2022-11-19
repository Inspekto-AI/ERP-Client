import styled from '@emotion/styled';

const Container = styled.div`
  .summary-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;
  }

  #date-range-picker {
    padding: 12.5px 10px;
    border-radius: 5px;
    border: 0px;
  }

  .left-portion {
    ${
      '' /* width: 50%;
    padding-right: 20px; */
    }
    padding-right: 20px;
    flex: 1 1 400px;

    .maintenance-container {
      margin-top: 30px;
    }
  }

  .right-portion {
    ${
      '' /* width: 50%;
    padding-left: 20px; */
    }
    padding-right: 20px;
    flex: 1 1 400px;

    @media all and (max-width: 850px) {
      margin-top: 20px;
    }
  }

  .report-header {
    @media all and (max-width: 960px) {
      margin-bottom: 40px;
    }
  }

  .count-block {
    height: 140px;
    color: white;
    position: relative;
    padding: 20px;
    box-shadow: 5.95181px 5.95181px 5.95181px rgb(0 0 0 / 8%);
    border-radius: 5px;
    overflow: hidden;

    span {
      inset: inherit !important;
      width: 120px !important;
      height: 100px !important;
      right: -15px !important;
      bottom: -8px !important;
      z-index: 0 !important;
    }

    .count {
      margin-top: 5px;
      font-family: 'Titillium Web';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 55px;
      position: relative;
      z-index: 2;
    }

    .description {
      font-weight: 700;
      font-size: 14px;
      line-height: 25px;
      position: relative;
      z-index: 2;
    }
  }

  .report-container {
    padding-top: 50px;
  }

  .date-display {
    background: #ffffff;
    border: 2px solid #e8ecef;
    border-radius: 8px;
    padding: 11px 24px;
    font-size: 12px;
    font-family: 'Roboto';
    color: #616161;
  }

  .search-container {
    position: relative;
    min-width: 330px;
  }

  .date-range-container {
    position: absolute;
    top: 0;
    transform: translateY(-25px);
    z-index: 2;
  }

  .rdrDateDisplayWrapper {
    min-width: 330px;
  }

  .rdrMonthAndYearWrapper {
    display: ${props => (props.datePickerOpen ? 'flex' : 'none')};
  }

  .rdrMonth {
    display: ${props => (props.datePickerOpen ? 'block' : 'none')};
  }

  .date-done-btn {
    top: 320px;
    z-index: 10;
    width: 332px;
    background: white;
    text-align: right;
    position: absolute;
    padding-right: 15px;
    padding-bottom: 15px;
    margin-top: 20px;
  }
`;

export default Container;
