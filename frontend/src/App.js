import Message from 'components/Message';
import routerConfig from 'configs/routerConfig';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getUserInfo } from 'redux/slices/userInfo.slice';

const { routes, renderRoutes } = routerConfig;

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  // get user info
  useEffect(() => {
    dispatch(getUserInfo());
    return () => {};
  }, []);

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
