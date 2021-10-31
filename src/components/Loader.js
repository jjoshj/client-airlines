import React,  {useState} from "react";
import SkewLoader from "react-spinners/SkewLoader";
function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  
  return (
    <div style={{marginTop:'150px'}}>
<div className="sweet-loading text-center">
        <SkewLoader color='red' loading={loading} css='' size={180} />
      </div>
    </div>
  );
};

export default Loader;
