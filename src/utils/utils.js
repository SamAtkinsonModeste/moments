import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResoure) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResoure((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? //TODO -  This is the profile I clciked on,
      //TODO - update its followers count and set it's following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? //TODO - This is the profile of the logged in user
      //TODO - update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : //TODO - this is not the profile the user clicked on or the profile
      //TODO - the user owns, so just return it unchanged
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
