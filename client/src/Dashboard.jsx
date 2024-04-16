import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard");
        console.log(res);
        if (res.data.valid) {
          setMessage(res.data.message);
          console.log(res.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div>
      {/* Display the message in the heading */}
      <h1 className="">Dashboard: {message}</h1>

      {/* Carousel component */}
      <div
        id="carouselExampleCrossfade"
        className="carousel slide carousel-fade"
        data-mdb-ride="carousel"
        data-mdb-carousel-init
      >
        {/* Carousel indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselExampleCrossfade"
            data-mdb-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselExampleCrossfade"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselExampleCrossfade"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        {/* Carousel inner content */}
        <div className="carousel-inner">
          {/* Carousel items */}
          <div className="carousel-item active">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
              className="d-block w-100"
              alt="Wild Landscape"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
              className="d-block w-100"
              alt="Camera"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
              className="d-block w-100"
              alt="Exotic Fruits"
            />
          </div>
        </div>
        {/* Carousel control buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselExampleCrossfade"
          data-mdb-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-mdb-target="#carouselExampleCrossfade"
          data-mdb-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
