import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/requests";
import leaderLogo from "../../assets/leaderboard.svg";
import footer from "../../assets/Footer.svg";
import docLogo from "../../assets/doc.svg";
import starLogo from "../../assets/star.svg";
import Pikachu from "../../assets/pikachu-running.gif";
import "./leader.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const asyncLeaderboard = async () => {
      await sleep(1500);
      let res = await getLeaderboard();
      // console.log(res);
      // const res = [
      //   {
      //     username: "Nimish Jain Nimish JainNimish Jain",
      //     noOfSubmissions: 5,
      //     noOfStars: 10,
      //   },
      //   {
      //     username: "Nimish Jain",
      //     noOfSubmissions: 5,
      //     noOfStars: 10,
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
        <div>
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
                <th>#</th>
                <th>Player</th>
                <th>
                  <img src={docLogo} alt="" />
                </th>
                <th>
                  <img src={starLogo} alt="" />
                </th>
              </tr>
            </thead>
            <tbody className="scrolldown">
              {leaderboard.map((item, rank) => {
                return (
                  <tr className="names">
                    <td>{rank + 1}</td>
                    <td title={item.username}>{item.username}</td>
                    <td>{item.noOfSubmissions}</td>
                    <td>{item.noOfStars}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <img src={footer} alt="" className="footer-logo" />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
