import { BrowserRouter } from 'react-router-dom'; // Import routing components
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
// For 404 page (optional but recommended)

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;