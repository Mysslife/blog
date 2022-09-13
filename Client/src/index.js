import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { Provider } from "react-redux";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Router>
//   </Provider>
// );
