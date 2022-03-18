import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "./CommonComponents/Layout/MainLayout";
import RoutesComponent from "./routes/RoutesComponent";
import { Provider } from "react-redux";
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