import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import axios from "axios";
import { API_URL, TOKEN_KEY } from "./constants";

export function OAuthRedirect() {
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const axiosInstance = axios.create();

  useEffect(() => {
    const url = API_URL + `/api/auth/${params.providerName}/callback${location.search}`

    axios.get(url)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${response.status}`);
        }

        let jwt = response.data.jwt;
        
        localStorage.setItem(TOKEN_KEY, jwt);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        setText('You have been successfully logged in.  If you are not redirected, please <a href="/">click here</a>.');
        setTimeout(() => navigate('/'), 0);
      })
      .catch(error => {
        throw new Error(`Couldn't login to Strapi. Status: ${error}`);
      })
  }, [location.search, params.providerName]);

  return (
    <p>{text}</p>
  )
};