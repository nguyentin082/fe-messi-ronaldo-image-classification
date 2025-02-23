import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { IoIosNotifications } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

function MyToast({ errors, setErrors }) {
    const handleClose = (index) => {
        setErrors((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <ToastContainer
            position="top-end"
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 1050 }}
        >
            <AnimatePresence>
                {errors.map((error, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Toast
                            onClose={() => handleClose(index)}
                            show={true} // Đảm bảo toast luôn hiện khi render
                            autohide
                            delay={3000}
                            onExited={() => handleClose(index)}
                        >
                            <Toast.Header>
                                <IoIosNotifications
                                    size={23}
                                    className="me-2 text-warning"
                                />
                                <strong className="me-auto">WARNING !!!</strong>
                            </Toast.Header>
                            <Toast.Body>{error}</Toast.Body>
                        </Toast>
                    </motion.div>
                ))}
            </AnimatePresence>
        </ToastContainer>
    );
}

export default MyToast;
