// 1. Install dependencies DONE
// 4. Define references to those DONE
// 5. Load handpose DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw function DONE

// 2. Import dependencies DONE 
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

// import logo from './logo.svg';
import './App.css';
import { useRef } from "react";

function App() {
  
  // 3. Setup webcam dan canvas DONE
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // 4. Load handpose
  const runHandpose = async () =>{
    const net = await handpose.load();
    console.log("Handpose model di load!");

    // looping hand dan deteksi tangan
    setInterval(() => {
      detect(net);
    }, 100);

  };
  const detect = async (net) =>{
    // cek data 
    if(typeof webcamRef.current !== 'undefined' &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4)
    {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoHeight;
      const videoHeight = webcamRef.current.video.videoHeight;
      
      // set video heigh & width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas h & w
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  // run handpose function
  runHandpose();
  const videoConstraints = {
    facingMode: "user"
  };
  return (
    <div className="App">
        <div className="judul">
            <h2>Handpose Infinity Gauntlet</h2>
        </div>
      <header className="App-header">
      <Webcam ref={webcamRef} 
      videoConstraints={videoConstraints}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 1080,
        height: 700,
      }} />
      <canvas 
      ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 1080,
        height: 700,
      }}
      />
      </header>
    </div>
  );
}

export default App;
