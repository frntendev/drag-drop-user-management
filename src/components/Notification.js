import React from "react";
import { Notifs } from "redux-notifications";
import styled from "react-emotion";
const StyledNotif = styled(Notifs)`
  .notif-transition-enter {
    opacity: 0.01;
    transition: opacity 0.5s ease-in;
  }

  .notif-transition-enter-active {
    opacity: 1;
  }

  .notif-transition-leave {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }

  .notif-transition-leave-active {
    opacity: 0.01;
  }

  .notif {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size:0.9rem;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 2px;
    min-height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    text-align: center;
    padding: 0.5rem;
    color: #fff;
    width: 350px;
    z-index: 9999;
    @media (max-width: 800px) {
      width: 100%;
      border-radius: 0; 
      bottom: 0;
    }
  }

  .notif--success {
    background-color: #64ce83;
  }

  .notif--info {
    background-color: #3ea2ff;
  }

  .notif--warning {
    background-color: #ff7f48;
  }

  .notif--danger {
    background-color: #f50057;
  }

  .notif__container {
    position: fixed;
    top: 10px;
    right: 0;
    left: 0;
    z-index: 1000;
    width: 80%;
    max-width: 400px;
    margin: auto;
  }
`;
export default props => {
  return <StyledNotif {...props} />;
};
