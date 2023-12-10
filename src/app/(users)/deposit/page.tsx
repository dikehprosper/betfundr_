"use client";
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./deposit.css";
import Head from "@/components/(userscomponent)/(head)/head";
import { FaCircle } from "react-icons/fa";
import FooterMobile from "@/components/(Utils)/FooterMobile";
import axios from "axios";
import { IoIosCopy } from "react-icons/io";
import {useRouter} from "next/navigation";
import { FedaPay } from "fedapay";
// import App from "../pay";
const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [activeBetId, setActiveBetId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingCall, setIsRequestingCall] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    betId: "",
    network: "",
    amount: "",
    ussdCode: "",
    transactionId: "",
    email: ""
  });
  const router = useRouter();
  const [phoneDial, setPhoneDial] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUserInfo");
      setSavedID(res.data.data.betID);
      setActiveBetId(res.data.data.betID[0]);
      console.log(res.data.data.betID[0]);
      setUser({
        ...user,
        _id: res.data.data._id,
        betId: res.data.data.betID[0],
        email: res.data.data.email
      });
    } catch (error: any) {
      if (error.response) {
        // Handle token expiration
        if (error.response.status === 401) {
          toast.error("Your session has expired. Redirecting to signin...");
          router.push("/signin"); // Replace '/login' with your actual login route
        } else {
          // Handle other errors
          toast.error("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // Handle network errors (no connection)
        setIsOnline(false);
      }
    }
  };

  useEffect(() => {
    console.log(user)
  })

  useEffect(() => {
    // Check network status before making the request
    if (isOnline) {
      getUserDetails();
    } else {
      toast.error(
        "No network connection. Please check your connection and try again."
      );
    }
  }, [isOnline]);

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

  // setUser((prevUser) => ({ ...prevUser, _id: res.data.data._id, betId: res.data.data.betID[0]}));
  function initiatePhoneCall(phoneNumber: any) {
    // Check if the browser supports the tel protocol
    if ("href" in HTMLAnchorElement.prototype) {
      // Create an anchor element with the tel link
      var link = document.createElement("a");
      link.href = "tel:" + phoneNumber;

      // Trigger a click on the link to open the default phone application
      link.click();
    } else {
      // Handle browsers that do not support the tel protocol
      console.error("Phone call initiation is not supported in this browser.");
    }
  }
  // useEffect(() => {
  //     setUser({
  //       ...user,
  //       betId: activeBetId,
  //     });
  // }, [activeBetId, user])

  // useEffect(() => {
  //    savedID.map((id) => {
  //     if (id === user.betId) {
  //       setActiveBetId(id)
  //     } else {
  //         setActiveBetId(id);
  //     }
  //    })
  // }, [user.betId])

  const handleChangeId = (event: any) => {
    setActiveBetId(event.target.value);
    const newValue = event.target.value;
    setUser((prevUser) => ({ ...prevUser, betId: newValue }));
  };

  const changeBetId = (id: any) => {
    setActiveBetId(id);
    const newValue = id;
    setUser((prevUser) => ({ ...prevUser, betId: newValue }));
  };

  const changeTransactionId = (event: any) => {
    const newValue = event.target.value;
    setUser((prevUser) => ({ ...prevUser, transactionId: newValue }));
  };

  const handleChangeNetwork = (event: any) => {
    requestCall();
    setUser({
      ...user,
      network: event.target.value,
    });
  };

  function requestCall() {
    if (isRequestingCall) {
      return;
    }
    setIsRequestingCall(true);
    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }
    if (amountValue < 500) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 500");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else {
      setPhoneDial(`#180*345*44939959*${user.amount}#`);
      initiatePhoneCall(`#180*345*44939959*${user.amount}#`);
      setIsRequestingCall(false);
    }
  }

  async function submitDetails() {
    if (isSubmitting) {
      return;
    }

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 500) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 500");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else {
      try {
        setIsSubmitting(true);
        const res = await axios.post("/api/users/deposit", user);
        console.log(res);
        router.push("/dashboard");
        toast.success("deposit request Submitted");
      } catch (error: any) {
        return toast.error("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const handleChangeAmount = (event: any) => {
    setUser({
      ...user,
      amount: event.target.value,
    });
  };

  const handleUssdCode = (event: any) => {
    setUser({
      ...user,
      ussdCode: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    toast.success("Soumis! Votre demande sera traitée sous peu");
  };

  //check email and password state to determine ButtonDisabled state
  useEffect(() => {
    if (
      user.transactionId === "" ||
      user.amount === "" ||
      user.network === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  // const handlePayment = async () => {
  //   try {
  //     const baseUrl = "/api/users/deposit";

  //     const response = await axios.post(baseUrl);

  //     const token = `Bearer ${response.data.token}`;
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopyClick = () => {
    if (inputRef.current) {
      // Select the text inside the input field
      inputRef.current.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");
    }
    toast.success("USSD CODE successfully copied!");
  };

  // Example using fetch
  const createTransaction = async () => {
      if (isSubmitting) {
      return;
    }

    const amountValue = parseInt(user.amount, 10);
    if (isNaN(amountValue)) {
      // Handle the case where user.amount is not a valid number
      return toast.error("Vous n'avez pas saisi de montant");
    }

    if (amountValue < 500) {
      return toast.error("Le montant saisi ne doit pas être inférieur à 500");
    } else if (user.betId === "") {
      return toast.error("Entrez le betId à utiliser");
    } else {
    try {
      const response = await axios.post("/api/users/deposit2", user); // Replace with your actual route
      const data = response.data.url1
      console.log(data);
       window.location.href = data;
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
    setIsSubmitting(false);
  }
  } 
  };

// const FedapayCheckout = () => {
//   const publicKey = "VOTRE_CLE_API_PUBLIQUE"; // Replace with your actual public key
//   const fedapay = new FedaPay(publicKey);

//   // Initialize FedaPay checkout
//   const checkoutOptions = {
//     amount: 1000, // Set the initial amount as needed
//     description: "Acheter mon produit",
//     customer: {
//       email: "johndoe@gmail.com",
//       lastname: "Doe",
//       firstname: "John",
//     },
//   };

//   fedapay.checkout(checkoutOptions);

//   // Clean up the script when the component unmounts
//   return () => {
//     // You may need to clean up resources associated with the checkout
//   };
// };

  return (
    <div className='user_withdraw_container'>
      <Head title='Dépôts' about='Effectuez vos dépôts sur votre 1XBET ici' />
      <button onClick={createTransaction}>submit</button>
      {/* <App /> */}
      <div className='user_deposit_container_001'>
        <form onSubmit={handleSubmit} className='deposit-form-container'>
          <label>1XBET ID</label>
          <div className='saved_id_container_outer'>
            <div
              style={{
                color: "rgba(256, 256, 256, 0.5)",
                width: "100%",
                display: "flex",
              }}
            >
              Enregistrez 2 identifiants 1XBET différents dans votre profil pour
              les afficher ici{" "}
            </div>
            <div className='saved_id_container'>
              {savedID?.map((id, index) => (
                <div
                  className='saved_id_container-inner'
                  key={index}
                  onClick={() => changeBetId(id)}
                  style={{
                    border:
                      activeBetId === id
                        ? "2px solid white"
                        : "2px solid rgba(256, 256, 256, 0.2)",
                    color:
                      activeBetId === id ? "white" : "rgba(256, 256, 256, 0.2)",
                    cursor: "pointer",
                  }}
                >
                  {id}{" "}
                  {activeBetId === id ? (
                    <FaCircle color='white' />
                  ) : (
                    <FaCircle color='rgba(256, 256, 256, 0.2' />
                  )}
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: "light",
                      color: "rgba(256, 256, 256, 0.5)",
                    }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <input
            type='text'
            className='deposit-form'
            value={user.betId}
            onChange={handleChangeId}
            placeholder="Entrez l'identifiant 1XBET"
          />
          <div
            style={{
              color: "rgba(256, 256, 256, 0.5)",
              width: "100%",
              display: "flex",
              marginTop: "15px",
            }}
          >
            <span
              style={{
                width: "100%",
              }}
            >
              {" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                Note:
              </span>{" "}
              &nbsp; Le montant de la transaction ne doit pas être inférieur à
              500
            </span>
          </div>
          <label>Montant</label>
          <input
            type='number'
            className='deposit-form'
            value={user.amount}
            onChange={handleChangeAmount}
            placeholder='Entrez le montant du dépôt'
          />
          {/* 
          <label htmlFor='network'>Réseau</label>
          <select
            id='network'
            className='deposit-form' // Apply the same class as the input for styling
            value={user.network}
            onChange={handleChangeNetwork}
          >
            <option value='' disabled hidden>
              -- Choose Network --
            </option>{" "}
            <option value='Mtn momo'> Mtn momo</option>
            <option value='Airtel'>Airtel</option>
            <option value='Glo'>Glo</option>
          </select>
          <div
            className='submit-button-deposit'
            style={{
              background: "rgba(128, 128, 128, 1)",
              marginTop: "2px",
            }}
            onClick={requestCall}
          >
            {loading ? (
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
              </div>
            ) : (
              "Générer"
            )}
          </div>

          <label>USSD CODE</label>
          <div style={{ display: "flex", position: "relative", width: "100%" }}>
            <input
              type='text'
              className='deposit-form'
              value={phoneDial}
              key={phoneDial}
              ref={inputRef}
            />
            {phoneDial && (
              <span
                style={{
                  position: "absolute",
                  right: "18px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                  color: "green",
                  fontSize: "14px",
                }}
                onClick={handleCopyClick}
              >
                <IoIosCopy />
                copier
              </span>
            )}
          </div>*/}
          {/*       
          <label>Transaction Id</label>
          <input
            type='text'
            className='deposit-form'
            value={user.transactionId}
            onChange={changeTransactionId}
            placeholder="soumettre l'identifiant de la transaction"
          /> */}
          <div
            className='submit-button-deposit'
            style={{
              background: buttonDisabled
                ? "rgba(128, 128, 128, 0.5)"
                : "rgba(128, 128, 128, 1)",
              pointerEvents: buttonDisabled ? "none" : "auto",
              cursor: "pointer",
            }}
            onClick={submitDetails}
          >
            {loading ? (
              <div id='container-signin'>
                <div id='html-spinner-signin'></div>
              </div>
            ) : (
              "Procéder"
            )}
          </div>
        </form>
      </div>
      <FooterMobile />
    </div>
  );
};

export default Deposit;
