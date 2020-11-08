import logo from './logo.svg';
import './App.css';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'

import { useState } from 'react';

function App() {
  const [testText, setTestText] = useState('')

  async function doStuff() {
    const putResult = await Storage.put('test.json', `{"text":"Hello ${new Date().toISOString()}"}`, { level: 'private', contentType: 'application/json' })
    console.log(putResult)

    const data = await Storage.get(`test.json`, { level: 'private', download: true })
    const text = (await new Response(data.Body).json()).text;
    console.log(text)
    setTestText(text)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{testText}</h1>
        <button onClick={doStuff}>Do Stuff</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
