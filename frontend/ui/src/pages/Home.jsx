import "../css/Home.css";
import hero from "../assets/hero.png";

function Home() {

    return (

        <div className="home">

            <nav className="navbar">

                <h1 className="logo">NETFLIX</h1>

                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                </ul>

            </nav>

            <div className="hero">

                <div className="overlay">

                    <div className="content">

                        <h4>N SERIES</h4>

                        <h1>DEVIL<br/>IN OHIO</h1>

                        <h3>#1 in TV Shows Today</h3>

                        <p>
                            Determined to protect a young patient who escaped
                            a mysterious cult, a psychiatrist takes the girl in,
                            putting her own family in danger.
                        </p>

                        <div className="buttons">

                            <button className="playBtn">
                                ▶ Play
                            </button>

                            <button className="infoBtn">
                                More Info
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;