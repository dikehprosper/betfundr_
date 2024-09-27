"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Modal from "../(Utils)/SmallScreenNavModal";
import CompanyLogo from "../../../public/Logo.webp";
import FacebookLogo from "../../../public/Facebook.svg";
import WhatsappLogo from "../../../public/Whatsapp.svg";
import TwitterLogo from "../../../public/twitter-logo.avif";
import TiktokLogo from "../../../public/TikTok.svg";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import {
  BiLogOutCircle,
  BiLogInCircle,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { BsFillPersonFill } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GrUserWorker, GrUserManager } from "react-icons/gr";
import { FaUsers, FaNetworkWired } from "react-icons/fa";
import BigScreenNavModal from "../(Utils)/BigScreenNavModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";
import LanguageToggle from "../(LanguageToggle)/languageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { setTheme } from "@/lib/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


const UserNav = () => {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [state, setState] = useState(true);


  const UsersNavLinks = [
    {
      title: t("navLinks.dashboard"),
      pathname: `/${locale}/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: t(`navLinks.deposit`),
      pathname: `/${locale}/deposit`,
      icon: <BiLogInCircle />,
    },
    {
      title: t(`navLinks.withdraw`),
      pathname: `/${locale}/withdraw`,
      icon: <BiLogOutCircle />,
    },
    {
      title: `Transactions`,
      pathname: `/${locale}/transactions`,
      icon: <LuHistory />,
    },
      {
      title: `Références`,
      pathname: `/${locale}/referrals`,
      icon: <IoMdPeople />,
    },
    {
      title: t(`navLinks.profile`),
      pathname: `/${locale}/profile`,
      icon: <BsFillPersonFill />,
    },
  ];

  const SubAdminsNavLinksDeposits = [
    {
      title: t(`navLinks.dashboard`),
      pathname: `/${locale}/subadmin/deposit/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: `Transactions`,
      pathname: `/${locale}/subadmin/deposit/transactions`,
      icon: <LuHistory />,
    },
  ];

  const SubAdminsNavLinksWithdrawal = [
    {
      title: t(`navLinks.dashboard`),
      pathname: `/${locale}/subadmin/withdrawal/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: `Transactions`,
      pathname: `/${locale}/subadmin/withdrawal/transactions`,
      icon: <LuHistory />,
    },
  ];

  const AdminNavLinks = [
    {
      title: t(`adminNavLinks.dashboard`),
      pathname: `/${locale}/admin/dashboard`,
      icon: <BiSolidDashboard />,
    },
    {
      title: t(`adminNavLinks.allHistory`),
      pathname: `/${locale}/admin/allhistory`,
      icon: <SiSimpleanalytics />,
    },
    {
      title: t(`adminNavLinks.withdrawals`),
      pathname: `/${locale}/admin/withdrawals`,
      icon: <TbDeviceDesktopAnalytics />,
    },
    {
      title: t(`adminNavLinks.users`),
      pathname: `/${locale}/admin/users`,
      icon: <FaUsers />,
    },
    // {
    //   title: `Messages`,
    //   pathname: "/admin/messages",
    //   icon: <BiSolidMessageSquareDetail />,
    // },
    // {
    //   title: `Système`,
    //   pathname: "/admin/system",
    //   icon: <FaNetworkWired />,
    // },
    // {
    //   title: `Références`,
    //   pathname: "/admin/referrals",
    //   icon: <IoMdPeople />,
    // },
  ];

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      // localStorage.removeItem("activeTab");
      toast.success("Logout successful");
      // Only redirect if the axios request is successful
      // localStorage.removeItem("activeTab");
      // router.push("/signin");
    } catch (error: any) {
      // console.log(error.message);
      // toast.error(error.message);
      toast.error("failed");
    }
  };
  function changeState() {
    setState((prev) => {
      return !prev;
    });
  }

  function handleClick() {
    setState(true);
  }

  function findPath() {
    if (pathname.startsWith("/en/admin") || pathname.startsWith("/fr/admin")) {
      return AdminNavLinks;
    } else if (pathname.startsWith("/en/subadmin/deposit") || pathname.startsWith("/fr/subadmin/deposit")) {
      return SubAdminsNavLinksDeposits;
    } else if (pathname.startsWith("/en/subadmin/withdrawal") || pathname.startsWith("/fr/subadmin/withdrawal")) {
      return SubAdminsNavLinksWithdrawal;
    } else {
      return UsersNavLinks;
    }
  }




 const dispatch = useAppDispatch();
    const updatedTheme = useAppSelector((state) => state.theme.theme);

    useEffect(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem("theme") // Default to light
        dispatch(setTheme(value)); // Set the theme in Redux
    }, [dispatch]);

    const toggleTheme = () => {
        const newTheme = updatedTheme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        dispatch(setTheme(newTheme)); // Update the Redux state
    };

    useEffect(() => {
        console.log(updatedTheme, "updatedTheme"); // Log the current theme
    }, [updatedTheme]);




  return (
    <>
      <div className="user-nav for-larger-devices">
        <div style={{ width: "100%" }}>
          <div className="user-nav-img-container">
            <div className="user-nav-img">
              <Image
                src={CompanyLogo}
                loading="eager"
                fill
                style={{
                  objectFit: "cover",
                }}
                alt="Picture of the author"
                placeholder="blur"
              />
            </div>
          </div>
          <BigScreenNavModal
            containerStyles="user-nav-link"
            navLinks={findPath()}
          />
        </div>

        <div className="user-nav-link-bottom">
          <Link
            // className={` ${pathname === "/logout" ? "active" : ""}`}
            href="/"
            onClick={logout}
          >
            <MdLogout />
            &nbsp; &nbsp; {t("logout")}
          </Link>
          <div className="user-nav-social-media">
            <h4 ><div style={{display: 'flex', justifyContent: "space-evenly", gap: "17px",flexDirection: "row"}}>Follow      <ThemeToggle updatedTheme={updatedTheme} toggleTheme={toggleTheme} />         <LanguageToggle /></div></h4>
     
            <div className="user-nav-social-media-icons">
              <div className="user-nav-logo facebook">
                <Image
                  src={FacebookLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Picture of the author"
                />
              </div>
              <div className="user-nav-logo whatsapp">
                           <a
                           style={{flex: 1, display: 'flex'}}
        href="https://wa.me/22957577103" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
         
                <Image
                  src={WhatsappLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Picture of the author"
                />
                  </a>
              </div>
              <div className="user-nav-logo tiktok">
                <Image
                  src={TiktokLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Picture of the author"
                />
              </div>



                      <div className="user-nav-logo facebook">
      <a
        href="" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        <Image
          src={FacebookLogo}
          loading="eager"
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Facebook logo"
        />
      </a>
    </div>

              <div className="user-nav-logo whatsapp">
                  <a
        href="https://wa.me/22957577103" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
                <Image
                  src={WhatsappLogo}
                  loading="eager"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Picture of the author"
                /></a>
              </div>
            <div className="user-nav-logo twitter">
      <a
        href="" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        <Image
          src={TwitterLogo}
          loading="eager"
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Twitter logo"
        />
      </a>
    </div>



            </div>
          </div>
        </div>
      </div>

      <>
        <div className="nav for-smaller-devices">
          <div className="nav-img">
            <Image
              src={CompanyLogo}
              loading="lazy"
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Picture of the author"
            />
          </div>

          <div className="nav-link">
            <Link className={` ${pathname === "/" ? "active" : ""}`} href="/">
              Accueil
            </Link>
            <Link
              className={` ${pathname === "/about" ? "active" : ""}`}
              href="/about"
            >
              À propos de nous
            </Link>
            <Link
              className={` ${pathname === "/signin" ? "active" : ""}`}
              href="/signin"
            >
              Se connecter
            </Link>
            <Link
              className={` ${pathname === "/signup" ? "active" : ""}`}
              href="/signup"
            >
              S&apos;inscrire
            </Link>
          </div>
          <div className="nav-language"></div>
          <div className="user-profile-icon-container">
            <LanguageToggle />


  <ThemeToggle updatedTheme={updatedTheme} toggleTheme={toggleTheme} />

        

            {/* <Link href="/profile">
              <div
                className={`user-profile-icon ${
                  pathname === "/profile" ? "disappear" : ""
                }`}
              >
                D<span className="user-profile-online-icon-mobile"> </span>
              </div>
            </Link> */}
            <div onClick={changeState}>
              {state ? (
                <MdMenuOpen className="MdMenuOpen" />
              ) : (
                <AiOutlineClose className="MdMenuOpen" />
              )}
            </div>
          </div>
        </div>
        {!state && (
          <Modal
            navLinks={findPath()}
            containerStyles="nav-link2"
            handleClick={handleClick}
            logout={logout}
            containerStylesInner="users-nav-link2_inner"
            containerStylesInnerLink="nav-link2_inner_link-mobile"
            active="active-user-nav"
          />
        )}
      </>
    </>
  );
};

export default UserNav;
