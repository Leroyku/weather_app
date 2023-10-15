import './scss/app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/home/Home';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        {/* <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
