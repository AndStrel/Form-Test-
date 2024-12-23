import { UserForm } from '@components/userForm';
import { HomePage } from '@pages/homePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="form" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
