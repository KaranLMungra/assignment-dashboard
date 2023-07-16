import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./pages/App"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import View from "./pages/View"
import Update from "./pages/Update"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/view",
    element: <View />
  },
  {
    path: "/user/update",
    element: <Update />
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
