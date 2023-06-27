import styled from '@emotion/styled';

const ShipmentContainer = styled.div`
.rack-container {
  margin-top: '120px',
     margin-left: '80px',
    font-size: '24px',
    font-weight: '800'
}
.loader-container {
  height: '810px',
   max-width: '1900px',
     overflow-x: 'auto',
     max-height: '810px',
     overflow-y: 'auto',
          // margin-top: vehicleType === 0 ? '0' : '130px'
}
  .shipment-container {
    margin: '120px 80px 0px',
    font-size: '24px',
    font-weight: '800'
  }
  .custom-table {
    border-collapse: separate;
    border-spacing: 20px 10px;
    width: 100%;
    margin: 20px 80px 0px;
    width: 90%;
    border: 1px solid black;
    background-color: #f3f4f6;
    overflow-x: auto;
  }

  .custom-table th,
  .custom-table td {
    border: 1px solid #000;
    /* padding: 5px 2px; */
    text-align: center;
    font-size: 20px;
    border: none;
    background-color: white;
    border-radius: 8px;
    margin: 10px;
    height: 40px;
    font-weight: 600;
  }

  .custom-table th {
    background-color: #f2f2f2;
    font-weight: 1000;
    font-size: 24px;
    text-align: left;
  }

  .custom-table input {
    height: 40px;
    width: 200px;
    border-radius: 5px;
    border: none;
    padding: 0px;
    font-size: 20px;
  }

  .table-button {
    height: 40px;
    width: 70px;
    border-radius: 5px;
    border: none;
    padding: 0px 0px;
    font-size: 20px;
    background-color: white;
    /* align-items: center;
  text-align: center; */
  }

  .table-button:hover {
    cursor: pointer;
  }
`;

export default ShipmentContainer;
