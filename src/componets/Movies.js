import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const requestOption = {
            method: "GET",
            headers: headers
        }

        fetch(`${process.env.REACT_APP_BACKEND}/movies`, requestOption)
            .then(movie_json => movie_json.json())
            .then((json) => {
                setMovies(json)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="text-center">
            <h2>
                Movies
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
                                    <Link to={`/movies/${m.id}`}>{m.title}</Link>
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

export default Movies;