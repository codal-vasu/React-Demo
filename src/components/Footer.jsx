import React from "react";
import { Segment, Container, List } from "semantic-ui-react";
const Footer = () => {
  return (
    <div>
      {" "}
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "30px" }}>
        <Container>
          <List
            horizontal
            inverted
            divided
            link
            size="small"
            style={{ display: "flex", justifyContent: "center" }}>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

export default Footer;
