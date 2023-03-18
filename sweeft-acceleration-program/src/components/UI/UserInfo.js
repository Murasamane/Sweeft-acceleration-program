import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Card from "./Card";
import Container from "./Container";
import classes from "./UserInfo.module.css";
import Loader from "./Loader";
import MainContainer from "./MainContainer";
const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userCompany, setUserCompany] = useState("");
  const [userAddress, setUserAddres] = useState({});
  const [userFriends, setUserFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const { id } = useParams();
  const fetchUserIdData = async () => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const userData = await response.json();
      setUserInfo(userData);
      setUserCompany(userData.company.name);
      setUserAddres(userData.address);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserFriendsData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/10`
      );
      const userFriendData = await response.json();
      setUserFriends((prevUsers) =>
        [...prevUsers, ...userFriendData.list].reverse()
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserFriendsData();
    return () => {
      return;
    };
  }, [page, id]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user__history"))){
      setHistory(JSON.parse(localStorage.getItem("user__history")))
    }
    return () => {
      return;
    };
  }, []);

  const handleScroll = () => {
    const scrollThreshold = document.documentElement.offsetHeight - 200;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      scrollThreshold
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    fetchUserIdData();
    return () => {
      return;
    };
  }, [id]);

  const historyHandler = (user) => {
    setHistory((prevUser) => [...prevUser, user]);
    localStorage.setItem("user__history", JSON.stringify(history));
  };
  return (
    <MainContainer>
      <header className={classes.header}>
        <img src={userInfo.imageUrl} alt="" />
        <fieldset className={classes.info}>
          <legend>Info</legend>
          <div>
            <strong>
              {userInfo.prefix} {userInfo.name} {userInfo.lastName}
            </strong>
          </div>
          <div>
            <i>{userInfo.title}</i>
          </div>
          <ul className={classes.info__list}>
            <li>Email: {userInfo.email}</li>
            <li>Ip Address: {userInfo.ip}</li>
            <li>Ip Address: {userInfo.ip}</li>
            <li>Job Area: {userInfo.jobArea}</li>
            <li>Job Type: {userInfo.jobType}</li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Address</legend>
          <strong>{userCompany}</strong>
          <ul className={classes.info__list}>
            <li>City: {userAddress.city}</li>
            <li>Country: {userAddress.country}</li>
            <li>State: {userAddress.state}</li>
            <li>Street Address: {userAddress.streetAddress}</li>
            <li>ZIP: {userAddress.zipCode}</li>
          </ul>
        </fieldset>
      </header>
      <div>
        <div className={classes.user__links}>
          {history.length > 0 &&
            history.map((user, index) => (
              <NavLink to={`/user/${user.id}`} key={index}>
                {user.prefix} {user.name} {user.lastName}
              </NavLink>
            ))}
        </div>
        <h2 className={classes.secondary__title}>Friends:</h2>
      </div>
      <div className={classes.users}>
        <Container>
          {userFriends.map((user, index) => (
            <NavLink
              onClick={() => historyHandler(user)}
              style={{
                textDecoration: "none",
                color: "#000",
              }}
              key={index}
              to={`/user/${user.id}`}
            >
              <Card user={user} key={index} />
            </NavLink>
          ))}
          {isLoading && <Loader />}
        </Container>
      </div>
    </MainContainer>
  );
};

export default UserInfo;
