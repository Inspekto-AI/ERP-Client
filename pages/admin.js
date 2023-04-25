import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import { GlobalContext } from 'context/GlobalContext';
import Layout from 'components/Layout';
import Container from 'styles/admin.styles';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import UpdateDatabase from 'components/UpdateDatabase';
import UpdateDeployment from 'components/UpdateDeployment';
import PythonDataExtraction from 'components/PythonDataExtraction';
import { get } from 'utils/api';

const Admin = () => {
    const router = useRouter();
    const { userData } = useContext(GlobalContext);
    const [dataExtractionStatus, setDataExtractionStatus] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            const res = await get('/api/configuration/data-extraction');
            setDataExtractionStatus(res?.data?.data?.dataExtractionStatus ? true : false);
        }
        fetchStatus();
    }, [])


    if (!userData) {
        return <Loader />;
    }

    if (userData.isLoggedIn === false) {
        router.push('/login');
        return <Loader />;
    }

    return (
        <Layout alternateHeader title='Admin Portal'>
            <Container>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<MdOutlineExpandMore />}
                    >
                        Update Database
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateDatabase />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<MdOutlineExpandMore />}
                    >
                        Update Deployment
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateDeployment />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<MdOutlineExpandMore />}
                    >
                        Python Data Extraction
                    </AccordionSummary>
                    <AccordionDetails>
                        <PythonDataExtraction dataExtractionStatus={dataExtractionStatus} setDataExtractionStatus={(e) => setDataExtractionStatus(e)} />
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Layout>
    )
}

export default Admin;