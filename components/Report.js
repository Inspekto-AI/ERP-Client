import { useState, useEffect } from 'react';
import Container from 'styles/summary.styles';
import ReportTable from 'components/ReportTable';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { get } from 'utils/api';
import FrinksButton from './FrinksButton';

const getStartAndEndDate = dateRange => {
  let start = dateRange[0].startDate;
  let end = dateRange[0].endDate;
  start = new Date(start).setUTCHours(18, 30, 0, 999);
  end = new Date(end).setUTCHours(41, 89, 59, 999);
  return [start, end];
};

const Report = () => {
  const [shipmentReport, setShipmentReport] = useState(null);
  const [shipmentStartTrackBar, setShipmentStartTrackBar] = useState(0);
  const [shipmentEndTrackBar, setShipmentEndTrackBar] = useState(5);

  const [packerReport, setPackerReport] = useState(null);
  const [packerStartTrackBar, setPackerStartTrackBar] = useState(0);
  const [packerEndTrackBar, setPackerEndTrackBar] = useState(5);

  const [printingReport, setPrintingReport] = useState(null);
  const [printingStartTrackBar, setPrintingStartTrackBar] = useState(0);
  const [printingEndTrackBar, setPrintingEndTrackBar] = useState(5);

  const [loaderReport, setLoaderReport] = useState(null);
  const [loaderStartTrackBar, setLoaderStartTrackBar] = useState(0);
  const [loaderEndTrackBar, setLoaderEndTrackBar] = useState(5);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const fetchReports = async () => {
    const fetchShipmentReport = async () => {
      const res = await get('/api/analysis/shipment-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [shipmentStartTrackBar, shipmentEndTrackBar]
      });
      setShipmentReport(res.data.data);
    };
    const fetchPrintingReport = async () => {
      const res = await get('/api/analysis/printing-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [printingStartTrackBar, printingEndTrackBar]
      });
      setPrintingReport(res.data.data);
    };
    const fetchLoadingReport = async () => {
      const res = await get('/api/analysis/loading-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [loaderStartTrackBar, loaderEndTrackBar]
      });
      setLoaderReport(res.data.data);
    };
    const fetchPackerReport = async () => {
      const res = await get('/api/analysis/packer-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [packerStartTrackBar, packerEndTrackBar]
      });
      setPackerReport(res.data.data);
    };
    await Promise.all([
      fetchShipmentReport(),
      fetchPrintingReport(),
      fetchLoadingReport()
      // fetchPackerReport()
    ]);
  };

  const handleSearch = async () => {
    await fetchReports();
    setDatePickerOpen(false);
  };

  useEffect(() => {
    const fetchShipmentReport = async () => {
      const res = await get('/api/analysis/shipment-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [shipmentStartTrackBar, shipmentEndTrackBar]
      });
      setShipmentReport(res.data.data);
    };
    fetchShipmentReport();
  }, [shipmentStartTrackBar, shipmentEndTrackBar]);

  useEffect(() => {
    fetchReports();
  }, []);

  const handleBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDatePickerOpen(false);
    }
  };

  return (
    <Container datePickerOpen={datePickerOpen}>
      <div className="analysis-container">
        <div className="head">
          <h2 className="report-header">Reports</h2>
          <div className="search-container">
            <div
              className="date-range-container"
              onClick={() => setDatePickerOpen(true)}
              onKeyPress={() => setDatePickerOpen(true)}
              onBlur={handleBlur}
              tabIndex={0}
              role="button"
            >
              {datePickerOpen ? (
                <div className="date-done-btn" onBlur={handleBlur}>
                  <FrinksButton text="Search" onClick={handleSearch} />
                </div>
              ) : null}
              <DateRange
                editableDateInputs
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                rangeColors={['#051c3f']}
              />
            </div>
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
