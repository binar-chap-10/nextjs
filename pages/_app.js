import '../styles/globals.css'
import "../components/LandingPage/LandingPage.css"
import  "../components/Navbar/NavBar.css";
import '../components/Login/Login.css'
import '../components/Register/Register.css'
function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}

export default MyApp
