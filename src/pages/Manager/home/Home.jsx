import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import Table from "../../../components/table/Table";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Home = () => {
  // const currentUser = JSON.parse(localStorage.getItem("current_user"));
  // const Branch = () => (
  //   <div className="widget">
  //     <div className="left">
  //       <span className="title"></span>
  //       <span className="counter">{/* {data.isMoney && "$"} {amount} */}</span>
  //       <span className="link"></span>
  //     </div>
  //     <div className="right">
  //       <div className="percentage positive">
  //         {/* <KeyboardArrowUpIcon /> */}
  //         {/* {diff} % */}
  //         {currentUser.branch.name}
  //       </div>
  //       {/* {data.icon} */}
  //     </div>
  //   </div>
  // );
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          {/* <Branch /> */}
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
