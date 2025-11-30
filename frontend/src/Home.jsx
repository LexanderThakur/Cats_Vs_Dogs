import "./Home.css";
import Card from "./Card";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Cats vs Dogs</h1>

      <motion.div
        className="title-underline"
        initial={{ width: 0 }}
        animate={{ width: 240 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      <motion.p
        className="sub-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Explore Cats vs Dogs classifier — supervised and unsupervised versions
      </motion.p>

      <motion.div
        className="cards-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Card
          title="Inference Mode"
          image_dest="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          des="Try out the model predictions for yourself"
        />
        <Card
          title="Unsupervised Pipline"
          image_dest="/Unsupervised.png"
          des="Understand this models pipline (SimCLR)"
        />
        <Card
          title="Project Code"
          des="Checkout the code for unsupervised model"
          image_dest="/code.png"
        />
      </motion.div>
    </motion.div>
  );
}

export default Home;
