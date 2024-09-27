"use client";
import {useState, useEffect}  from "react"
 import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";
import FifthSection from "@/components/(LandingPage)/(FifthSection)/FifthSection";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import PrivacyFooter from "@/components/(LandingPage)/(Footer)/PrivacyFooter";
import Banner from "@/components/Banner/Banner";
import {  useAppSelector } from "@/lib/hooks";

export default function Home() {
 // Get the theme from the Redux store or default to "light"
  const storedTheme = useAppSelector((state) => state.theme.theme) || "light";
  const [updatedTheme, setUpdatedTheme] = useState(storedTheme);

  // Sync with localStorage
  useEffect(() => {
    // Set the theme in localStorage
    localStorage.setItem('theme', updatedTheme);
  }, [updatedTheme]);

  // Load the theme from localStorage on initial render
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setUpdatedTheme(localTheme);
    }
  }, []);

  return (updatedTheme === "dark" || updatedTheme === "light"? 
      <div className='main' style={{background: updatedTheme === "dark"? "rgb(10, 20, 38)" : "white"}}>
       
        <div className='home-banner'>{/* <Banner /> */}</div>
       
        <Hero updatedTheme={updatedTheme}/>
      
        <SecondSection updatedTheme={updatedTheme} />
        <ThirdSection updatedTheme={updatedTheme} />
        <FourthSection updatedTheme={updatedTheme} /> 
         <Footer updatedTheme={updatedTheme} />
        <PrivacyFooter updatedTheme={updatedTheme} />
      </div>: null
    
  );
}
