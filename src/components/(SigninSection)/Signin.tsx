"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../public/loginBackground.png";
import image1 from "../../../public/Facebook.svg";
import image2 from "../../../public/Whatsapp.svg";
import image3 from "../../../public/TikTok.svg";
import image4 from "../../../public/Google.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./signin.css";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    localStorage.setItem("rememberedEmailForEspece", user.email);
    localStorage.setItem("rememberedPasswordForEspece", user.password);
    console.log(user);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        <h2>Bienvenue</h2>
      </div>
      {/* first section */}
      <div className="signin-container_inner">
        <div className="signin-container_inner_background_image">
          <Image
            src={image}
            fill
            loading="lazy"
            style={{
              objectFit: "cover",
            }}
            alt="Picture of the background"
            placeholder="blur"
          />
        </div>
        <form onSubmit={handleSubmit} className="signin-form-container">
          <input
            type="text"
            className="signin-form"
            value={user.email}
            onChange={handleUserEmail}
            placeholder="Entrez votre e-mail"
          />
          <div className="signin-form-password">
            <input
              type={isVisible ? "text" : "password"}
              className="signin-form"
              value={user.password}
              onChange={handleUserPassword}
              placeholder="Entrer le mot de passe"
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
            <a href="">Mot de passe oublié?</a>
          </div>
          <button
            type="submit"
            className="submit-button"
            style={{
              background: buttonDisabled
                ? "rgba(189, 255, 5, .7)"
                : "rgba(189, 255, 5, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
            }}
          >
            {loading ? (
              <div id="container-signin">
                <div id="html-spinner-signin"></div>
              </div>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
        <div className="welcome-section">
          <div className="welcome-section-first">
            <h2 className="welcome-section-first_h2">Bienvenue</h2>
          </div>
          <div className="welcome-section-second">
            <h5 className="welcome-section-second_h5">Ou continuez avec</h5>
            <div className="signin-img google">
              <Image
                src={image4}
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
                alt="Picture of the author"
              />
            </div>
            <p className="welcome-section-second_p">
              Vous n&apos;avez pas de compte?,{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signup">Créez un compte !</a>
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
              Ou continuez avec
            </h5>
            <div className="signin-img google">
              <Image
                src={image4}
                loading="lazy"
                fill
                style={{ objectFit: "cover" }}
                alt="Picture of the author"
              />
            </div>
            <p className="welcome-section-second_p-mobile">
              Vous n&apos;avez pas de compte?,{" "}
              <span style={{ color: "#FCBB45", fontWeight: "500" }}>
                <a href="/signup">Créez un compte !</a>
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
          Contactez-nous
        </div>
        <div className="signin-social-media-icons">
          <div className="signin-img facebook">
            <Image
              src={image1}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
          <div className="signin-img whatsapp">
            <Image
              src={image2}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
          <div className="signin-img tiktok">
            <Image
              src={image3}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
