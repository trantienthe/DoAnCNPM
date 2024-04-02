import { useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

const ToastNotify = () => {
  const options = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.notify) {
      const { notify } = location.state;
      toast[notify.type](notify.message, { ...options, ...notify.options });

      const newLocationState = { ...location.state };
      delete newLocationState.notify;
      location.state = newLocationState;
    }
  }, [location]);

  return <ToastContainer />;
};

export default ToastNotify;
