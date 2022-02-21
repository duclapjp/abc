import React from "react";
import { Provider } from "react-redux";
import GlobalStyles from "@iso/assets/styles/globalStyle";
import { store } from "./redux/store";
import Boot from "./redux/boot";
import Routes from "./router";
import AppProvider from "./AppProvider";
import "moment/locale/ja";

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
  </Provider>
);
Boot().then(App).catch(console.error);

export default App;
