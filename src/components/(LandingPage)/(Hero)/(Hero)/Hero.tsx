"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "../(components)/CustomBotton";
import mainBackgroundMobile from "../../../../../public/mainBackgroundMobile.webp";
import image from "../../../../../public/image8.webp";
import createTranslation from "next-translate/createTranslation";
import "./hero.css";
import { useTranslation } from "@/app/i18n/client";
const hero = () => {
  const { t } = useTranslation("fr", "home");
  return (
    <>
      <div className="hero large-device">
        <div
          style={{
            width: "70%",
            height: "80%",
            position: "relative",
            paddingLeft: "50px",
          }}
        >
          <section className="hero-text">
            <h1 className="hero-title animate-pop-in">
              <span className="hero-span">{t("hero span 1")}</span>{" "}
              {t("hero span 2")}
              <span className="hero-span"> {t("hero span 3")}</span>.
            </h1>
            <p className="hero-subtitle animate-pop-in">
              {t("hero description")}
            </p>
            <div className="hero_button_container">
              <CustomButton
                containerStyles="hero-button animate-pop-in deposit"
                title={t("deposit")}
              />
              <CustomButton
                containerStyles="hero-button animate-pop-in"
                title={t("withdrawal")}
              />
            </div>
          </section>
        </div>
        <div className="hero-img">
          <Image
            src={image}
            fill
            loading="eager"
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
            alt="Picture of the background"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="small-device">
        <div className="small-device-hero">
          <div
            style={{
              position: "fixed",
              top: 20,
              left: 30,
              right: 30,
              height: "40%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "end",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <h1 className="hero-title animate-pop-in">
                <span className="hero-span">{t("hero span 1")}</span>{" "}
                {t("hero span 2")}
                <span className="hero-span"> {t("hero span 3")}</span>.
              </h1>
              <p className="hero-subtitle animate-pop-in">
                {t("hero description")}
              </p>
              <div className="hero_button_container">
                <CustomButton
                  containerStyles="hero-button animate-pop-in deposit"
                  title={t("deposit")}
                />
                <CustomButton
                  containerStyles="hero-button animate-pop-in"
                  title={t("withdrawal")}
                />
              </div>
            </div>
          </div>
          <Image
            src={mainBackgroundMobile}
            fill
            loading="eager"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            placeholder="blur"
            alt="Picture of the background"
          />
        </div>
      </div>
    </>
  );
};

export default hero;
