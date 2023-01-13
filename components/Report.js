import { useState, useEffect } from 'react';
import Container from 'styles/summary.styles';
import ReportTable from 'components/ReportTable';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { get } from 'utils/api';
import FrinksButton from './FrinksButton';
import { getStartAndEndDate } from 'utils/globalFunctions';

const Report = () => {
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
  const [loaderFilterReport, setLoaderFilterReport] = useState(null);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [shipmentFilter, setShipmentFilter] = useState(2);
  const [loaderFilter, setLoaderFilter] = useState(2);

  const fetchReports = async () => {
    const fetchShipmentReport = async () => {
      const res = await get('/api/analysis/shipment-report', {
        dateRange: getStartAndEndDate(date),
        trackbar: [shipmentStartTrackBar, shipmentEndTrackBar],
        shipmentFilter
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
    // const fetchPackerReport = async () => {
    //   const res = await get('/api/analysis/packer-report', {
    //     dateRange: getStartAndEndDate(date),
    //     trackbar: [packerStartTrackBar, packerEndTrackBar]
    //   });
    //   setPackerReport(res.data.data);
    // };
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
        trackbar: [shipmentStartTrackBar, shipmentEndTrackBar],
        shipmentFilter
      });
      setShipmentReport(res.data.data);
    };
    fetchShipmentReport();
  }, [shipmentStartTrackBar, shipmentEndTrackBar, shipmentFilter]);

  useEffect(() => {
    if (loaderReport) {
      if (loaderFilter === 2) setLoaderFilterReport(loaderReport);
      else if (loaderFilter === 1)
        setLoaderFilterReport(loaderReport.filter(e => e.vehicle_type === 1));
      else
        setLoaderFilterReport(loaderReport.filter(e => e.vehicle_type === 0));
    }
  }, [loaderFilter, loaderReport]);

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
            filter={shipmentFilter}
            setFilter={e => setShipmentFilter(e)}
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
            data={loaderFilterReport}
            startCount={loaderStartTrackBar}
            endCount={loaderEndTrackBar}
            setStartCount={e => setLoaderStartTrackBar(e)}
            setEndCount={e => setLoaderEndTrackBar(e)}
            hideRowCount
            filter={loaderFilter}
            setFilter={e => setLoaderFilter(e)}
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
