import React, { useState } from "react";
import AppBar from "@components/navigation/Appbar/Appbar";
import SideBar from "@components/Layout/Sidebar/Sidebar";
import style from "./test.module.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import AddContactModal from "../Contact/AddContactModal/AddContactModal";
import { EditConversationModal } from "../Chat/EditConversationForm/EditConversationForm";

const Layout = (props) => (
  <>
    <div className={style.layout}>
      <div className={style.bar}>
        <AppBar />
      </div>
      <div className={style.nav}>
        <SideBar />
      </div>
      <main className={style.body}>{props.children}</main>
    </div>
  </>
);

const TestPage = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Layout>
        <div>Testing SideBar</div>
        <Button onClick={handleShow}>Show addContactModal</Button>
      </Layout>
      {/*<AddContactModal open={show} handleClose={() => setShow(false)} /> */}
      <EditConversationModal
        open={show}
        new
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default TestPage;
