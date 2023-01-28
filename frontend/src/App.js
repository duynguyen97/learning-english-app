import Message from 'components/Message';
import routerConfig from 'configs/routerConfig';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const { routes, renderRoutes } = routerConfig;

function App() {
  // TODO: check authenticate
  const isAuth = false;
  return (
    <>
      <Router>
        <Suspense>
          <Routes>
            {renderRoutes(routes, isAuth)}
            <Route path="*" element={<>NotFoundPage</>} />
          </Routes>
        </Suspense>
        <Message />
      </Router>
    </>
  );
}

export default App;
