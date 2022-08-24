import Image from 'next/image';
import { useRouter } from 'next/router';
import Container from 'styles/loginStyles';
import { useState, useEffect, useContext } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { SignupQuery } from 'reactQueries/authQueries';
import FrinksButton from 'components/FrinksButton';
import { GlobalContext } from 'context/GlobalContext';
import Loader from 'components/Loader';

const Signup = () => {
  const router = useRouter();
  const signupMutation = SignupQuery();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const { userData } = useContext(GlobalContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    signupMutation.mutate({
      email,
      password,
      name,
      phone_number: phoneNumber
    });
  };

  useEffect(() => {
    if (signupMutation?.isSuccess) {
      router.replace('/login');
      signupMutation.reset();
    }
    if (signupMutation.isError) {
      if (signupMutation?.error?.response?.data?.errors) {
        setError(
          Object.values(signupMutation?.error?.response?.data?.errors)[0]
        );
      } else setError(signupMutation?.error?.response?.data?.message);
      signupMutation.reset();
    }
  }, [signupMutation, router]);

  if (!userData) {
    return <Loader />;
  }

  if (userData && userData?.isLoggedIn) {
    router.push('/');
    return <Loader />;
  }

  return (
    <Container>
      <Image
        src="high_res_logo.svg"
        layout="fixed"
        height={150}
        width={150}
        loader={() => '/high_res_logo.svg'}
      />
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p className="title">Name</p>
              <TextField
                required
                type="text"
                name="name"
                variant="outlined"
                placeholder="Name"
                value={name}
                error={!!error}
                onChange={e => setName(e.target.value)}
                helperText={error ? error.desc : null}
              />
              <br />
              <br />
              <p className="title">Phone Number</p>
              <TextField
                required
                name="phoneNumber"
                type="text"
                variant="outlined"
                placeholder="Phone Number"
                error={!!error}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                helperText={error ? error.desc : null}
              />
            </Grid>
            <Grid item xs={6}>
              <p className="title">Email</p>
              <TextField
                required
                type="text"
                name="email"
                variant="outlined"
                placeholder="Email"
                value={email}
                error={!!error}
                onChange={e => setEmail(e.target.value)}
                helperText={error ? error.desc : null}
              />
              <br />
              <br />
              <p className="title">Password</p>
              <TextField
                required
                name="password"
                type="password"
                variant="outlined"
                placeholder="Password"
                error={!!error}
                value={password}
                onChange={e => setPassword(e.target.value)}
                helperText={error ? error.desc : null}
              />
            </Grid>
          </Grid>

          <div className="error-block">{error}</div>
          <FrinksButton text="Signup" type="submit" />
          <p className="forgot">
            Unable to signup? Reach out to <span>Administrator</span>.
          </p>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
