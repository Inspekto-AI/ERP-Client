import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import LoaderRelationComponent from './LoaderRelationComponent';

export default function LoaderRelation() {
  const [printingBelts, setPrintingBelts] = useState(null);
  const [truckLoadingBelts, setTruckLoadingBelts] = useState(null);
  const [wagonLoadingBelts, setWagonLoadingBelts] = useState(null);
  const [loaderRelation, setLoaderRelation] = useState(null);

  const fetchPrintingBelts = async () => {
    const res = await get(`${BASE_URL}/api/shipment/printing-belt`);
    // console.log(res?.data?.data);
    setPrintingBelts(res?.data?.data);
  };
  const fetchLoadingBelts = async () => {
    const res = await get(`${BASE_URL}/api/shipment/all-vehicle`);
    // console.log(res?.data);
    const truckLoadingBeltTemp = [];
    const wagonLoadingBeltTemp = [];
    res?.data?.data?.map((item) => {
      if (item?.vehicle_type === 0) {
        truckLoadingBeltTemp.push(item);
      } else {
        wagonLoadingBeltTemp.push(item);
      }
      return 0;
    });
    setTruckLoadingBelts(truckLoadingBeltTemp);
    setWagonLoadingBelts(wagonLoadingBeltTemp);
  };

  const fetchLoadingRelation = async () => {
    const res = await get(`${BASE_URL}/api/shipment/get-loader-relation`);
    // console.log(res?.data);
    setLoaderRelation(res?.data);
  };

  useEffect(() => {
    fetchPrintingBelts();
    fetchLoadingBelts();
    fetchLoadingRelation();
  }, []);

  return (
    <div style={{ marginTop: '150px' }}>
      <Grid container>
        <Grid container xs={6}>
          {truckLoadingBelts?.map((item) => (
            <LoaderRelationComponent
              item={item}
              printingBelts={printingBelts}
              loaderRelation={loaderRelation}
            />
          ))}
          {/* <LoaderRelationComponent />
          <LoaderRelationComponent />
          <LoaderRelationComponent />
          <LoaderRelationComponent />
          <LoaderRelationComponent />
          <LoaderRelationComponent /> */}
        </Grid>
        <Grid container xs={6}>
          {wagonLoadingBelts?.map((item) => (
            <LoaderRelationComponent
              item={item}
              printingBelts={printingBelts}
              loaderRelation={loaderRelation}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
