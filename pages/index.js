import { Provider } from "react-redux";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/actions";
import axios from "axios";
import store from "../redux";
import NavBar from "../components/Navbar/Navbar";
import LandingPage from "../components/LandingPage/LandingPage";
import styles from "../styles/Home.module.css";
function Home(props) {
  
  useEffect(() => {
    const token = window.sessionStorage.getItem("accessToken");
    axios
      .get("https://backend9-binar.herokuapp.com/api/login", {
        headers: { authorization: token },
      })
      .then((res) => {
       props.setUser({
          loggedIn: res.data.authorized,
          fullname: res.data.fullname,
        });
      });
  }, []);
  console.log(props.data)
  return (
    
      <>
        <NavBar data={props}/>
        <LandingPage data={props}/>
        </>
     

  );
}
const mapStateToProps = (state) => ({
  data: state.userReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (value) => {
    return dispatch(setUser(value));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
