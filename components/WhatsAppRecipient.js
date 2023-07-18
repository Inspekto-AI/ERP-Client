import { useEffect, useState } from 'react';
import { get } from 'utils/api';
import { BASE_URL } from 'utils/constants';
import WhatsappRecipientComponent from './WhatsAppRecipientComponent';
import { NUMBER_OF_WHATSAPP_RECIPIENT } from 'utils/constants';

const WhatsappRecipient = () => {
  const [isFetch, setIsFetch] = useState(true);

  const [whatsAppList, setWhatsAppList] = useState(null);

  const fetchWhatsAppRecipient = async () => {
    const res = await get(`${BASE_URL}/api/update-db/get-whatsapp-recipient`);
    const len = NUMBER_OF_WHATSAPP_RECIPIENT;

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
    <div>
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
