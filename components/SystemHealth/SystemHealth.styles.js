import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px 5px 20px 20px;
  fontfamily: Inter;

  .container {
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    margin-top: 20px;
  }

  .heading {
    color: #7209b7;
    padding-bottom: 20px;
  }

  .sub-heading {
    float: left;
    color: #5a5a5a;
  }

  .divider {
    margin: 20px 70px 20px 100px;
    height: 3px;
    background: #050317;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
`;

export default Container;
