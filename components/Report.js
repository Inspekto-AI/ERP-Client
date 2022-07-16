import { useState } from 'react';
import Container from 'styles/summary.styles';
import ReportTable from 'components/ReportTable';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

const Report = () => {
  const [date, setDate] = useState(null);

  console.log(date);

  return (
    <Container>
      <div className="analysis-container">
        <div className="head">
          <h2>Report</h2>
          <div className="search-container">
            <DateRangePicker
              initialSettings={{ startDate: new Date().toLocaleDateString() }}
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
          <ReportTable />
        </div>
      </div>
    </Container>
  );
};

export default Report;
