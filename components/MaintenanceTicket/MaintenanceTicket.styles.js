import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  padding: 20px;
  background: white;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-left: 8px solid
    ${props => (props.isActive ? '#01ba8f' : 'rgb(102 102 102)')};

  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 39px;
  }

  .sub-title .time {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    opacity: 0.6;
  }

  .time {
    margin-top: 12px;
  }

  .right {
    .MuiButtonBase-root {
      width: 250px;
      font-size: 14px;
    }
  }
`;

export default Container;
