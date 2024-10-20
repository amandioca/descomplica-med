import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Signup from './pages/Signup'
import { AuthNavbar, UnauthNavbar } from './components/Navbar'
import FileMessageBox from './components/FileMessageBox'
import Login from './pages/Login'
import './styles/global.css'
import ChatWorkspace from './pages/ChatWorkspace'

const appName = 'Descomplica Med'

const colorPalette = {
  grayLight: '#757575',
  grayMedium: '#333333',
  grayRegular: '#4D4D4D',
  grayDark: '#212121',
  primaryBlue: '#3596FF',
  secondaryBlue: '#005DC1'
}

const App = () => {
  const appStyle = { backgroundColor: colorPalette.grayDark, minHeight: '100vh', color: 'white'}

  return (
    <div style={appStyle}>
      <ChatWorkspace></ChatWorkspace>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
  document.querySelector('#root')
);