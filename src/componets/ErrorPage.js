import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <dev className="container">
            <div className="row">
                <dev className="col-md-6 offset-md-3">
                    <h1 className="mt-3">Oops!</h1>
                    <p>Sorry, an unexpected error has occured</p>
                    <p>
                        <em>{error.statusText || error.message}</em>
                    </p>
                </dev>
            </div>
        </dev>
    )
}