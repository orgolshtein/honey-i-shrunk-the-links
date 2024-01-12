import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { GlobalStyle } from './styles.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>
)