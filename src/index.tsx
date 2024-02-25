import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LearnSetState } from './lessons/learnSetState'
import {LearnDesignPatterns} from './lessons/LearnDesignPatterns'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'setState',
        element: <LearnSetState />
      },
      {
        path: 'design-patterns',
        element: <LearnDesignPatterns />
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
