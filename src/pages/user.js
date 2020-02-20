import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/screams/Scream";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/user/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };
  async componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }
    try {
      await this.props.getUserData(handle);
      const res = await axios.get(`/user/${handle}`);

      this.setState({ profile: res.data.user });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No Screams from this user</p>
    ) : !screamIdParam ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} />;
        } else {
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
