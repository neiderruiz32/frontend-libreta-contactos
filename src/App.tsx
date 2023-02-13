import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Componentes
import Contacts from "./components/Contact";
import NewContact from "./components/NewContact";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Contacts /> },
    { path: "new", element: <NewContact /> },
    { path: "/contact/:id/edit", element: <NewContact /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
