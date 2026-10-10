import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Accordion from "./components/accordion/Accordion";
import RandomColor from "./components/random-color/RandomColor";
import StarRating from "./components/star-rating/StarRating";
import ImageSlider from "./components/image-slider/ImageSlider";
import LoadMoreData from "./components/load-more-data/LoadMoreData";

const pages = [
  { key: "accordion", element: <Accordion /> },
  { key: "random-color", element: <RandomColor /> },
  { key: "star-rating", element: <StarRating /> },
  {
    key: "image-slider",
    element: (
      <ImageSlider url="https://picsum.photos/v2/list" page={1} limit={10} />
    ),
  },
  { key: "load-more-data", element: < LoadMoreData/> },
];

function App() {
  const [page, setPage] = useState(0);

  // გადადის შემდეგ გვერდზე (0 -> 1 -> 2 -> 3 -> 0)
  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const current = pages[page];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <button onClick={handleNext} style={{ alignSelf: "flex-start" }}>
      Next
    </button>

    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",      
        justifyContent: "center",  
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ rotateY: -90 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: 90 }}
          transition={{ duration: 0.6 }}
        >
          {current.element}
        </motion.div>
      </AnimatePresence>
    </main>
  </div>
  );
}

export default App;
