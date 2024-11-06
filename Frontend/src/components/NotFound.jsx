import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <p>The Page You're Looking For Is Not Found</p>
            <Link to={'/'} >Go To Home</Link>
        </div>
    );
}
 
export default NotFound;