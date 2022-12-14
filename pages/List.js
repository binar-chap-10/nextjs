import List from "../components/Games/GameList";
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

function ListPage(props) {
  return (
    <>
      <NavBar data={props} />
      <List data={props} />
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
