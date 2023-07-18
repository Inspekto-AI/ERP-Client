import { useEffect, useState, useContext } from 'react';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import WhatsappRecipientComponent from './WhatsAppRecipientComponent';
import { GlobalContext } from 'context/GlobalContext';

const WhatsappRecipient = () => {
  const [isFetch, setIsFetch] = useState(true);
  const { numberOfWhatsappRecipient } = useContext(GlobalContext);

  const [whatsAppList, setWhatsAppList] = useState(null);

  const fetchWhatsAppRecipient = async () => {
    const res = await get(`${BASE_URL}/api/update-db/get-whatsapp-recipient`);
    const len = numberOfWhatsappRecipient;

    let a = 0;

    let whatsAppListTemp = [];

    res?.data?.map(item => {
      a++;
      if (a <= len) {
        whatsAppListTemp.push(item);
      }
    });

    while (a < len) {
      a++;
      whatsAppListTemp.push({});
    }

    setWhatsAppList(whatsAppListTemp);
  };

  useEffect(() => {
    console.log(isFetch);
    fetchWhatsAppRecipient();
  }, [isFetch]);
  return (
    <div style={{ paddingTop: '50px' }}>
      {whatsAppList?.map(item => {
        // console.log(item);
        return (
          <WhatsappRecipientComponent
            item={item}
            setIsFetch={() => setIsFetch(false)}
          />
        );
      })}
    </div>
  );
};

export default WhatsappRecipient;
