import React from "react";

import { Container } from "@chakra-ui/react";

const Card = (props) => {
  return (
    <>
      <Container
        className="card"
        p="20px"
        minW="100vw"
        minH="100vh"
        bg="#e6e6e6"
        color="black"
      >
        {props.children}
      </Container>
    </>
  );
};

export default Card;
