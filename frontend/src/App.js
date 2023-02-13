import Loading from 'components/Loading';
import Message from 'components/Message';
import routerConfig from 'configs/routerConfig';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getUserInfo } from 'redux/slices/userInfo.slice';

const { routes, renderRoutes } = routerConfig;

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useSelector((state) => state.userInfo);

  // get user info
  useEffect(() => {
    dispatch(getUserInfo());
    setLoading(false);
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Suspense fallback={<Loading />}>{renderRoutes(routes, isAuth)}</Suspense>
          <Message />
        </Router>
      )}
    </>
  );
}

export default App;
