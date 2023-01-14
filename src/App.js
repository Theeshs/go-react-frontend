import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alart from "./componets/Alert"


function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [allertMessage, setAllertMassage] = useState("")
  const [alartClassName, setAllertClasName] = useState("d-none")

  const [tickInterviel, settickInterviel] = useState()

  const naviage = useNavigate()

  const logOut = () => {
    // console.log(jwtToken)
    const requestOptions = {
      method: 'GET',
      credentials: 'include'
    }
    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
      .catch(err => {
        // debugger
        console.log("error logging out", err)
      })
      .finally(() => {
        setJwtToken("")
        toggleRefresh(false)
      })
    // setJwtToken("")
    naviage("/login")
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked")
    if (status) {
      console.log("Turing on ticking")
      let i = setInterval(() => {
        console.log("this will run every seconds")
        const requestOptions = {
          method: 'GET',
          credentials: 'include'
        }
        fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
          .then(response => response.json())
          .then(json => {
            // debugger
            if (json.access_token) {
              console.log("access token available")
              setJwtToken(json.access_token)
              toggleRefresh(true)
            }
          })
          .catch(error => {
            console.log(error)
          })

      }, 600000);

      settickInterviel(i)
      console.log("setting tick interval to", i)
    } else {
      console.log("turning off ticking")
      console.log("turning off tick intervel", tickInterviel)
      settickInterviel(null)
      clearInterval(tickInterviel)
    }
  }, [tickInterviel])

  useEffect(() => {
    console.log(jwtToken)
    // debugger
    if (jwtToken === "") {
      // debugger
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      }

      fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
        .then(response => response.json())
        .then(json => {
          // debugger
          if (json.access_token) {
            console.log("access token available")
            setJwtToken(json.access_token)
            toggleRefresh(true)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [jwtToken, toggleRefresh])


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go watch a movie</h1>
        </div>
        <div className="col text-end">
          {jwtToken === ""
            ? <Link to="/login"><span className="badge bg-success">Login</span></Link>
            : <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>
          }
        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Generes</Link>
              {
                jwtToken !== "" &&
                <>
                  <Link to="/admin/movies/0" className="list-group-item list-group-item-action">Add Movie</Link>
                  <Link to="/manage-catelogue" className="list-group-item list-group-item-action">Manage Catelogue</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
              }
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <a className="btn btn-outline-secondary" href="#!" onClick={toggleRefresh}>Toggle Ticking</a>
          <Alart message={allertMessage} className={alartClassName} />
          <Outlet context={{ jwtToken, setJwtToken, setAllertClasName, setAllertMassage, toggleRefresh }} />
        </div>
      </div>
    </div>
  );
}

export default App;
