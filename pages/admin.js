import Admin from 'components/AdminUpdate';
import WhatsappRecipient from 'components/WhatsAppRecipient';
import Layout from 'components/Layout';
import Container from 'styles/homepage.styles';
import { useState } from 'react';

function DashboardComponent({ activeSection }) {
  // console.log(handleBeltReset);
  if (activeSection === 0) {
    return <Admin />;
  }
  if (activeSection === 1) {
    return <WhatsappRecipient />;
  }
}

function Index() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <Layout style={{ marginTop: '100px' }}>
        <Container>
          <div className="trackbar">
            <div
              className={`option ${activeSection === 0 ? 'active' : ''}`}
              onClick={() => setActiveSection(0)}
              onKeyPress={() => setActiveSection(0)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>System Configuration</h6>
            </div>
            <div
              className={`option ${activeSection === 1 ? 'active' : ''}`}
              onClick={() => setActiveSection(1)}
              onKeyPress={() => setActiveSection(1)}
              role="button"
              tabIndex={0}
            >
              <h6 style={{ textAlign: 'center' }}>WhatsAppRecipient</h6>
            </div>
          </div>
          <DashboardComponent activeSection={activeSection} />
        </Container>
      </Layout>
    </>
  );
}

export default Index;
