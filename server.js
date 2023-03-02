const fs = require('fs');
const next = require('next');
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { default: axios } = require('axios');

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/api/init', async (req, res) => {
      const passwordData = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'password.json'), 'utf8')
      );
      res.send(passwordData.is_belt_deactivated);
    });
    server.post('/api/bypass/:password', async (req, res) => {
      // check if backend is working fine if true then do not bypass
      const { password } = req.params;
      const filePath = path.join(__dirname, '..', 'password.json');
      const passwordData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (
        parseInt(password, 10) === parseInt(passwordData.master_password, 10)
      ) {
        spawn('python3 usbrelayController.py', { shell: true });
        const newPassword = Math.floor(100000 + Math.random() * 900000);
        passwordData.is_belt_deactivated = true;
        passwordData.master_password = newPassword;
        fs.writeFileSync(filePath, JSON.stringify(passwordData), {
          encoding: 'utf8',
          flag: 'w'
        });
        axios.post(
          'http://localhost:9000/api/configuration/disable-belt-tripping'
        );
        return res.send({ success: true, error: null });
      }
      res.send({ success: false, error: 'Password incorrect' });
    });
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
