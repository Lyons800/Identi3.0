// Component OptionsHeader

import { useState, useEffect} from "react";
import "./OptionsContent.css";
import ceramicLogo from "~/assets/ceramic-logo.svg";
import litLogo from "~/assets/lit-logo.png"
import browser from "webextension-polyfill";


import { Integration } from 'lit-ceramic-sdk'

import {Buffer} from 'buffer';
window.Buffer = Buffer;

function OptionsContent(props) {
  const ceramicURL = new URL(ceramicLogo, import.meta.url).href;
  const litURL = new URL(litLogo, import.meta.url).href;
  
  const litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon');
  const streamID = 'kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au' // test data

  const testCookie = {"name":"OGPC","value":"19027681-1:","domain":".google.com","hostOnly":false,"path":"/","secure":false,"httpOnly":false,"sameSite":"no_restriction","session":false,"firstPartyDomain":"","partitionKey":null,"expirationDate":1658775097,"storeId":"firefox-default"}; // test cookie
  
  const [count, setCount] = useState(0);
  
  useEffect( () => {
    console.log("Loading LitCeramicIntegration");
    litCeramicIntegration.startLitClient(window);
  });
  
  // useEffect(() => {
    //   let getting = browser.cookies.getAllCookieStores();
    //   getting.then(logStores);
    // });
    
    function logStores() {
      let getting = browser.cookies.getAll({});
      
      getting.then ((cookies) => {
      for (let cookie of cookies) {
        console.log(`${JSON.stringify(cookie)}`)
        console.log(`Cookie-name: ${cookie.name} and cookie-value: ${cookie.value}`);
      }
    });

  }

  function setCookie(cookie) {
    browser.cookies.set(cookie);
  }


  function getHostURL(cookie) {
    // If the modified cookie has the flag isSecure, the host protocol must be https:// in order to
    // modify or delete it.
    var host_protocol = (cookie.secure) ? 'https://' : 'http://';
    return host_protocol + cookie.domain + cookie.path;
}

function cookieForCreationFromFullCookie(fullCookie) {
  var newCookie = {};
  //If no real url is available use: "https://" : "http://" + domain + path
  newCookie.url = "http" + ((fullCookie.secure) ? "s" : "") + "://" + fullCookie.domain + fullCookie.path;
  newCookie.name = fullCookie.name;
  newCookie.value = fullCookie.value;
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  // If domain is ommitted is uses URL
  // if (!fullCookie.hostOnly)
  //     newCookie.domain = fullCookie.domain;
  newCookie.path = fullCookie.path;
  newCookie.secure = fullCookie.secure;
  newCookie.httpOnly = fullCookie.httpOnly;
  if (!fullCookie.session)
      newCookie.expirationDate = fullCookie.expirationDate;
  newCookie.storeId = fullCookie.storeId;
  return newCookie;
}

  function storeCookies(cookies) {

    for (let cookie of cookies) {

      cookie = cookieForCreationFromFullCookie(cookie);
  
      console.log(JSON.stringify(cookie));

      (browser.cookies.set(cookie))
      .then((ret) => {console.log(`cookie successfully: ${JSON.stringify(ret)}`)})
      .catch((error) => {
        console.error(`Error Message: ${error}`);
      
    } )
  }

  }



  function readCeramic() {
    console.log('this is the streamID youre sending: ', streamID);
    const response = litCeramicIntegration.readAndDecrypt(streamID).then(
      (value) =>{
        console.log(`Return promise: ${value}`);
      }
    );

    console.log(response);
  }

  return (
    <div>
    <div class="row">
      <div class="col-xs-12 alert hide" role="alert" id="alerts"></div>
      <div class="col-xs-offset-10 col-xs-2">
        <span class="badge rounded-pill bg-secondary" id="userDID">Not Connected</span>
      </div>
    </div>
    <div>
      <img id="logo" src={litURL} alt="lit ceramic playground" />
      +
      <img id="logo" src={ceramicURL} alt="web playground logo" />
    </div>
    <h1>Lit / Ceramic Web Playground</h1>
    <p>
      Test out the Lit / Ceramic integration.
      <br />
      Encrypt with Lit and commit to the Ceramic network
      <br />
      then read from it back using ceramic and decrypt with Lit.
    </p>
    <form>
      <br />
      <label for="fname">Secret:</label>
      <input type="text" id="secret" name="secret" value="Type Secret Here!" /><br />
    </form>
    <button type="button" onClick={readCeramic}> Click-lit </button>
    <button type="button" onClick={logStores}> Console log Cookies </button>
    <button type="button" onClick={() => {storeCookies([testCookie]);}}> Console log Cookies </button>
    </div>
  );
}

export default OptionsContent;
