import logo from "~/assets/logo.svg";
import "./App.css";
import IDLogo from "~/assets/BlkIDENTI3 Logo.png"

function App() {
  const logoImageUrl = new URL(logo, import.meta.url).href;

  return (
    <div className="logo">
      <img src={IDLogo} height="50" alt="" />
    </div>
  );
}

export default App;
