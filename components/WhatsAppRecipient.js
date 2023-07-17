import { Input, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { get, post, put } from 'utils/api';
import { BASE_URL } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  input: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    fontSize: '20px'
  },
  button: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: '100px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    // marginTop: '80x',
    margin: '20px',
    height: '48px',
    fontSize: '20px'
  }
}));

const WhatsappRecipient = () => {
  const classes = useStyles();
  const [name1, setName1] = useState('');
  const [number1, setNumber1] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumberError1, setPhoneNumberError1] = useState('');
  const [name2, setName2] = useState('');
  const [number2, setNumber2] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');

  const [phoneNumberError2, setPhoneNumberError2] = useState('');
  const [name3, setName3] = useState('');
  const [number3, setNumber3] = useState('');
  const [phoneNumber3, setPhoneNumber3] = useState('');

  const [phoneNumberError3, setPhoneNumberError3] = useState('');
  const [isFetch, setIsFetch] = useState(true);

  const [isEdit1, setIsEdit1] = useState(true);
  const [isEdit2, setIsEdit2] = useState(true);
  const [isEdit3, setIsEdit3] = useState(true);
  const [isEditButton1, setIsEditButton1] = useState(true);
  const [isEditButton2, setIsEditButton2] = useState(true);
  const [isEditButton3, setIsEditButton3] = useState(true);

  const handleBlur1 = () => {
    validatePhoneNumber(number1, setPhoneNumberError1);
  };
  const handleBlur2 = () => {
    validatePhoneNumber(number2, setPhoneNumberError2);
  };
  const handleBlur3 = () => {
    validatePhoneNumber(number3, setPhoneNumberError3);
  };
  const validatePhoneNumber = (number, setPhoneNumberError) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number

    if (!phoneRegex.test(number)) {
      setPhoneNumberError('Enter a valid phone number');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSubmit1 = async () => {
    if (
      phoneNumberError1 ||
      number1 === '' ||
      name1 === '' ||
      name1 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await post(`${BASE_URL}/api/update-db/add-whatsapp-recipient`, {
      recipient_name: name1,
      recipient_phone: number1
    });
    setName1('');
    setNumber1('');
    setIsFetch(prev => !prev);
    setIsEdit1(true);
  };
  const handleSubmit2 = async () => {
    if (
      phoneNumberError2 ||
      number2 === '' ||
      name2 === '' ||
      name2 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await post(`${BASE_URL}/api/update-db/add-whatsapp-recipient`, {
      recipient_name: name2,
      recipient_phone: number2
    });
    setName2('');
    setNumber3('');
    setIsFetch(prev => !prev);
    setIsEdit2(true);
  };
  const handleSubmit3 = async () => {
    if (
      phoneNumberError3 ||
      number3 === '' ||
      name3 === '' ||
      name3 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await post(`${BASE_URL}/api/update-db/add-whatsapp-recipient`, {
      recipient_name: name3,
      recipient_phone: number3
    });
    setName3('');
    setNumber3('');
    setIsFetch(prev => !prev);
    setIsEdit3(true);
  };
  const handleEditSubmit1 = async () => {
    if (
      phoneNumberError1 ||
      number1 === '' ||
      name1 === '' ||
      name1 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await put(`${BASE_URL}/api/update-db/update-whatsapp-recipient`, {
      recipient_name: name1,
      recipient_phone: number1,
      phone_number: phoneNumber1
    });
    setIsEditButton1(true);
  };
  const handleEditSubmit2 = async () => {
    if (
      phoneNumberError2 ||
      number2 === '' ||
      name2 === '' ||
      name2 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await put(`${BASE_URL}/api/update-db/update-whatsapp-recipient`, {
      recipient_name: name2,
      recipient_phone: number2,
      phone_number: phoneNumber2
    });
    setIsEditButton2(true);
  };
  const handleEditSubmit3 = async () => {
    if (
      phoneNumberError3 ||
      number3 === '' ||
      name3 === '' ||
      name3 === undefined
    ) {
      alert('Enter Valid Name and Phone Number');
      return;
    }
    await put(`${BASE_URL}/api/update-db/update-whatsapp-recipient`, {
      recipient_name: name3,
      recipient_phone: number3,
      phone_number: phoneNumber3
    });
    setIsEditButton3(true);
  };
  const fetchWhatsAppRecipient = async () => {
    const res = await get(`${BASE_URL}/api/update-db/get-whatsapp-recipient`);

    setName1(res?.data[0]?.recipient_name);
    setName2(res?.data[1]?.recipient_name);
    setName3(res?.data[2]?.recipient_name);
    setNumber1(res?.data[0]?.recipient_phone);
    setNumber2(res?.data[1]?.recipient_phone);
    setNumber3(res?.data[2]?.recipient_phone);
    setPhoneNumber1(res?.data[0]?.recipient_phone);
    setPhoneNumber2(res?.data[1]?.recipient_phone);
    setPhoneNumber3(res?.data[2]?.recipient_phone);
    if (res.data?.length == 1) {
      setIsEdit2(false);
      setIsEdit3(false);
    } else if (res.data?.length === 2) {
      setIsEdit3(false);
    }
  };

  useEffect(() => {
    fetchWhatsAppRecipient();
  }, [isFetch]);
  return (
    <div>
      <div
        style={{ marginTop: '120px', display: 'flex', alignItems: 'center' }}
      >
        <Input
          placeholder="Enter name"
          className={classes.input}
          disableUnderline
          value={name1}
          onChange={e => setName1(e.target.value)}
          disabled={isEdit1 && isEditButton1}
        />
        <div>
          <Input
            placeholder="Enter Number"
            className={classes.input}
            disableUnderline
            onBlur={handleBlur1}
            style={{ borderColor: phoneNumberError1 ? 'red' : 'initial' }}
            onChange={e => setNumber1(e.target.value)}
            value={number1}
            disabled={isEdit1 && isEditButton1}
          />
          <InputLabel>
            {phoneNumberError1 && (
              <span style={{ fontColor: 'red' }}>{phoneNumberError1}</span>
            )}
          </InputLabel>
        </div>

        {isEdit1 === false ? (
          <Button onClick={handleSubmit1} class={classes.button}>
            Submit
          </Button>
        ) : (
          <Button
            onClick={
              isEditButton1 === true
                ? () => {
                    setIsEditButton1(false);
                  }
                : handleEditSubmit1
            }
            class={classes.button}
          >
            {isEditButton1 === true ? 'Edit' : 'Submit'}
          </Button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Enter name"
          className={classes.input}
          disableUnderline
          value={name2}
          onChange={e => setName2(e.target.value)}
          disabled={isEdit2 && isEditButton2}
        />
        <div>
          <Input
            placeholder="Enter Number"
            className={classes.input}
            disableUnderline
            onBlur={handleBlur2}
            style={{ borderColor: phoneNumberError2 ? 'red' : 'initial' }}
            onChange={e => setNumber2(e.target.value)}
            value={number2}
            disabled={isEdit2 && isEditButton2}
          />
          <InputLabel>
            {phoneNumberError2 && <span>{phoneNumberError2}</span>}
          </InputLabel>
        </div>

        {isEdit2 === false ? (
          <Button onClick={handleSubmit2} class={classes.button}>
            Submit
          </Button>
        ) : (
          <Button
            onClick={
              isEditButton2 === true
                ? () => {
                    setIsEditButton2(false);
                  }
                : handleEditSubmit2
            }
            class={classes.button}
          >
            {isEditButton2 === true ? 'Edit' : 'Submit'}
          </Button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Enter name"
          className={classes.input}
          disableUnderline
          value={name3}
          onChange={e => setName3(e.target.value)}
          disabled={isEdit3 && isEditButton3}
        />
        <div>
          <Input
            placeholder="Enter Number"
            className={classes.input}
            disableUnderline
            onBlur={handleBlur3}
            style={{ borderColor: phoneNumberError3 ? 'red' : 'initial' }}
            onChange={e => setNumber3(e.target.value)}
            value={number3}
            disabled={isEdit3 && isEditButton3}
          />
          <InputLabel>
            {phoneNumberError3 && <span>{phoneNumberError3}</span>}
          </InputLabel>
        </div>

        {isEdit3 === false ? (
          <Button onClick={handleSubmit3} class={classes.button}>
            Submit
          </Button>
        ) : (
          <Button
            onClick={
              isEditButton3 === true
                ? () => {
                    setIsEditButton3(false);
                  }
                : handleEditSubmit3
            }
            class={classes.button}
          >
            {isEditButton3 === true ? 'Edit' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WhatsappRecipient;
