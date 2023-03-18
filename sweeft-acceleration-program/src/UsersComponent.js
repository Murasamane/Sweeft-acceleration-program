import React, { useEffect, useState } from "react";
import Loader from "./components/UI/Loader";
import Container from "./components/UI/Container";
import Card from "./components/UI/Card";
import { NavLink } from "react-router-dom";

function UserComponent() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/10`
      );
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.list]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  return (
    <React.Fragment>
      <Container>
        {users.length > 0 &&
          users.map((user, index) => (
            <NavLink
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
    </React.Fragment>
  );
}

export default UserComponent;
