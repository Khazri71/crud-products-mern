import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import  {Provider} from "react-redux"
import store from "./redux/app/store"

createRoot(document.getElementById('root')!).render(
  
     <StrictMode>
       <Provider store={store}>
      <Router>
        <App />
      </Router> 
       </Provider>
     </StrictMode>,

  
)
