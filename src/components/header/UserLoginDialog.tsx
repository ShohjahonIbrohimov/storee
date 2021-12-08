import React, { cloneElement, Fragment, ReactElement } from "react";
import Modal from "../modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {close_login, open_login} from "../../../Redux/Actions/LoginModel";

export interface UserLoginDialogProps {
  handle: ReactElement;
  children: ReactElement;
}

const UserLoginDialog: React.FC<UserLoginDialogProps> = ({
  handle,
  children,
}) => {
    const dispatch = useDispatch()
    const open3 = useSelector((state:any) => state.token.open)
    const isLogged = useSelector((state:any) => state.token.isLoggedIn)

  const toggleDialog = () => {
      if(open3){
          dispatch(close_login())
      }
      else{

          if(!isLogged){
              dispatch(open_login())
          }
      }
  };

  return (
    <Fragment>
      {cloneElement(handle, { onClick: toggleDialog })}

      <Modal open={open3} onClose={toggleDialog}>
        {children}
      </Modal>
    </Fragment>
  );
};

export default UserLoginDialog;
