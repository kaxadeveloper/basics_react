import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Accordion from "./components/accordion/Accordion";
import RandomColor from "./components/random-color/RandomColor";
import StarRating from "./components/star-rating/StarRating";

function App() {
  const [page, setPage] = useState(0);

  // გადადის შემდეგ გვერდზე (0 -> 1 -> 2 -> 0)
  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % 3);
  };

  return (
    <>
      <button onClick={handleNext}>Next</button>

      <AnimatePresence mode="wait">
        {page === 0 ? (
          <motion.div
            key="accordion"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.6 }}
          >
            <Accordion />
          </motion.div>
        ) : page === 1 ? (
          <motion.div
            key="random"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.6 }}
          >
            <RandomColor />
          </motion.div>
        ) : (
          <motion.div
            key="star-rating"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.6 }}
          >
            <StarRating />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;