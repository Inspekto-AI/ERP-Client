import Image from 'next/image';
import { useRouter } from 'next/router';
import Container from 'styles/loginStyles';
import { useState, useEffect, useContext } from 'react';
import { TextField } from '@material-ui/core';
import ImageKitLoader from 'utils/ImageLoader';
import { LoginQuery } from 'reactQueries/authQueries';
import FrinksButton from 'components/FrinksButton';
import { GlobalContext } from 'context/GlobalContext';
import Loader from 'components/Loader';

const Login = () => {
  const router = useRouter();
  const loginQuery = LoginQuery();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData, setUserData } = useContext(GlobalContext);

  const handleSubmit = async e => {
    e.preventDefault();
    loginQuery.mutate({
      email,
      password
    });
  };

  useEffect(() => {
    if (loginQuery.isSuccess) {
      setUserData({ ...loginQuery.data.data, isLoggedIn: true });
      router.replace('/');
    }
    if (loginQuery.isError) {
      setError(loginQuery.error.response.data.message);
      loginQuery.reset();
    }
  }, [loginQuery, router, setUserData]);

  if (!userData) {
    return <Loader />;
  }

  if (userData && userData.isLoggedIn) {
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
        loader={ImageKitLoader}
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
          <br />
          <br />
          <FrinksButton text="Login" type="submit" />
          <p className="forgot">
            Unable to login? Reach out to <span>Administrator</span>.
          </p>
        </form>
      </div>
    </Container>
  );
};

export default Login;
