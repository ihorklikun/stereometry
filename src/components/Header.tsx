import React, { useRef, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
  NavDropdown,
} from "react-bootstrap";

import Navigation from "./Layout/Navigation/Navigation";

export default function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <>
      <Navigation/>
    </>
  );
}
