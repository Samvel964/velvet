import "./style.scss";
import Accordion from "react-bootstrap/Accordion";

export const AccordionInfo = ({description}) => {
  return (
    <Accordion defaultActiveKey="0" flush className="accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accHead">INFORMATION</Accordion.Header>
        <Accordion.Body className="accBody">
          {description}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="accHead">CARE DETAILS</Accordion.Header>
        <Accordion.Body className="accBody">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className="accHead">
          SHIPPING & RETURNS
        </Accordion.Header>
        <Accordion.Body className="accBody">
          <h4>7 Days Returns</h4>
          <p>
            Cash on Delivery Available
            <br />
            Home Delivery <span>3 - 4 days</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer
            bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non
            scelerisque nulla euismod nec.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
