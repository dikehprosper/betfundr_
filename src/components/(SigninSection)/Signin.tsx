"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../public/loginBackground.webp";
import image1 from "../../../public/Facebook.svg";
import image2 from "../../../public/Whatsapp.svg";
import image3 from "../../../public/TikTok.svg";
import image4 from "../../../public/Google.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./signin.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("sign-in");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // To store and retrieve login details
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    // Set the email and password in your login form fields
    if (rememberedEmail && rememberedPassword) {
      setUser({
        ...user,
        email: rememberedEmail,
        password: rememberedPassword,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //collect value from login input
  const handleUserEmail = (event: any) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };
  const handleUserPassword = (event: any) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  //Submit login details
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      localStorage.setItem("rememberedEmailForEspece", user.email);
      localStorage.setItem("rememberedPasswordForEspece", user.password);
      const response = await axios.post("/api/users/signin", user);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("Utilisateur non trouvé!");
      } else if (error.response.status === 402) {
        return toast.error("Mot de passe incorrect");
      } else if (error.response.status === 404) {
        return toast.error("Votre compte a été désactivé");
      } else if (error.response.status === 500) {
        return toast.error("Échec de la connexion");
      } else {
        console.log(error);
        return toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="signin-container">
      <div className="signin-header">
        <h2>{t("welcome")}</h2>
      </div>
      {/* first section */}
      <div className="signin-container_inner">
        <div className="signin-container_inner_background_image">
          <Image
            src={image}
            fill
            style={{
              objectFit: "cover",
            }}
            alt="Picture of the background"
            placeholder="blur"
            loading="eager"
          />
        </div>
        <form onSubmit={handleSubmit} className="signin-form-container">
          <input
            type="email"
            className="signin-form"
            value={user.email}
            onChange={handleUserEmail}
            placeholder={t("email_placeholder")}
          />
          <div className="signin-form-password">
            <input
              type={isVisible ? "text" : "password"}
              className="signin-form"
              value={user.password}
              onChange={handleUserPassword}
              placeholder={t("password_placeholder")}
            />
            <div
              onClick={toggleVisibility}
              className="signin-form-password-visibility"
            >
              {isVisible ? <BsEye /> : <BsEyeSlash />}
            </div>
          </div>
          <div className="forgot-password">
            {" "}
            <a href="/forgotpassword">{t("forgot_password")}</a>
          </div>
          <button
            type="submit"
            className="submit-button-signin-special"
            style={{
              color: "black !important;",
              fontWeight: "600 !important",
              background: buttonDisabled
                ? "rgba(189, 255, 5, .7) !important;"
                : "rgba(189, 255, 5, 1) !important;",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id="container-signin-signin-special">
                <div id="html-spinner-signin-signin-special"></div>
              </div>
            ) : (
              t("login_button")
            )}
          </button>
        </form>
        <div className="welcome-section">
          <div className="welcome-section-first">
            <h2 className="welcome-section-first_h2">{t("welcome")}</h2>
          </div>
          <div className="welcome-section-second">
            {/* <h5 className="welcome-section-second_h5">{t("continue_with")}</h5>
            <div className="signin-img google">
              <Image
                src={image4}
                fill
                style={{
                  objectFit: "cover",
                }}
                alt="Picture of the author"
                loading="eager"
              />
            </div> */}
            <p className="welcome-section-second_p">
              {t("create_account")},{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signup">{t("create_account_link")}</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className="signin-container_inner23">
        <div className="welcome-section-mobile">
          <div className="welcome-section-second-mobile">
            <h5 className="welcome-section-second_h5-mobile">
              {t("continue_with")}
            </h5>
            <div className="signin-img google">
              <Image
                src={image4}
                loading="eager"
                fill
                style={{
                  objectFit: "cover",
                }}
                alt="Picture of the author"
              />
            </div>
            <p className="welcome-section-second_p-mobile">
              {t("create_account")},{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signup">{t("create_account_link")}</a>
              </span>
            </p>
          </div>
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: "20px 0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {t("contact_us")}
        </div>
        <div className="signin-social-media-icons">
          <div className="signin-img facebook">
            <Image
              src={image1}
              loading="eager"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Picture of the author"
            />
          </div>
          <div className="signin-img whatsapp">
            <Image
              src={image2}
              loading="eager"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Picture of the author"
            />
          </div>
          <div className="signin-img tiktok">
            <Image
              src={image3}
              loading="eager"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
