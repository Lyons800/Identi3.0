import { useState } from "react";
import "./PageContent.css";
import logo from "~/assets/logo.svg";
import browser from "webextension-polyfill";
import IDLogo from "~/assets/BlkIDENTI3 Logo.png";


function PageContent(props) {
  const imageUrl = new URL(IDLogo, import.meta.url).href;

  const [count, setCount] = useState(0);

  return (
    <div>
      <img src={imageUrl} height="45" alt="" />
      <h1>{props.children}</h1>
      <button type="button" onClick={()=> { browser.runtime.openOptionsPage() }}>
      Open IDENTI3
      </button>
    </div>
  );
}

export default PageContent;
