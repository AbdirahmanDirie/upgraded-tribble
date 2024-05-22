import React, { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleLogin = () => {
    const parser = new UAParser();
    const deviceInfo = parser.getResult();

    console.log(deviceInfo)

    const loginData = {
      name:username,
      device: {
        browser: deviceInfo.browser.name,
        browserVersion: deviceInfo.browser.version,
        os: deviceInfo.os.name,
        osVersion: deviceInfo.os.version,
        deviceType: deviceInfo.device.type,
        deviceVendor: deviceInfo.device.vendor,
        deviceModel: deviceInfo.device.model,
      },
      location,
    };

    console.log('Login Data:', loginData);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);



  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label>
            Name:
            <input type="text" placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
