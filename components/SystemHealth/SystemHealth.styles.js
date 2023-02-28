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

  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
  }

  .divider {
    margin-left: 15px;
    height: 3px;
    background: #050317;
    width: -webkit-fill-available;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
`;

export const CardContainer = styled.div`
  justify-content: space-between;
  padding: 10px;
  margin: 10px 20px;
  margin-left: 0;
  border: solid 1px;
  border-radius: 4px;
  background: ${props => (props.active ? '#00C1F3' : '#FF5742')};
  color: white;
  font-size: 18px;

  .downtime {
    font-size: 14px;
    padding-left: 10px;
  }

  .container {
    display: flex;
  }

  .image-container {
    padding: 10px;
  }

  .info {
    padding: 20px 10px;
  }
`;

export default Container;
