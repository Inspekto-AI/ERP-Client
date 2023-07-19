import { useEffect, useState, useContext } from 'react';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import { GlobalContext } from 'context/GlobalContext';
import WhatsappRecipientComponent from './WhatsAppRecipientComponent';

function WhatsappRecipient() {
  const [isFetch, setIsFetch] = useState(true);
  const { numberOfWhatsappRecipient } = useContext(GlobalContext);

  const [whatsAppList, setWhatsAppList] = useState(null);

  const fetchWhatsAppRecipient = async () => {
    const res = await get(`${BASE_URL}/api/update-db/get-whatsapp-recipient`);
    const len = numberOfWhatsappRecipient;

    let a = 0;

    const whatsAppListTemp = [];

    res?.data?.map((item) => {
      a++;
      if (a <= len) {
        whatsAppListTemp.push(item);
      }
      return 0;
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
      {whatsAppList?.map((item) => (
        <WhatsappRecipientComponent
          item={item}
          setIsFetch={() => setIsFetch(false)}
        />
      ))}
    </div>
  );
}

export default WhatsappRecipient;
