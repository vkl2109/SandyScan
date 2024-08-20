import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  RootLayout
} from './layout/RootLayout'
import {
  LandingPage,
  ErrorPage,
} from './routes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
