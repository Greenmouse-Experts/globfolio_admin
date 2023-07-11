import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/shared/redux/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layouts } from '@/shared/components/layouts/Layout';
import { MyAppProps } from '@/shared/components/layouts/Types';
import '@/styles/globals.css'



export default function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: MyAppProps) => page);
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
