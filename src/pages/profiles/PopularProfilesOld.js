import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { axiosReq } from "src/api/axiosDefaults";
import { useCurrentUser } from "src/contexts/CurrentUserContext";
import Asset from "src/components/Asset";
import Profile from "./Profile";
import { useProfileData } from "src/contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
  //STEP - 7
  // const [profileData, setProfileData] = useState({
  //   //NOTE - we will use the pageProfile later!
  //   pageProfile: { results: [] },
  //   popularProfiles: { results: [] },
  // });
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?orderings=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
