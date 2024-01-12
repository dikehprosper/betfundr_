"use client";
import "./transaction.css";
import { useRouter, usePathname } from "next/navigation"; // Remove unnecessary import
import React, { useState, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { TransactionTemplateProps } from "@/types";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { FaCircle } from "react-icons/fa6";
import TransactionResultsCashdesk from "./(components)/cashdeskTransactionTemplate";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Link from "next/link";
import { CgTrashEmpty } from "react-icons/cg";
import Modal from "@/components/(Utils)/(modals)/receiptModalWithdrawal";
import axios from "axios";
import { toast } from "react-toastify";

const TransactionTemplate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<any>();
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState("two");
  const [isVisible, setIsVisible] = useState(false);
  const [receipt, setReceipt] = useState({});

  // Extract ID from the URL
  const extractIdFromUrl = () => {
    const parts = pathname.split("/"); // Use router.asPath to get the full URL
    const lastPart = parts[parts.length - 1];
    return lastPart;
  };

  const getUserDetails = async () => {
    try {
      setLoading("one");
      const res = await axios.get("/api/getAllUserCashdeskHistory");
      setData(res.data.result);
      console.log(res.data.result);
      setLoading("three");
    } catch (error: any) {
      if (error.response.status === 402) {
        setLoading("two");
        toast.error("user does not exist");
      } else {
        setLoading("two");
        toast.error("An error has occur");
      }
    }
  };

  const handleClick = () => {
    setIsVisible(false);
  };

  const showReceipt = (
    time: any,
    amount: any,
    identifierId: any,
    betId: any,
    status: any,
    type: any,
    momoName: any,
    momoNumber: any,
    withdrawalCode: any,
    userEmail: any,
    subadminEmail: any
  ) => {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode,
      userEmail,
      subadminEmail,
    });
  };

  const [currentValue, setCurrentValue] = useState("");

  async function search() {
    try {
      setLoading("one");
      const res = await axios.get("/api/getAllUserCashdeskHistory");
      res.data.result.map((data: any) => {
        if (data.identifierId === currentValue) {
          setData([data]);
          console.log(data);
        }
      });
      setLoading("three");
    } catch (error: any) {
      if (error.response.status === 402) {
        setLoading("two");
        toast.error("user does not exist");
      } else {
        setLoading("two");
        toast.error("An error has occur");
      }
    }
  }

  return loading === "one" ? (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2> All History</h2>
        </span>
      </div>
      <div
        className='transaction_template_container'
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id='container-signin-cashdesk'>
          <div id='html-spinner-signin-cashdesk'></div>
        </div>
      </div>
    </div>
  ) : loading === "two" ? (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2>All History</h2>
        </span>
      </div>
      <div
        className='transaction_template_container'
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={getUserDetails}
      >
        {" "}
        <h4 style={{ cursor: "pointer" }}>Tap here to fetch history</h4>
      </div>
    </div>
  ) : (
    <div className='subadmin_dashboard_container_admin_admin-cashdesk'>
      <div className='transaction_template_container_header'>
        <span className='transaction_template_container_header_1'>
          <h2>All History</h2>
        </span>
      </div>

      <div className='transaction_template_container'>
        <div
          style={{
            width: "100%",
            height: "40px",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className='tablesearch'
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder='Input the ID to search for transactions'
          />

          <button
            style={{
              height: "100%",
              fontWeight: "bold",
              width: "70px",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={search}
          >
            Search
          </button>
        </div>
        {isVisible && (
          <Modal
            containerStyles='receiptModal'
            containerStylesInner='receiptModal_inner'
            handleClick={handleClick}
            receipt={receipt}
            title='Montant du dépôt'
          />
        )}

        <div
          className='transaction_template_container_body_2 animate-pop-in'
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {data?.length < 1 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h2>No data to display</h2>
            </div>
          ) : (
            data
              ?.reverse()
              .map((filteredData: any, index: any) => (
                <TransactionResultsCashdesk
                  key={index}
                  time={filteredData.registrationDateTime}
                  amount={filteredData.amount}
                  receipt={filteredData._id}
                  betId={filteredData.betId}
                  status={filteredData.status}
                  type={filteredData.fundingType}
                  showReceipt={showReceipt}
                  withdrawalCode={filteredData.withdrawalCode}
                  momoName={filteredData.momoName}
                  momoNumber={filteredData.momoNumber}
                  identifierId={filteredData.identifierId}
                  userEmail={filteredData.userEmail}
                  subadminEmail={filteredData.subadminEmail}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionTemplate;
