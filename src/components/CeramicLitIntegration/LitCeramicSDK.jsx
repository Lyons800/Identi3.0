
import { Integration } from 'lit-ceramic-sdk'




function LitCeramicIntegration(props) {

    // const litCeramicIntegration = new Integration('https://ceramic-clay.3boxlabs.com', 'polygon');


    const imageUrl = new URL(logo, import.meta.url).href;
  
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     console.log("using litCeramicIntegration");
    //     litCeramicIntegration.startLitClient(window);
    //   }, []);
  
    return (
      <div>
        <button type="button" onClick={()=> { console.log({litCeramicIntegration}) }}/>
      </div>
    );
  }
  
  export default LitCeramicIntegration;
  