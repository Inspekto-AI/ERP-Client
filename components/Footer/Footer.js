import Image from 'next/image';
import { Grid } from '@material-ui/core';

import ImageKitLoader from 'utils/ImageLoader';
import Container from './Footer.styles';

function Footer() {
  return (
    <Container>
      <footer className="footer">
        <Grid container>
          <Grid item md={2} xs={12} className="logo-container">
            <Image
              src="high_res_logo.svg"
              height={70}
              width={70}
              loader={ImageKitLoader}
            />
          </Grid>
          <Grid item md={10} xs={12}>
            <p className="copyright">&copy;&nbsp;Frinks.ai</p>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
}

export default Footer;
