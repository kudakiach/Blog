import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, Route, Link,} from 'react-router-dom'
import HomePage from "./routes/HomePage.jsx"
import SinglePostPage from "./routes/SinglePostPage.jsx"
import PostListPage from "./routes/PostListPage.jsx"
import Write from "./routes/Write.jsx"
import RegisterPage from "./routes/RegisterPage.jsx"
import LoginPage from "./routes/LoginPage"
import MainLayout from './Layouts/mainLayout.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path:'/',
        element: <HomePage />
      },
      {
        path:'posts',
        element: <PostListPage />
      },
      {
        path:'/:slug',
        element: <SinglePostPage />
      },
      {
        path:'register',
        element: <RegisterPage />
      },
      {
        path:'login',
        element: <LoginPage />
      },
      {
        path:'write',
        element: <Write />
      },
    ]
  }
  
  
])

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  
    
 
)
