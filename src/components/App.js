import React, { useEffect, useState } from "react";
import { Link, Route, Switch} from "react-router-dom";
import "./../styles/App.css";

const Menu = () => {
   const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((e) => e.json())
      .then(setData)
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  if(isLoading){

    return <div>Loading...</div>
  }
  
  return (
    <>
      <h1>User List</h1>
      <ul>
        {data.map((ele) => (
          <li key={ele.id}>
            <Link to={`/users/${ele.id}`}>{ele.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const Details = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const  id  = window.location.pathname.split('/').reverse()[0];
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((e) => e.json())
      .then(setData)
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>User Details</h1>
      <p>Name: {data?.name}</p>
      <p>Username: {data?.username}</p>
      <p>Email: {data?.email}</p>
      <p>Phone: {data?.phone}</p>
      <p>Website: {data?.website}</p>
    </>
  );
};

const App = () => {
 
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route  path="/users/:id">
          <Details/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
