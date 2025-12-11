import "./Pipeline.css";
import { motion } from "framer-motion";

function Pipeline({ goTo }) {
  return (
    <motion.div
      className="pipeline-container"
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* BACK BUTTON */}
      <p className="back" onClick={() => goTo("home")}>
        ← Back to home
      </p>

      {/* TITLE */}
      <h1 className="pipeline-title">Model Pipeline</h1>

      <motion.div
        className="title-underline"
        initial={{ width: 0 }}
        animate={{ width: 240 }}
        transition={{ duration: 0.8 }}
      />

      <p className="pipeline-sub">
        A clean breakdown of how the SimCLR-based Cats vs Dogs model works
      </p>

      {/* STAGES */}
      <div className="pipeline-stage">
        <h2>1. Image Input & Preprocessing</h2>
        <ul>
          <li>User uploads an image</li>
          <li>
            Image resized to <b>224×224</b>
          </li>
          <li>Converted into PyTorch tensor</li>
          <li>Normalized before feeding to model</li>
        </ul>
      </div>

      <div className="pipeline-stage">
        <h2>2. SimCLR Augmentations</h2>
        <ul>
          <li>Random Crop</li>
          <li>Color Jitter</li>
          <li>Gaussian Blur</li>
          <li>Horizontal Flip</li>
        </ul>
        <p className="note">
          Two differently augmented versions of the same image are created.
        </p>
      </div>

      <div className="pipeline-stage">
        <h2>3. Encoder CNN</h2>
        <p>
          A custom CNN extracts features. The output is a{" "}
          <b>256-dimensional representation</b>.
        </p>
      </div>

      <div className="pipeline-stage">
        <h2>4. Projection Head</h2>
        <p>
          The 256-dim feature goes through two linear layers to produce a
          <b>128-dim projection</b> used for contrastive learning.
        </p>
      </div>

      <div className="pipeline-stage">
        <h2>5. Contrastive Training (SimCLR)</h2>
        <p>Using NT-Xent loss, the model learns to:</p>
        <ul>
          <li>Pull together augmented views of the same image</li>
          <li>Push apart views of different images</li>
        </ul>
      </div>

      <div className="pipeline-stage">
        <h2>6. PCA + KMeans Clustering</h2>
        <ul>
          <li>Features reduced from 256 → 50 using PCA</li>
          <li>KMeans clusters images into 2 groups</li>
          <li>
            Groups mapped to: <b>Cats vs Dogs</b>
          </li>
        </ul>
      </div>

      <div className="pipeline-stage">
        <h2>7. Final Prediction</h2>
        <p>
          For an uploaded image, features → PCA → KMeans → <b>Cat or Dog</b>.
        </p>
      </div>
    </motion.div>
  );
}

export default Pipeline;
