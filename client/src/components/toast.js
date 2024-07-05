import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

// Optional: configure toast options (position, duration, etc.)
const ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
};

export const SuccessToast = (message) => {
  toast.success(message, ToastOptions);
};

export default ToastContainer;  // Include this at the top level of your app
