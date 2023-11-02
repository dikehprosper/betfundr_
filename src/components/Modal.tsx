"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModalProps } from "@/types";

const Modal = ({
  navLinks,
  containerStyles,
  containerStylesInner,
  containerStylesInnerLink,
  handleClick,
}: ModalProps) => {
  const pathname = usePathname();

  return (
    <div
      className={` ${containerStyles}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick;
      }}
    >
      <div className={` ${containerStylesInner}`}>
        {navLinks?.map((link, index) => {
          console.log(pathname === link.pathname);
          return (
            <Link
              key={index}
              className={` ${containerStylesInnerLink} ${
                pathname === link.pathname ? "active" : ""
              }`}
              href={link.pathname}
              onClick={(e) => {
                handleClick;
                console.log(link.pathname);
              }}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
