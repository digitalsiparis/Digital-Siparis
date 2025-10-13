import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./app.css";
import { CartProvider } from "./context/CartContext";
import DSNavbar from "./components/DSNavbar";
import DSFooter from "./components/DSFooter";
export default function App(){
  React.useEffect(()=>{document.documentElement.style.setProperty("--ds-accent",(import.meta.env.VITE_BRAND_ACCENT||"#4C6857E6"));},[]);
  return (<CartProvider><DSNavbar/><RouterProvider router={router}/><DSFooter/></CartProvider>);
}
