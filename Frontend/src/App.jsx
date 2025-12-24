import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // CSS import karna bahut zaruri hai

const App = () => {
  return (
    <>
      <AppRoutes />
      {/* ToastContainer hamesha alag se niche ya upar rakha jata hai */}
      <ToastContainer position="top-center" theme="dark" autoClose={2000} />
    </>
  );
};

export default App;