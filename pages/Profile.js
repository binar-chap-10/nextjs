import Profile from "../components/Profile/Profile";
import NavBar from "../components/Navbar/Navbar";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  data: state.userReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (value) => {
    return dispatch(setUser(value));
  },
});

function ProfilePage(props) {
  return (
    <>
      <NavBar data={props} />
      <Profile data={props} />
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
