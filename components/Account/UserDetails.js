import React, { useState, useEffect, useContext } from "react";
import { List, ListInlineItem } from "reactstrap";
import {
  CakeOutlined,
  DateRangeOutlined,
  EmailOutlined,
  PhoneIphoneOutlined,
} from "@material-ui/icons";
import moment from "moment";
import { UserContext } from "../../lib/context/UserContext";

const UserDetials = () => {
  const { userDetails } = useContext(UserContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <img
            src={
              userDetails.gender === "FEMALE"
                ? "https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg"
                : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg"
            }
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              // boxShadow: "2px 2px 25px #d3d3d3",
            }}
          />
          <h5 className="text-center mt-4">{userDetails.fullName}</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <List type="unstyled">
            <li className="pt-3 pl-5 pr-5">
              <List type="inline">
                <ListInlineItem>
                  <EmailOutlined />
                </ListInlineItem>
                <ListInlineItem>{userDetails.username}</ListInlineItem>
              </List>
            </li>
            <li className="pt-3 pl-5 pr-5">
              <List type="inline">
                <ListInlineItem>
                  <PhoneIphoneOutlined />
                </ListInlineItem>
                <ListInlineItem>{userDetails.phoneNumber}</ListInlineItem>
              </List>
            </li>
            <li className="pt-3 pl-5 pr-5">
              <List type="inline">
                <ListInlineItem>
                  <CakeOutlined />
                </ListInlineItem>
                <ListInlineItem>
                  {`Birthday ${moment(userDetails.dateOfBirth).format(
                    "MMMM D Y"
                  )} `}
                </ListInlineItem>
              </List>
            </li>
            <li className="pt-3 pl-5 pr-5">
              <List type="inline">
                <ListInlineItem>
                  <p>
                    {`Joined ${moment(userDetails.memberSince)
                      .format("MMMM D dddd Y")
                      .toString()}`}
                  </p>
                </ListInlineItem>
              </List>
            </li>
          </List>
        </div>
      </div>
    </>
  );
};

export default UserDetials;
