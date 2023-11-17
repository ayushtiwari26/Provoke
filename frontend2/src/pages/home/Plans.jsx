import React from "react";
import "./Plans.css";

const Plans = () => {
  return (
    <>
      <div className="Background">
        <div>
          <p>Choose the right plane for you</p>
        </div>
        <div className="PlansList">
          <div className="col1">
            <div>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div>Monthly Price</div>
            <div>Video Quality</div>
            <div>Resolution</div>
            <div>Device you can use to watch</div>
          </div>
          <div className="col1">
            <div>Mobile</div>
            <div> &#8377; 100</div>
            <div>Good</div>
            <div>480p</div>
            <div>Mobile</div>
            <div>Tablet</div>
          </div>
          <div className="col1">
            <div>Basic</div>
            <div> &#8377; 200</div>
            <div>Good</div>
            <div>480p</div>
            <div>Mobile</div>
            <div>Tablet</div>
            <div>Computer</div>
            <div>TV</div>
          </div>
          <div className="col1">
            <div>Standard</div>
            <div> &#8377; 500</div>
            <div>Better</div>
            <div>1080p</div>
            <div>Mobile</div>
            <div>Tablet</div>
            <div>Computer</div>
            <div>TV</div>
          </div>
          <div className="col1">
            <div>Premimun</div>
            <div> &#8377; 700</div>
            <div>Best</div>
            <div>4K+HDR</div>
            <div>Mobile</div>
            <div>Tablet</div>
            <div>Computer</div>
            <div>TV</div>
          </div>
        </div>
        <div className="buttonDiv">
          <button className="button">Next</button>
        </div>
      </div>
    </>
  );
};

export default Plans;
