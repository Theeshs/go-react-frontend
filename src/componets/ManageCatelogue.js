import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const ManageCatelogue = () => {
    const [movies, setMovies] = useState([])
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login")
            return
        }
        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${jwtToken}`)

        const requestOption = {
            method: "GET",
            headers: headers
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/movies`, requestOption)
            .then(movie_json => movie_json.json())
            .then((json) => {
                setMovies(json)
            })
            .catch(err => console.log(err))
    }, [jwtToken, navigate])

    return (
        <div className="text-center">
            <h2>
                Manage Catelogue
            </h2>
            <hr />
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((m) => (
                            <tr key={m.id}>
                                <td>
                                    <Link to={`/admin/movies/${m.id}`}>{m.title}</Link>
                                </td>
                                <td>{m.release_date}</td>
                                <td>{m.mpaa_rating}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ManageCatelogue;