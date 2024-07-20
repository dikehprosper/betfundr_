/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReceiptModalProps } from "@/types";
import CompanyLogo from "../../../../public/Logo.webp";
import Image from "next/image";
import { TbPigMoney } from "react-icons/tb";
import formatDate from "../formatDate";
import { IoMdDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import formatNumberWithCommasAndDecimal from "../formatNumber";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
const Modal = ({
  active,
  receipt,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
}: any) => {
const pathname = usePathname();
const handleChildClick = (event: React.MouseEvent) => {
  // Stop the event propagation to the parent (receiptModal)
  event.stopPropagation();
};
const spanRef = useRef<HTMLSpanElement>(null);

const handleCopyClick = () => {
  if (spanRef.current) {
    const range = document.createRange();
    range.selectNode(spanRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      document.execCommand("copy");
      toast.success("Text successfully copied!");
    } catch (err) {
      toast.error("Oops! Unable to copy text.");
    }

    window.getSelection()?.removeAllRanges();
  }
};
  return (
    <div className={` ${containerStyles}`} onClick={handleClick}>
      <div
        className={` ${containerStylesInner}`}
        id='receiptModal'
        onClick={handleChildClick}
      >
        <span
          onClick={handleClick}
          style={{ position: "absolute", right: "22px", top: "15px" }}
        >
          {" "}
          <FaLongArrowAltLeft className='FaLongArrowAltLeft' />
        </span>
        <div className='receiptModal_inner1' style={{ height: "100px"}}>
          <div className='receiptModalImage'>
            <Image
              src={CompanyLogo}
              loading='eager'
              fill
              style={{
                objectFit: "cover",
              }}
              alt='Picture of the author'
            />
          </div>
          <h3
            style={{
              background:
                receipt.status === "Successful"
                  ? "rgba(0, 128, 0, 0.4)"
                  : receipt.status === "Pending"
                  ? "rgba(128, 128, 128, 0.6)"
                  : "rgba(256, 0, 0, 0.6)",
              color: "rgba(256, 256, 256, 0.8)",
              borderRadius: "3px",
            }}
          >
            {" "}
            {receipt.status}
          </h3>
        </div>
        <div className='receiptModal_inner2'>
          <div>
            {" "}
            <TbPigMoney />
          </div>
          <div>
            <div
              style={{
                color:
                  receipt?.type === "withdrawals"
                    ? "rgba(0, 118, 184, 0.7)"
                    : "rgba(0, 184, 118, 0.7)",
                fontWeight: "bold",
              }}
            >
              Montant du{" "}
              {receipt?.type === "withdrawals" ? "retraits" : "dépôt"}
            </div>
            <div
              style={{
                fontWeight: "bold",
                color:
                  receipt?.type === "withdrawals"
                    ? "rgba(0, 118, 184, 0.7)"
                    : "rgba(0, 184, 118, 0.7)",
              }}
            >
              {" "}
              XOF{" "}
              {typeof receipt?.amount === "number"
                ? formatNumberWithCommasAndDecimal(receipt?.amount)
                : receipt?.amount}
            </div>
          </div>
        </div>
        <div className='receiptModal_inner3' style={{ height: "30px", marginTop: "20px"}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
             ID:
          </div>

          <div>{receipt?.betId}</div>
        </div>
        <div className='receiptModal_inner4' style={{ height: "30px", marginTop: "20px", background: 'red !important'}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            identifiant de transaction:
          </div>
          <div ref={spanRef}> {receipt?.identifierId} </div>

          <div style={{ marginRight: "10px" }} onClick={handleCopyClick}>
            {" "}
            <FaRegCopy fontSize='12px' />
          </div>
        </div>
        {receipt.withdrawalCode !== undefined ? (
          <div className='receiptModal_inner4' style={{ height: "30px", marginTop: "20px", background: 'red !important' }}>
            <div
              style={{
                color: "rgba(128, 128, 128, 0.9)",
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: "bold",
              }}
            >
              withdrawalCode:
            </div>
            <div> {receipt?.withdrawalCode} </div>
          </div>
        ) : null}
        <div className='receiptModal_inner5' style={{ height: "30px", marginTop: "20px",  background: 'red !important'}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            date et l&apos;heure:{" "}
          </div>
          <div> {formatDate(receipt?.time)}</div>
        </div>
        {receipt?.momoName &&  <div className='receiptModal_inner6' style={{ height: "30px", marginTop: "20px",  background: 'red !important'}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            Nom:{" "}
          </div>
          <div>
            {" "}
            {receipt?.momoName ? receipt?.momoName : receipt?.momoName}
          </div>
        </div> }
       
        <div className='receiptModal_inner7' style={{ height: "30px", marginTop: "20px",  background: 'red !important'}}>
          <div
            style={{
              color: "rgba(128, 128, 128, 0.9)",
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
            }}
          >
            numéro de maman:{" "}
          </div>
          <div>
            {" "}
            {receipt?.userNumber ? receipt?.userNumber : receipt?.momoNumber}
          </div>
        </div>
       
      
       
      </div>
    </div>
  );
};

export default Modal;
