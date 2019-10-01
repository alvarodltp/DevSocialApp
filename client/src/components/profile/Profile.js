import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ getProfileById, profile: {profile, loading}, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById]);
  return (
    <React.Fragment>
      {profile === null || loading ? <Spinner /> : <React.Fragment>
        <Link to='/profiles' className="btn btn-light">
          Back To Profiles
        </Link>
        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&<Link to='/edit-profile' className="btn btn-dark">
          Edit Profile
        </Link>}
        <div class="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">
              Experience
            </h2>
            {profile.experience.length > 0 ? (
              <React.Fragment>
                {profile.experiece.map(experience => (
                  <ProfileExperience key={experience._id} experience={experience}/>
                ))}
              </React.Fragment>
            ) : <h4>No experience credentials</h4>}
          </div>
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">
              Education
            </h2>
            {profile.education.length > 0 ? (
              <React.Fragment>
                {profile.education.map(education => (
                  <ProfileEducation key={education._id} education={education}/>
                ))}
              </React.Fragment>
            ) : <h4>No education credentials</h4>}
          </div>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername}/>
          )}
        </div>
      </React.Fragment>}
    </React.Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapstateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapstateToProps, {getProfileById})(Profile)
