/* eslint-disable react/no-unescaped-entities */
/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/(Navs)/UserNav";
import Head from "@/components/(userscomponent)/(head)/head";
import "./referrals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Display from "@/components/(userscomponent)/(display)/display2";
import { usePathname } from "next/navigation";
import Referral from "@/components/(referral)/referral";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import { CgTrashEmpty } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const Referrals = () => {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const router = useRouter();
 
  const [isOnline, setIsOnline] = useState(true);
  const data = useAppSelector((state: any) => state.user.value);

  const transactions = useAppSelector(
    (state: any) => state.user.pendingTransactions
  );
  const dispatch = useAppDispatch();

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
   dispatch(setUser(res.data.data));
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error(
            "Vous vous êtes connecté ailleurs. Vous devez vous reconnecter ici."
          );
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 402) {
          toast.error(
            "Votre session a expiré. Redirection vers la connexion..."
          );
          router.push("/signin"); // Replace '/login' with your actual login route
        } else if (error.response.status === 404) {
          toast.error("Votre compte a été désactivé");
          router.push("/signin");
        } else {
          // Handle other errors
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  };
  const [submitting, setSubmitting] = useState(false);

  async function getReferrals() {
    try {
      setSubmitting(true);
      const referrals = data.referrals;
      const res = await axios.post("/api/getTotalReferral", referrals);
      setReferrals(res.data.usersSuccesfulCountusers);
      setSubmitting(false);
    } catch (error: any) {
      toast.error("error ");
    }
  }

  

  useEffect(() => {
    getReferrals();
    getUserDetails();
  }, []);

  useEffect(() => {
    // Check initial network status
    setIsOnline(window.navigator.onLine);

    // Add event listeners for online/offline changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    console.log(referrals, "kkkkkkkkk");
  });

  async function getReferrals() {
    try {
      setSubmitting(true);
      const referrals = data.referrals;
      const res = await axios.post("/api/getTotalReferral", referrals);
      setReferrals(res.data.usersSuccesfulCountusers);
      setSubmitting(false);
    } catch (error: any) {
      toast.error("error ");
    }
  }

  const amountsArray = referrals?.map((obj) => obj?.SuccesfulDepositCountusers);
  const totalAmount = amountsArray?.reduce(
    (acc, SuccesfulDepositCountusers) => acc + SuccesfulDepositCountusers,
    0
  );

  const amountsArray2 = referrals?.map(
    (obj) => obj?.SuccesfulWithdrawalCountusers
  );
  const totalAmount2 = amountsArray2?.reduce(
    (acc, SuccesfulWithdrawalCountusers) => acc + SuccesfulWithdrawalCountusers,
    0
  );

  const result = totalAmount + totalAmount2;
  const threePercent = (3 / 100) * result;
  const total = (5 / 100) * threePercent;
  const totalCount = referrals?.length;

  const [active, setActive] = useState("user-referral-container2-inner5");
 
  return (
    <div className='user-referral-container'>
      <Head
        title={t("referral_page.title")}
        about={t("referral_page.about")}
        data={data}
      />

      <Referral data={data} />

      <div className='user-referral-container2'>
        <div className='user-referral-container2-inner1'>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner3")}
            style={{
              color:
                active === "user-referral-container2-inner3" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner4" ||
                active === "user-referral-container2-inner6"
                  ? "user-referral-container2-inner8"
                  : active
              }
            ></div>
            <span style={{zIndex: "10"}}>
              {t("referral_page.how_it_works")}
            </span>
          </div>
          <div
            className='user-referral-container2-inner2'
            onClick={() => setActive("user-referral-container2-inner4")}
            style={{
              color:
                active === "user-referral-container2-inner4" ? "black" : "",
            }}
          >
            <div
              className={
                active === "user-referral-container2-inner3" ||
                active === "user-referral-container2-inner5"
                  ? "user-referral-container2-inner7"
                  : active
              }
            ></div>
            <span style={{zIndex: "10"}}>{t("referral_page.title")}</span>
          </div>
        </div>

        {active === "user-referral-container2-inner3" ||
        active === "user-referral-container2-inner5" ? (
          <div className='user-referral-container2-inner1-inner2'>
            <p
              style={{
                textTransform: "capitalize",
                color: "rgba(256, 256, 256, 0.7)",
              }}
            >
              {t("referral_page.copyReferralLink")}
            </p>
          </div>
        ) : null}

        {active === "user-referral-container2-inner4" ||
        active === "user-referral-container2-inner6" ? (
          <div className='user-referral-container2-inner1-inner'>
            <div className='body-referral-count'>
              <div className='body-referral-count2'>
                <div className='body-referral-count3'>
                  <div className='body-referral-count4'>
                    {t("transaction_page.image")}
                  </div>
                  <div className='body-referral-count4'>
                    {t("referral_page.name")}
                  </div>
                  <div className='body-referral-count4'> {t("referral_page.email")}</div>
                </div>
                {referrals?
                referrals.length > 0 ? (
                  referrals.map((referral): any => {
                    const number = referral.SuccesfulDepositCountusers;
                    const threePercent = (3 / 100) * number;
                    const result = (5 / 100) * threePercent;
                    const number2 = referral.SuccesfulWithdrawalCountusers;
                    const threePercent2 = (3 / 100) * number2;
                    const result2 = (5 / 100) * threePercent2;
                    const total = result + result2;
                    const imageUrl =
                      referral.image === ""
                        ? "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d"
                        : referral.image;
                    return (
                    
                        <div className='body-referral-count5'>
                         <div className='body-referral-count6'>
                            <Image
                              src={imageUrl}
                              style={{objectFit: "contain", borderRadius: 15}}
                              alt='background'
                              width={30}
                              height={30}
                            />
                          </div>
                          <div className='body-referral-count6'>
                            {referral.name}
                          </div>
                          <div className='body-referral-count6'>
                            {referral.email}
                          </div>
                        </div>
                      
                    );
                  })
                ) : (
                  <div
                    className='no-result animate-pop-in'
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flex: "1",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "30px",
                      flexDirection: "column",
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: "50px",
                    }}
                  >
                    <CgTrashEmpty fontSize='60px' />
                    <h5>{t("referral_page.noReferrals")}</h5>
                  </div>
                ): "loading"}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Referrals;
