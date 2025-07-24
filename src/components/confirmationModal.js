import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Home } from 'lucide-react';
import '../styles/confirmation.css';

const ConfirmationModal = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={60} />
          </motion.div>

          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out! I'll get back to you as soon as possible.</p>

          <div className="modal-buttons">
            <motion.button
              className="btn btn-primary"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              Continue Exploring
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
