import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "./CommonComponents/Layout/MainLayout";
import RoutesComponent from "./routes/RoutesComponent";
import { configureStore } from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainLayout>
        <RoutesComponent />
      </MainLayout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
