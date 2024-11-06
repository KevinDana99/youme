import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const element = document.createElement("p");
const divElement = document.createElement("div");
element.setAttribute("class", "form-row form-row-wide validate-required");
divElement.setAttribute("id", "shop-selector");
const formDestination = document.querySelector(
  ".woocommerce-billing-fields__field-wrapper"
);
element.appendChild(divElement);
formDestination?.appendChild(element);

const root = ReactDOM.createRoot(
  document.getElementById("shop-selector") as HTMLElement
);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
