import {
  Grid, Input, MenuItem, Select,
} from '@material-ui/core';

import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { post } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const StyledInput = styled(Input)({
  marginLeft: '25px',
  marginRight: '25px',
  marginTop: '30px',
  backgroundColor: 'white',
  borderRadius: '5px',
  border: 'none',
  width: '6vw',
  color: 'black',
  fontSize: '20px',
  padding: '5px',
  '& .MuiInputBase-input': {
    cursor: 'pointer',
  },
});

const StyledSelect = styled(Select)({
  marginLeft: '25px',
  marginRight: '25px',
  marginTop: '30px',
  fontSize: '20px',
  backgroundColor: 'white',
  borderRadius: '5px',
  border: 'none',
  width: '6vw',
  padding: '5px',
});

// ...

export default function LoaderRelationComponent({
  item,
  printingBelts,
  loaderRelation,
  isLineBreak,
}) {
  const [printingId, setPrintingId] = useState(null);
  const handleUpdate = async () => {
    console.log(printingId);
    const res = await post(`${BASE_URL}/api/shipment/update-loader-relation`, {
      printing_belt_id: 'ern',
      loading_belt_id: item?.machine_id,
    });
  };
  console.log(isLineBreak);

  useEffect(() => {
    if (loaderRelation !== null && loaderRelation !== undefined) {
      setPrintingId(loaderRelation[item?.machine_id]);
    }
  }, [loaderRelation]);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <Grid xs={2}> */}
      <StyledInput disableUnderline value={item?.machine_id} />
      {/* </Grid> */}
      {/* <Grid xs={2}>
        <hr className="custom-line" />
      </Grid> */}
      {/* <Grid xs={2}> */}
      {/* <hr
        style={{
          borderTop: '1px solid black',
          transform: 'rotate(90deg)',
          margin: 'auto'
        }}
      /> */}
      <ArrowRightAltIcon style={{ marginTop: '20px' }} />
      {/* </Grid> */}

      {/* <Grid xs={2}> */}
      <StyledSelect
        disableUnderline
        IconComponent={KeyboardArrowDownSharpIcon}
        value={printingId === null ? 0 : printingId}
        onChange={async (e) => {
          setPrintingId(e.target.value);

          const res = await post(
            `${BASE_URL}/api/shipment/update-loader-relation`,
            {
              printing_belt_id: e.target.value,
              loading_belt_id: item?.machine_id,
            },
          );
        }}
      >
        <MenuItem value={0}>Select</MenuItem>
        {printingBelts?.map((belt) => (
          <MenuItem value={belt?.id}>
            {' '}
            {belt?.id}
          </MenuItem>
        ))}
      </StyledSelect>
      {/* {isLineBreak === true &&  */}
      <hr style={{ borderTop: '1px solid black' }} />
      {/* } */}
      {/* </Grid> */}
    </div>
  );
}
