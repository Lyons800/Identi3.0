// Component OptionsHeader

import { useState, useEffect } from "react";
import "./OptionsContent.css";
import ceramicLogo from "~/assets/ceramic-logo.svg";
import litLogo from "~/assets/lit-logo.png"
import browser from "webextension-polyfill";
import IDLOGO from "~/assets/BlkIDENTI3 Logo.png";

import ListContent from "./ListContent";



import { Integration } from 'lit-ceramic-sdk'

import worldID from "@worldcoin/id"; // If you installed the JS package as a module

import { Buffer } from 'buffer';
window.Buffer = Buffer;






function OptionsContent(props) {
  const ceramicURL = new URL(ceramicLogo, import.meta.url).href;
  const litURL = new URL(litLogo, import.meta.url).href;
  const IDURL = new URL(IDLOGO, import.meta.url).href

  const litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'ethereum');
  const [streamID, setStreamID] = useState('kjzl6cwe1jw147kkwar4xxi3326mtm4xwxy0npg9s2juu43gzgzkbszkobec14s') // test data

  const testCookie = process.env.COOKIE; // test cookie

  // const stringToEncrypt = "THIS IS THE WAY3";

  const [cookieList, setCookieList] = useState();

  const [count, setCount] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [sessionStarted, setSessionStarted ] = useState(false);

  const [hiddenRead, setHiddenRead] = useState(false);
  const [hiddenRead1, setHiddenRead1] = useState(false);
  const [hiddenRead2, setHiddenRead2] = useState(false);
  const [hiddenRead3, setHiddenRead3] = useState(false);
  const [hiddenRead5, setHiddenRead5] = useState(false);

  const [worldVerifed, setWorldVerified] = useState(false);

  useEffect(() => {
    console.log("Loading LitCeramicIntegration");
    litCeramicIntegration.startLitClient(window);
  });

  useEffect(() => {

    worldID.init("world-id-container", {

      enable_telemetry: true,

      action_id: "wid_staging_5e03c227d10d4f4edb1c2d4a6c3b38fe",

      signal: "mySignal" // <- Set an appropriate signal for each user

    });


    worldID.enable() // <- Send 'result' to your backend or smart contract
      .then((result) => { console.log("World ID verified successfully!"); setWorldVerified(true);  })
      .catch(() => { console.warn("World ID verification failed:", failure) }); // Re-activate here so your end user can try again




  }, []);

  // useEffect(() => {
  //   let getting = browser.cookies.getAllCookieStores();
  //   getting.then(logStores);
  // });

  function logStores() {
    let getting = browser.cookies.getAll({});

    getting.then((cookies) => {
      
      setCookieList(cookies);
      console.log(`${JSON.stringify(cookieList)}`);

      // for (let cookie of cookies) {
      //   console.log(`${JSON.stringify(cookie)}`)
      //   console.log(`Cookie-name: ${cookie.name} and cookie-value: ${cookie.value}`);
      // }

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
        .then((ret) => { console.log(`cookie successfully: ${JSON.stringify(ret)}`) })
        .catch((error) => {
          console.error(`Error Message: ${error}`);

        })
    }

  }



  function read_and_decryptCeramic() {
    console.log('this is the streamID youre sending: ', streamID);
    const response = litCeramicIntegration.readAndDecrypt(streamID).then(
      (cookie) => {
        console.log(`Return promise: ${cookie}`);
        setCookieList(JSON.parse(cookie));
      }
    );

    console.log(response);
  }

  const updateStreamID = (resp) => {
    const newStreamID = resp;
    console.log('you now have this as your streamID', newStreamID);

    setStreamID(newStreamID);
  }

  function write_and_encryptCeramic() {
    console.log('chain in litCeramicIntegration: ', litCeramicIntegration.chain)

    // const accessControlConditions = [
    //   // {
    //   //   contractAddress: '',
    //   //   standardContractType: '',
    //   //   chain: '',
    //   //   method: '',
    //   //   parameters: [':userAddress'],
    //   //   returnValueTest: {
    //   //     comparator: '=',
    //   //     value: '0xDe56C4BccD8e2618f9F7090b221E171e6fA5BFd3',
    //   //   },
    //   // },
    //   // {"operator": "or"},
    //   {
    //     contractAddress: '',
    //     standardContractType: '',
    //     chain: '',
    //     method: '',
    //     parameters: [':userAddress'],
    //     returnValueTest: {
    //       comparator: '=',
    //       value: '0xAA6a659CF3D9ce2378Bc8A74F2C33273E6F0F37A',
    //     },
    //   },

    // ]

    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0',
        },
      },
    ]

    const stringToEncrypt = JSON.stringify(cookieList);

    const response = litCeramicIntegration
      .encryptAndWrite(stringToEncrypt, accessControlConditions)
      .then((value) => updateStreamID(value));

    console.log(response)


  }

  // React.useEffect(() => {
  //   console.log(`initializing interval`);
  //   const interval = setInterval(() => {
  //     updateTime();
  //   }, 1000);

  //   return () => {
  //     console.log(`clearing interval`);
  //     clearInterval(interval);
  //   };
  // }, []); // has no dependency - this will be called on-component-mount

  //Timer function/component for user browsing session time


  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };


    useEffect(() => {
      let interval = null;

      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setTime((time) => time + 10);
        }, 10);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);



  function Timer(props) {
    return (
      <div className="timer">
        <span className="digits">
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((props.time / 10) % 100)).slice(-2)}
        </span>
      </div>
    );
  }

  const StartButton = (prop) => {

    return (
    <div className="btn btn-one btn-start"
      onClick={handleStart}>
      Start
    </div>
    );
    }
  const ActiveButtons = () => {

    return (
    <div className="btn-grp">
      <div className="btn btn-two"
        onClick={handleReset}>
        Reset
      </div>
      <div className="btn btn-one"
        onClick={handlePauseResume}>
        {props.isPaused ? "Resume" : "Pause"}
      </div>
    </div>
    );
  }

  const ControlButtons = (prop) => {

    const controlValue = { isPaused: props.isPaused }


    return (
      <> 
      <StartButton>

      </StartButton>
      <ActiveButtons {...controlValue} >

      </ActiveButtons>
      </>

    );

  }


  //export default StopWatch;


  return (
    <div>
      <div class="row">
        <div class="col-xs-12 alert hide" role="alert" id="alerts"></div>
        <div class="col-xs-offset-10 col-xs-2">
          <span class="badge rounded-pill bg-secondary" id="userDID">Not Connected</span>
        </div>
      </div>
      <div>
        <img id="logo" src={IDURL}/>
       
      </div>
      <h1>Identi3</h1>
      <p>
        Welcome, here you can choose from the following optons:

        <br />

        <br />

      </p>


      <div id="world-id-container"></div>

      <div class = "buttons">
      {  hiddenRead &&  streamID === '' ?  null : <button type="button" onClick={() => {read_and_decryptCeramic(); setHiddenRead(false); setHiddenRead3(true); }}> Read and Decrypt Cookie Data from IDENTI3 </button> }

      

      {  hiddenRead1  && <button type="button" onClick={write_and_encryptCeramic}> Write and Encrypt Cookie Data from Browser to IDENTI3</button> }


      {  sessionStarted == false ? 
                  <button type="button" onClick={() => { setHiddenRead(true) ; setHiddenRead2(true); setSessionStarted(true); }}> Start Youre browsing session </button> 
            :
               <button type="button" onClick={() => { logStores(); setHiddenRead5(true); }}> Close Session  </button> }


      {/* {  hiddenRead2  && <button type="button" onClick={logStores}> Close Session  </button> } */}
      {  hiddenRead3  && <button type="button" onClick={() => { storeCookies(cookieList); }}> Import Cookies from Identi3 to your browser</button> }

      </div>


      {sessionStarted == true ? <h3> Session Started</h3> : <h3> Session Not Started </h3>}

      <div className="Control-Buttons">
        <div>{props.active ? ActiveButtons : StartButton}</div>
      </div>

      {  hiddenRead5  && <button type="button" onClick={() => { write_and_encryptCeramic(); setSessionStarted(false); setHiddenRead5(false); } }> (export Cookies)  </button> }

      <ListContent cookieListProp={cookieList}> </ListContent> 

      
    </div>


  );
}

export default OptionsContent;
