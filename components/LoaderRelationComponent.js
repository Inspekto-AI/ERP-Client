import {
  Grid, Input, MenuItem, Select,
} from '@material-ui/core';

import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { post } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

const StyledInput = styled(Input)({
  marginLeft: '30px',
  marginRight: '30px',
  marginTop: '30px',
  backgroundColor: 'white',
  borderRadius: '5px',
  border: 'none',
  width: '6vw',
  color: 'black',
  '& .MuiInputBase-input': {
    cursor: 'pointer',
  },
  // boxShadow: '1px 1px 1px 1px black'
});

const StyledSelect = styled(Select)({
  marginLeft: '30px',
  marginRight: '30px',
  marginTop: '30px',
  fontSize: '16px',
  backgroundColor: 'white',
  borderRadius: '5px',
  border: 'none',
  width: '6vw',
  // boxShadow: '1px 1px 1px 1px black'
});

// ...

export default function LoaderRelationComponent({
  item,
  printingBelts,
  loaderRelation,
}) {
  // console.log(loaderRelation[item?.machine_id], belt?.id);
  const [printingId, setPrintingId] = useState(null);
  const handleUpdate = async () => {
    console.log(printingId);
    const res = await post(`${BASE_URL}/api/shipment/update-loader-relation`, {
      printing_belt_id: 'ern',
      loading_belt_id: item?.machine_id,
    });
  };

  useEffect(() => {
    if (loaderRelation !== null && loaderRelation !== undefined) {
      setPrintingId(loaderRelation[item?.machine_id]);
    }
  }, [loaderRelation]);
  return (
    <>
      <Grid xs={3}>
        <StyledInput disableUnderline value={item?.machine_id} />
        {/* <Input class={classes.input} /> */}
      </Grid>

      <Grid xs={3}>
        <StyledSelect
          disableUnderline
          IconComponent={KeyboardArrowDownSharpIcon}
          value={printingId === null ? 0 : printingId}
          onChange={async (e) => {
            // console.log(e.target.value);
            setPrintingId(e.target.value);
            // handleUpdate();
            const res = await post(
              `${BASE_URL}/api/shipment/update-loader-relation`,
              {
                printing_belt_id: e.target.value,
                loading_belt_id: item?.machine_id,
              },
            );
          }}
        >
          <MenuItem value={0}>Select Belt</MenuItem>
          {printingBelts?.map((belt) => (
            <MenuItem value={belt?.id}>
              {' '}
              {belt?.id}
            </MenuItem>
          ))}
        </StyledSelect>
        {/* <Input class={classes.input} /> */}
      </Grid>
    </>
  );
}
