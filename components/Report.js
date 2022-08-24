import { useState, useEffect } from 'react';
import Container from 'styles/summary.styles';
import ReportTable from 'components/ReportTable';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { get } from 'utils/api';

const getInitialDate = () => {
  const dateArr = new Date().toLocaleDateString().split('/');
  const today = `${dateArr[1] < 10 ? `0${dateArr[1]}` : dateArr[1]}/${
    dateArr[0] < 10 ? `0${dateArr[0]}` : dateArr[0]
  }/${dateArr[2] < 10 ? `0${dateArr[2]}` : dateArr[2]}`;
  return `${today} - ${today}`;
};

const Report = () => {
  const [date, setDate] = useState(null);
  const [shipmentReport, setShipmentReport] = useState(null);
  const [shipmentStartTrackBar, setShipmentStartTrackBar] = useState(0);
  const [shipmentEndTrackBar, setShipmentEndTrackBar] = useState(5);

  // const [packerReport, setPackerReport] = useState(null);
  // const [packerStartTrackBar, setPackerStartTrackBar] = useState(0);
  // const [packerEndTrackBar, setPackerEndTrackBar] = useState(5);

  const [printingReport, setPrintingReport] = useState(null);
  const [printingStartTrackBar, setPrintingStartTrackBar] = useState(0);
  const [printingEndTrackBar, setPrintingEndTrackBar] = useState(5);

  const [loaderReport, setLoaderReport] = useState(null);
  const [loaderStartTrackBar, setLoaderStartTrackBar] = useState(0);
  const [loaderEndTrackBar, setLoaderEndTrackBar] = useState(5);

  useEffect(() => {
    setDate(getInitialDate());
  }, []);

  useEffect(() => {
    const fetchShipmentReport = async () => {
      const res = await get('/api/analysis/shipment-report', {
        dateRange: date,
        trackbar: [shipmentStartTrackBar, shipmentEndTrackBar]
      });
      setShipmentReport(res.data.data);
    };
    if (date) {
      // fetch reports from a single endpoint
      fetchShipmentReport();
    }
  }, [date, shipmentEndTrackBar, shipmentStartTrackBar]);

  useEffect(() => {
    const fetchPrintingReport = async () => {
      const res = await get('/api/analysis/printing-report', {
        dateRange: date,
        trackbar: [printingStartTrackBar, printingEndTrackBar]
      });
      setPrintingReport(res.data.data);
    };
    if (date) {
      // fetch reports from a single endpoint
      fetchPrintingReport();
    }
  }, [date, printingEndTrackBar, printingStartTrackBar]);

  useEffect(() => {
    const fetchLoadingReport = async () => {
      const res = await get('/api/analysis/loading-report', {
        dateRange: date,
        trackbar: [loaderStartTrackBar, loaderEndTrackBar]
      });
      setLoaderReport(res.data.data);
    };
    if (date) {
      // fetch reports from a single endpoint
      fetchLoadingReport();
    }
  }, [date, loaderEndTrackBar, loaderStartTrackBar]);

  // useEffect(() => {
  //   const fetchPackerReport = async () => {
  //     const res = await get('/api/analysis/packer-report', {
  //       dateRange: date,
  //       trackbar: [packerStartTrackBar, packerEndTrackBar]
  //     });
  //     setPackerReport(res.data.data);
  //   };
  //   if (date) {
  //     // fetch reports from a single endpoint
  //     fetchPackerReport();
  //   }
  // }, [date, packerEndTrackBar, packerStartTrackBar]);

  return (
    <Container>
      <div className="analysis-container">
        <div className="head">
          <h2>Reports</h2>
          <div className="search-container">
            <DateRangePicker
              initialSettings={{
                startDate: new Date().toLocaleDateString(),
                locale: {
                  format: 'DD/MM/YYYY'
                }
              }}
              onApply={(event, picker) => {
                setDate(
                  `${picker.startDate.format(
                    'DD/MM/YYYY'
                  )} - ${picker.endDate.format('DD/MM/YYYY')}`
                );
                picker.element.val(
                  `${picker.startDate.format(
                    'DD/MM/YYYY'
                  )} - ${picker.endDate.format('DD/MM/YYYY')}`
                );
              }}
            >
              <input
                type="text"
                className="form-control"
                id="date-range-picker"
              />
            </DateRangePicker>
          </div>
        </div>
        <div className="report-container">
          <ReportTable
            title="Shipment Tracking"
            layoutType={0}
            data={shipmentReport}
            startCount={shipmentStartTrackBar}
            endCount={shipmentEndTrackBar}
            setStartCount={e => setShipmentStartTrackBar(e)}
            setEndCount={e => setShipmentEndTrackBar(e)}
          />
          <ReportTable
            title="Printing Bay"
            layoutType={1}
            data={printingReport}
            startCount={printingStartTrackBar}
            endCount={printingEndTrackBar}
            setStartCount={e => setPrintingStartTrackBar(e)}
            setEndCount={e => setPrintingEndTrackBar(e)}
            hideRowCount
          />
          <ReportTable
            title="Loading bay"
            layoutType={2}
            data={loaderReport}
            startCount={loaderStartTrackBar}
            endCount={loaderEndTrackBar}
            setStartCount={e => setLoaderStartTrackBar(e)}
            setEndCount={e => setLoaderEndTrackBar(e)}
            hideRowCount
          />
          {/* <ReportTable
            title="Packer Analytics"
            layoutType={3}
            data={packerReport}
            startCount={packerStartTrackBar}
            endCount={packerEndTrackBar}
            setStartCount={e => setPackerStartTrackBar(e)}
            setEndCount={e => setPackerEndTrackBar(e)}
            hideRowCount
          /> */}
        </div>
      </div>
    </Container>
  );
};

export default Report;
