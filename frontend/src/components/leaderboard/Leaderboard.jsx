import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../api/requests";
import "./leader.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    const asyncLeaderboard = async () => {
      let res = await getLeaderboard();
      console.log(res);
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
      //   }
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
            <CircularProgress color="success" />
          </div>
          <div id="darken" />
        </div>
      )}
      <div className="whole_page">
        <table className="tables">
          <thead className="fixedHeader">
            <tr className="heading">
              <th>Rank</th>
              <th>Player</th>
              <th>Sub</th>
              <th>Stars</th>
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
      </div>
    </>
  );
};

export default Leaderboard;
