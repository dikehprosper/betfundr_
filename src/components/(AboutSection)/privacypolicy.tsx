"use client";
import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
import {useTranslations} from "next-intl";
import {form1, form2} from "./form";
import langDataEn from "@/messages/en/about.json";
import langDataFr from "@/messages/fr/about.json";
import langDataEn2 from "@/messages/en/home.json";
import langDataFr2 from "@/messages/fr/home.json";
import langDataEn3 from "@/messages/en.json";
import langDataFr3 from "@/messages/fr.json";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const PrivacySection = ({updatedTheme, updatedLang}: any) => {



   const getLangData = () => {
    return updatedLang === "en" ? langDataEn : langDataFr;
  };
    const t = getLangData();

    
  const getLangData2 = () => {
    return updatedLang === "en" ? langDataEn2 : langDataFr2;
  };
    const getLangData3 = () => {
    return updatedLang === "en" ? langDataEn3 : langDataFr3;
  };

  const t2 = getLangData2();
  const t3 = getLangData3();
  // Define the URL for account deletion
  const accountDeletionLink = "https://forms.gle/BmwYVMmxtJ1cwi4b9";

  return (
    <div>
      <div className='AboutSection'>
        <h2 style={{color: updatedTheme === "dark" ? "white" : "black"}}>
          {t2.contact_us_description}
        </h2>
        <p
          style={{
            color: updatedTheme === "dark" ? "white" : "black",
            fontSize: "14px",
            lineHeight: "20px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "start",
          }}
        >
          {t2.contact_us_description.includes("Privacy policy") ? form1 : form2}
        </p>
      </div>

      <div className='AboutSection3'>
        <div className='AboutSection3-text'></div>
      </div>
    </div>
  );
};

export default PrivacySection;






// TABLE OF CONTENTS

// 1. WHAT INFORMATION DO WE COLLECT?
// 2. HOW DO WE USE YOUR INFORMATION?
// 3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
// 4. HOW LONG DO WE KEEP YOUR INFORMATION?
// 5. HOW DO WE KEEP YOUR INFORMATION SAFE?
// 6. DO WE COLLECT INFORMATION FROM MINORS?
// 7. WHAT ARE YOUR PRIVACY RIGHTS?
// 8. CONTROLS FOR DO-NOT-TRACK FEATURES
// 9. DO WE MAKE UPDATES TO THIS NOTICE?
// 10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
// 11. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?

// 1. WHAT INFORMATION DO WE COLLECT?

// Personal information you disclose to us

// In Short:  We collect personal information that you provide to us.

// We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and Services, when you participate in activities on the App or otherwise when you contact us.

// The personal information that we collect depends on the context of your interactions with us and the App, the choices you make and the products and features you use. The personal information we collect may include the following:

// Personal Information Provided by You. We collect names; phone numbers; passwords;  email addresses; birth dates; and other similar information.


// Information collected through our App

// In Short:  We collect information regarding your  push notifications, when you use our App.

// If you use our App, we also collect the following information:

// Contact List. we may request to access your contact list, this is to help quick selection of contact to recharge via Billpoint. and you equally have the permission to decline such request.

// Push Notifications. We may request to send you push notifications regarding your account or certain features of the App. If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.
// This information is primarily needed to maintain the security and operation of our App, for troubleshooting and for our internal analytics and reporting purposes.

// 2. HOW DO WE USE YOUR INFORMATION?

// In Short:  We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.

// We use personal information collected via our App for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.

// We use the information we collect or receive:
// To facilitate account creation and login process. If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and login process for the performance of the contract.

// To post testimonials. We post testimonials on our App that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update, or delete your testimonial, please contact us at support@betfundr.com and be sure to include your name, testimonial location, and contact information.

// Request feedback. We may use your information to request feedback and to contact you about your use of our App.

// To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.

// To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.


// Fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the App.


// Administer prize draws and competitions. We may use your information to administer prize draws and competitions when you elect to participate in our competitions.


// To deliver and facilitate delivery of services to the user. We may use your information to provide you with the requested service.


// To respond to user inquiries/offer support to users. We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.

// To send you marketing and promotional communications. We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about us or our App, subscribing to marketing or otherwise contacting us, we will collect personal information from you. You can opt-out of our marketing emails at any time (see the "WHAT ARE YOUR PRIVACY RIGHTS?" below).

// Deliver targeted advertising to you. We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.


// 3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?

// In Short:  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.

// We may process or share your data that we hold based on the following legal basis:
// Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.

// Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.

// Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.

// Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).

// Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
// More specifically, we may need to process your data or share your personal information in the following situations:
// Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.



// 4. HOW LONG DO WE KEEP YOUR INFORMATION?

// In Short:  We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.

// We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.

// When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.

// 5. HOW DO WE KEEP YOUR INFORMATION SAFE?

// In Short:  We aim to protect your personal information through a system of organizational and technical security measures.

// We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our App is at your own risk. You should only access the App within a secure environment.

// 6. DO WE COLLECT INFORMATION FROM MINORS?

// In Short:  We do not knowingly collect data from or market to children under 18 years of age.

// We do not knowingly solicit data from or market to children under 18 years of age. By using the App, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the App. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at support@betfundr.com.

// 7. WHAT ARE YOUR PRIVACY RIGHTS?

// In Short:  You may review, change, or terminate your account at any time.
 

// Account Information

// If you would at any time like to review or change the information in your account or terminate your account, you can:
// Log in to your account settings and update your user account.

// Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.

// Opting out of email marketing: You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list — however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may:

// 8. CONTROLS FOR DO-NOT-TRACK FEATURES

// Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice. 


// 10. DO WE MAKE UPDATES TO THIS NOTICE?     

// In Short:  Yes, we will update this notice as necessary to stay compliant with relevant laws.

// We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.

// 11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?     

// If you have questions or comments about this notice, you may email us support@betfundr.com



// 12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?     

// Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you,
