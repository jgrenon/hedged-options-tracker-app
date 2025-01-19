import App from '../../App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Strategies } from '../strategies';
import { Strategy } from '../strategy';
import { Cycles } from '../cycles';
import { CycleTracker } from '../cycle-tracker';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/strategies">
          <Route index element={<Strategies />} />
          <Route path=":id" element={<Strategy />} />
        </Route>
        <Route path="/cycles">
          <Route index element={<Cycles />} />
          <Route path=":id" element={<CycleTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
