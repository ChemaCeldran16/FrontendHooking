import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CallbackPage() {
    const navigate = useNavigate();
    useEffect(() => {
    // Obtén los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauth_token');
    const oauthVerifier = urlParams.get('oauth_verifier');

    const text_tweet = localStorage.getItem("tweetText");

    // Verifica si los parámetros existen
    if (!oauthToken || !oauthVerifier) {
      console.error('Error: Falta el token o el verifier en la URL');
      return;
    }
    console.log('oauthToken:', oauthToken);
    console.log('oauthVerifier:', oauthVerifier);
    console.log('text_tweet:', text_tweet);

    // Envía los parámetros al backend
    fetch('http://127.0.0.1:8000/api/callbackTwitter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oauth_token: oauthToken, oauth_verifier: oauthVerifier,text: text_tweet,}),
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta del backend
        console.log('Respuesta del backend: ', data);
      })
      .catch(error => {
        console.error('Error enviando los parámetros al backend: ', error);
      });
    navigate("/local");  
  }, []);

  return (
    <div>
      <p>Procesando callback de Twitter...</p>
    </div>
  );
}

export default CallbackPage;
