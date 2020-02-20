import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/screams/Scream";
import Profile from "../components/user/Profile";
import { getScreams } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton";

class home extends Component {
  componentDidMount = () => {
    this.props.getScreams();
  };
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => (
        <Scream scream={scream} key={scream.screamId}></Scream>
      ))
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ data: state.data });

export default connect(mapStateToProps, { getScreams })(home);
