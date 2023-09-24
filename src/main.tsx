import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index.ts'
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundry.tsx'
import RootRouter from './routes/RootRouter.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>,
  </Provider>
)
