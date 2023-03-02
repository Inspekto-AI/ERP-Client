import styled from '@emotion/styled';

const Container = styled.div`
  ${'' /* min-width: 1080px; */}
  width: 80%;
  max-width: 1080px;
  margin: auto;
  padding-top: 80px;
  padding-bottom: 50px;

  .heading {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 39px;
  }

  .no-tickets{
    text-align: center;
    font-weight: 500;
    font-size: 25px;
  }
`;

export default Container;
