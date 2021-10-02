import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/requests";
import leaderLogo from "../../assets/leaderboard.svg";
import footer from "../../assets/footer.png";
import docLogo from "../../assets/doc.svg";
import starLogo from "../../assets/star.svg";
import halfStarLogo from "../../assets/halfstar.svg";
import Pikachu from "../../assets/pikachu-running.gif";
import { RiExternalLinkLine } from "react-icons/ri";
import "./leader.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const asyncLeaderboard = async () => {
      await sleep(1500);
      let res = await getLeaderboard();
      // console.log(res);
      // const res = [
      //   {
      //     username: "Nimish Jain Nimish Jain Nimish Jain",
      //     noOfSubmissions: 7,
      //     noOfStars: 4.5,
      //   },
      //   {
      //     username: "Nimish Jain",
      //     noOfSubmissions: 5,
      //     noOfStars: 2.1,
      //   },
      // ];
      setLeaderboard(res);
      setLoadingPage(false);
    };
    asyncLeaderboard();
  }, []);

  return (
    <>
      {loadingPage && (
        <div className="table-data">
          <div id="map-loading">
            {/* <CircularProgress color="success" /> */}
            <img src={Pikachu} alt="" className="pikachu" />
          </div>
          <div id="darken" />
        </div>
      )}
      <div className="background-gradient">
        <div className="whole_page">
          <img src={leaderLogo} alt="" className="leader-logo" />
          <table className="tables">
            <thead className="fixedHeader">
              <tr className="heading">
                <div className="table-data1">#</div>
                <div className="table-data2">Player</div>
                <div className="table-data3">
                  {/* <img src={docLogo} alt="" /> */}
                  No. of
                  <br />
                  reports
                </div>
                <div className="table-data4">
                  {/* <img src={starLogo} alt="" /> */}
                  Issue
                  <br />
                  rating
                </div>
              </tr>
            </thead>
            <tbody className="scrolldown">
              {leaderboard.map((item, rank) => {
                return (
                  <tr className="names">
                    <div className="table-data1">{rank + 100}</div>
                    <div className="table-data2" title={item.username}>
                      {item.username}
                    </div>
                    {/* <div className="table-data3">{item.noOfSubmissions}</div> */}
                    {/* <div className="table-data">{item.noOfStars}</div> */}
                    <div className="table-data3">
                      {Array(item.noOfSubmissions).fill(
                        <img src={docLogo} alt="" />
                      )}
                    </div>
                    <div className="table-data4">
                      {[1, 2, 3, 4, 5].map((e) => {
                        if (Math.ceil(item.noOfStars) - e >= 1)
                          return <img src={starLogo} alt="" />;
                        else if (Math.ceil(item.noOfStars) - e > -1)
                          return <img src={halfStarLogo} alt="" />;
                        return <></>;
                      })}
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <a
            className="submit-button"
            href="https://csivit.com"
            rel="noreferrer"
            target="_blank"
          >
            SUBMIT REPORT <RiExternalLinkLine />
          </a>
          <img src={footer} alt="" className="footer-logo" />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
