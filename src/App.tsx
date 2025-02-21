import { BrowserRouter } from 'react-router-dom'; // Import routing components
import AppRoutes from './routes';
// For 404 page (optional but recommended)

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;