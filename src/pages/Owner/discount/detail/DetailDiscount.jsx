import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { updateDiscount } from "../../../../redux/actions/discountAction";
function DetailDiscount() {
  const { discountCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const discount = useSelector((state) =>
    state.discountReducer.upcomingDiscounts.find((discount) => {
      return discount.code == discountCode;
    })
  );

  const [code, setCode] = useState(discount.code);
  const [title, setTitle] = useState(discount.title);
  const [percent, setPercent] = useState(discount.percent);
  const [startedAt, setStartedAt] = useState(new Date(discount.startedAt));
  const [endedAt, setEndedAt] = useState(new Date(discount.endedAt));

  const handleUpdate = () => {
    dispatch(updateDiscount(percent, startedAt, endedAt, title, discountCode));
    setIsEdit(!isEdit);
    window.setTimeout(() => {
      navigate("/owner/discounts");
    }, 500);
  };

  const handleCancelForm = () => {
    navigate("/owner/discounts");
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div>
          <section class="py-5 my-5">
            <div class="container">
              <div
                class="bg-white shadow rounded-lg d-block d-sm-flex"
                style={{ width: "650px", margin: "auto" }}
              >
                <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-tab"
                  >
                    <h3 class="mb-4">Discount Detail</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Code</label>
                          <input
                            type="text"
                            class="form-control"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Percent</label>
                          <input
                            type="number"
                            className="form-control"
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>From</label>
                          <DatePicker
                            className="form-control"
                            selected={startedAt}
                            onChange={(date) => setStartedAt(date)}
                            dateFormat="dd/MM/yyyy"
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>To</label>
                          <DatePicker
                            className="form-control"
                            selected={endedAt}
                            onChange={(date) => setEndedAt(date)}
                            dateFormat="dd/MM/yyyy"
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Title</label>
                          <textarea
                            class="form-control"
                            rows="4"
                            disabled={!isEdit}
                            onChange={(e) => setTitle(e.target.value)}
                          >
                            {title}
                          </textarea>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        {isEdit ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={() => setIsEdit(!isEdit)}
                          >
                            Edit
                          </button>
                        )}
                        {isEdit && (
                          <button
                            class="btn btn-light"
                            type="button"
                            onClick={handleCancelForm}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailDiscount;
