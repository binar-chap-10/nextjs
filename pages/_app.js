import Head from 'next/head'
import Script from 'next/script'
import { Provider } from 'react-redux';
import store from '../redux/index'
import '../styles/globals.css'
import "../components/LandingPage/LandingPage.css"
import  "../components/Navbar/NavBar.css";
import '../components/Login/Login.css'
import '../components/Register/Register.css'
import NavBar from '../components/Navbar/Navbar';
function MyApp({ Component, pageProps = store.getState()}) {
 
  return <>
  <Head>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
      <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></Script>
      <Script src="https://kit.fontawesome.com/14775e3987.js" crossorigin="anonymous"></Script>  
    </Head>
    <Provider store={store}>
    <Component {...store.getState()}/>
 
  </Provider>
  </>
}


export default MyApp
