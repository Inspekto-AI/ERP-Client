import Image from 'next/image';
import Link from 'next/link';
import { Grid } from '@material-ui/core';

import ImageKitLoader from 'utils/ImageLoader';
import Container from './Footer.styles';

const Footer = () => {
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
            <Grid container spacing={4}>
              <Grid item md={3} xs={6} className="top-links">
                <div className="sub-heading">About</div>
                <div className="links">
                  <p>
                    Our cutting-edge AI technology that supports your business
                    decisions through sophisticated video monitoring, producing
                    unimaginable insights.
                  </p>
                </div>
              </Grid>
              <Grid item md={3} xs={6} className="top-links">
                <div className="sub-heading">Industries</div>
                <div className="links">
                  <Link href="/industries#manufacturing">Manufacturing</Link>
                  <Link href="/industries#oil-and-gas">Oil &amp; Gas</Link>
                  <Link href="/industries#banking">Banking</Link>
                </div>
              </Grid>
              <Grid item md={3} xs={6}>
                <div className="sub-heading">Site Map</div>
                <div className="links">
                  <Link href="/aboutus">About Us</Link>
                  <Link href="/industries">Industries</Link>
                  <Link href="/contactus#team">Team</Link>
                </div>
              </Grid>
              <Grid item md={3} xs={6}>
                <div className="sub-heading">Contact</div>
                <div className="links">
                  <Link href="/contactus">Contact Us</Link>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </Container>
  );
};

export default Footer;
