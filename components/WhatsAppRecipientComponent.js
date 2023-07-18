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

const WhatsappRecipientComponent = ({ item, setIsFetch }) => {
  const classes = useStyles();
  const [name1, setName1] = useState(item.recipient_name);
  const [number1, setNumber1] = useState(item.recipient_phone);
  const [phoneNumber1, setPhoneNumber1] = useState(item.recipient_phone);
  const [phoneNumberError1, setPhoneNumberError1] = useState('');

  const [isEdit1, setIsEdit1] = useState(
    item.recipient_name === undefined ? false : true
  );

  const [isEditButton1, setIsEditButton1] = useState(true);

  const handleBlur1 = () => {
    validatePhoneNumber(number1, setPhoneNumberError1);
  };

  const validatePhoneNumber = (number, setPhoneNumberError) => {
    const phoneRegex = /^\d{10}$/;

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
    // setName1('');
    // setNumber1('');
    // setIsFetch();
    setPhoneNumber1(number1);
    setIsEdit1(true);
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

  useEffect(() => {
    // console.log(item?.recipient_name, item?.recipient_phone);
  }, []);
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
    </div>
  );
};

export default WhatsappRecipientComponent;
