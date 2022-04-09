import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { createDiscount } from "../../../../redux/actions/discountAction";

import { Button } from "@mui/material";

const CreateDiscount = () => {
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createDiscount(code, percent, startedAt, endedAt, title));
    navigate("/owner/discounts");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [percent, setPercent] = useState();
  const [startedAt, setStartedAt] = useState(new Date());
  const [endedAt, setEndedAt] = useState(new Date());
  const [title, setTitle] = useState();

  const handleGenerateCode = (e) => {
    e.preventDefault();
    const result = Math.random().toString(36).substring(2, 7);
    setCode(result);
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Create Discount</h1>
        </div>
        <div className="bottom" style={{ width: "650px", margin: "auto" }}>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Code</label>
                <input
                  type="text"
                  placeholder="Input discount code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ width: "63%", marginRight: "10px" }}
                />
                {/* <Button variant="outlined" size="small" onClick={handleGenerateCode}>Generate</Button> */}
                <button onClick={handleGenerateCode}>Generate</button>
              </div>
              <div className="formInput">
                <label>Percent</label>
                <input
                  type="number"
                  placeholder="Input percent"
                  onChange={(e) => setPercent(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>From</label>
                <DatePicker
                  className="formInput"
                  selected={startedAt}
                  onChange={(date) => setStartedAt(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="formInput">
                <label>To</label>
                <DatePicker
                  className="formInput"
                  selected={endedAt}
                  onChange={(date) => setEndedAt(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="formInput" style={{ width: "93%" }}>
                <label>Title</label>
                <textarea
                  class="form-control"
                  rows="3"
                  onChange={(e) => setTitle(e.target.value)}
                ></textarea>
              </div>
            </form>
            <button
              onClick={handleCreate}
              style={{ marginTop: "10px", marginLeft: "270px" }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscount;
