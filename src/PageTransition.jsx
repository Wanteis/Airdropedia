import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } },
};

const PageTransition = ({ children, keyId }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyId}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default PageTransition;
