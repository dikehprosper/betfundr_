import React from "react";
import Head from "@/components/(userscomponent)/(head)/head";
import Display from "@/components/(userscomponent)/(display)/display";
import "./dash.css";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
import { LuHistory } from "react-icons/lu";
const Dashboard = async () => {
  return (
    <div className='user_dashboard_container'>
      <Head
        title='Bienvenue'
        about="Faites l'expérience de dépôts et de retraits rapides"
      />
      <div className='user-dashboard-display'>
        <Display
          count={1}
          title='Dépôt'
          term={1}
          amount={566789868.99}
          style={{
            color: "#658900",
            background: "rgba(101, 137, 0, 0.4)",
            icon: <TbPigMoney />,
          }}
        />
        <Display
          count={1}
          term={2}
          title='Retirer'
          amount={86834890.99}
          style={{
            color: "#0076B8",
            background: "rgba(0, 118, 184, .4)",
            icon: <RiMoneyDollarCircleLine />,
          }}
        />
      </div>
      <TransactionTemplate
        title={{ name: "Transaction History", icon: <LuHistory /> }}
        select={{
          firstSelect: { big: "View All", small: "All" },
          secondSelect: { big: "View Deposits", small: "Deposits" },
          thirdSelect: { big: "View Withdrawals", small: "Withdrawals" },
        }}
      />
    </div>
  );
};

export default Dashboard;
