import Layout from '../../components/Layout';
import { useContext, useState } from 'react';
import { useMemo } from 'react';
import MainRoutes from './MainRoutes';
import GuestRoutes from './GuestRoutes';
import { useEffect } from 'react';
// import { LoggingContext } from '../../contexts/LoggingContext';

export default function Routes() {
  // const { logging } = useContext(LoggingContext)
  // const [redirect, setRedirect] = useState(false)

  // const authorized = useMemo(() => logging.authorized, [logging])
  // const YourRoutes = useMemo(() => authorized ? MainRoutes : GuestRoutes, [authorized])

  // useEffect(() => {
  //   setRedirect(true)
  // }, [authorized])

  // useEffect(() => {
  //   if (redirect) setTimeout(() => {
  //     setRedirect(false)
  //   })
  // }, [redirect])

  return (
      <Layout name="BlankLayout" >
        {/* {!redirect && <GuestRoutes/>} */}
        <GuestRoutes />
      </Layout>
  );
}
