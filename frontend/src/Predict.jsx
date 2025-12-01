import { useState } from "react";
import "./Predict.css";

function Predict() {
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [sampleIndex, setSampleIndex] = useState(null);

  const [prediction, setPrediction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedPreview(URL.createObjectURL(file)); // show preview only for upload
    setSampleIndex(null); // remove highlight from samples
    setPrediction(null);
    setShowDetails(false);
  }

  async function runModel() {
    setPrediction({ label: "Dog", confidence: 92.4 });
    setShowDetails(true);
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

  return (
    <div className="predict-container">
      {/* HEADER */}
      <div className="predict-header">
        <p className="back">← Back to home</p>
        <h1 className="title">Inference Mode</h1>
        <p className="subtitle">
          Upload an image or select one of the sample inputs
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="big-card">
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
                  }}
                />
              ))}
            </div>

            <button className="predict-btn" onClick={runModel}>
              Run Model
            </button>
          </div>

          {/* RIGHT: OUTPUT */}
          <div className="output-box">
            <h2>Model Output</h2>

            {!prediction && (
              <p className="placeholder">Prediction will appear here</p>
            )}

            {prediction && (
              <div className="prediction-card">
                <p className="pred-label">{prediction.label}</p>
                <p className="pred-score">
                  {prediction.confidence}% confidence
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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
