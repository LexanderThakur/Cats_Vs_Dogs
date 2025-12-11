import { useState } from "react";
import "./Predict.css";
import { motion } from "framer-motion";
const apiBase = "http://127.0.0.1:8000/";

function Predict(props) {
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [sampleIndex, setSampleIndex] = useState(null);

  const [prediction, setPrediction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoad] = useState("Run Model");
  function convertToBase64(fileOrBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(fileOrBlob);
    });
  }

  async function runModel() {
    let image = null;
    if (uploadedFile) {
      image = await convertToBase64(uploadedFile);
    } else if (sampleIndex !== null) {
      const src = samples[sampleIndex];
      const res = await fetch(src);
      const blob = await res.blob();
      image = await convertToBase64(blob);
    }
    if (!image) {
      alert("Please upload or select an image");
      return;
    }
    setLoad("Loading...");

    try {
      const response = await fetch(apiBase + "predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      });
      const data = await response.json();

      console.log(data);
      setPrediction(data);
      setLoad("Run Model");
    } catch (err) {
      console.log("error");
    }
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedPreview(URL.createObjectURL(file)); // show preview only for upload
    setSampleIndex(null); // remove highlight from samples
    setPrediction(null);
    setShowDetails(false);
  }

  const samples = [
    "/sample1.jpg",
    "/sample2.jpg",
    "/sample3.jpg",
    "/sample4.jpg",
    "/sample5.jpg",
    "/sample6.jpg",
    "/sample7.jpg",
  ];
  // hello
  return (
    <div className="predict-container">
      {/* HEADER */}
      <div className="predict-header">
        <p className="back" onClick={() => props.goTo("home")}>
          ← Back to home
        </p>
        <h1 className="title">Inference Mode</h1>
        <motion.div
          className="title-underline"
          initial={{ width: 0 }}
          animate={{ width: 240 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
        <p className="subtitle">
          Upload an image or select one of the sample inputs
        </p>
      </div>

      {/* MAIN CARD */}
      <motion.div
        className="big-card"
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="predict-grid">
          {/* LEFT: INPUT */}
          <div className="input-box">
            <h2>Input Image</h2>

            <div className="sample-grid-2row">
              {/* UPLOAD BOX */}
              <label
                className={`upload-mini sample-mini ${
                  uploadedPreview ? "selected-img" : ""
                }`}
              >
                {uploadedPreview ? (
                  <img src={uploadedPreview} className="preview-mini" />
                ) : (
                  <div className="plus-box">+</div>
                )}
                <input type="file" onChange={handleImage} />
              </label>

              {/* SAMPLE IMAGES */}
              {samples.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className={`sample-mini ${
                    sampleIndex === index ? "selected-img" : ""
                  }`}
                  onClick={() => {
                    setSampleIndex(index); // highlight this sample
                    setUploadedPreview(null); // remove upload preview
                    setUploadedFile(null);
                    setPrediction(null);
                  }}
                />
              ))}
            </div>

            <button className="predict-btn" onClick={runModel}>
              {loading}
            </button>
          </div>

          {/* RIGHT: OUTPUT */}
          {/* RIGHT: OUTPUT */}
          <div className="output-box">
            <h2>Model Output</h2>

            {!prediction && (
              <p className="placeholder">Prediction will appear here</p>
            )}

            {prediction && (
              <div className="prediction-card">
                {(uploadedPreview || sampleIndex !== null) && (
                  <img
                    src={uploadedPreview || samples[sampleIndex]}
                    className="output-img"
                    alt="Selected"
                  />
                )}

                <p className="pred-label">{prediction.label}</p>
                <p className="sub-title">(or something ugly)</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* UNDER THE HOOD */}
      {showDetails && (
        <div className="details-box">
          <h2>Under the Hood</h2>

          <div className="under-grid">
            <div>
              <h3>Augmentations</h3>
              <div className="aug-grid">
                <img src="/aug_original.jpg" />
                <img src="/aug_crop.jpg" />
                <img src="/aug_blur.jpg" />
                <img src="/aug_jitter.jpg" />
              </div>
            </div>

            <div>
              <h3>Embedding Visualization</h3>
              <div className="embedding-placeholder">
                <p>UMAP / t-SNE plot will go here</p>
              </div>
            </div>

            <div>
              <h3>Model Pipeline</h3>
              <p className="pipeline">
                Input → Augment → Encoder → Projection Head → Embedding →
                Prediction
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
