import { useNavigate } from 'react-router-dom';
import bg from '../images/home-bg.png'
const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home-container" >
            <img src={bg} alt="" className='bg' />
            <h1 className="cms-header">Welcome to <br/>Complaint Management System</h1>
            <div className="btn-container">
                <button className="comp-btn" onClick={()=> navigate('/complaint')}>Report a complaint</button>
                <button className="comp-btn" onClick={() => navigate('/complaintList')}>Complaint List</button>
                {/* <button className="comp-btn" onClick={() => navigate('/admin')}>admin</button> */}
            </div>
        </div>
    );
}
 
export default Home;