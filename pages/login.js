import Image from 'next/image';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import Container from 'styles/loginStyles';
import { TextField } from '@material-ui/core';
import FrinksButton from 'components/FrinksButton';
import { LoginQuery } from 'reactQueries/authQueries';
import { GlobalContext } from 'context/GlobalContext';
import { useState, useEffect, useContext } from 'react';
import { get, post } from 'utils/api';

function Login() {
  const router = useRouter();
  // const loginQuery = LoginQuery();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { userData, setUserData } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await get('/api/users/check-login', {
      email,
      password,
    });

    console.log(res?.data);
    if (res?.data[0] === true) {
      router.push('/admin');
    } else {
      setError(res?.data[1]);
    }
  };

  // useEffect(() => {
  //   if (loginQuery.isSuccess) {
  //     setUserData({ ...loginQuery.data.data, isLoggedIn: true });
  //     router.replace('/');
  //     loginQuery.reset();
  //   }
  //   if (loginQuery.isError) {
  //     if (loginQuery?.error?.response?.data?.errors) {
  //       setError(Object.values(loginQuery?.error?.response?.data?.errors)[0]);
  //     } else setError(loginQuery.error.response.data.message);
  //     loginQuery.reset();
  //   }
  // }, [loginQuery, router, setUserData]);

  // if (!userData) {
  //   return <Loader />;
  // }

  // if (userData && userData.isLoggedIn) {
  //   router.push('/admin');
  //   return <Loader />;
  // }

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
          <p className="title">Email</p>
          <TextField
            required
            type="text"
            name="email"
            variant="outlined"
            placeholder="Email"
            value={email}
            error={!!error}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            helperText={error ? error.desc : null}
          />
          <br />
          <div className="error-block">{error}</div>
          <FrinksButton text="Login" type="submit" />
          <p className="forgot">
            Unable to login? Reach out to
            {' '}
            <span>Administrator</span>
            .
          </p>
        </form>
      </div>
    </Container>
  );
}

export default Login;
