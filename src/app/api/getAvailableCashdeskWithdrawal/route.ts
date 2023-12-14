import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    // Fetch all subadmin users who handle withdrawals

    // Function to count "Pending" transactions for a subadmin
    const countPendingTransactions = (subadmin: any) => {
      return subadmin.transactionHistory.filter(
        (transaction: any) => transaction.status === "Pending"
      ).length;
    };

    const subadminUsers = await User.find({ isSubAdminWithdrawals: true });

    // Filter subadmin users who are not out of funds
    const subadminUsersWithFunds = subadminUsers.filter(
      (subadminUser) => !subadminUser.isOutOfFunds
    );

    const sortedSubadmins = subadminUsersWithFunds.sort((a, b) => {
      const countPendingA = countPendingTransactions(a);
      const countPendingB = countPendingTransactions(b);

      // Sort in ascending order based on the count of "pending" transactions
      return countPendingA - countPendingB;
    });

    // Log the sorted subadmins and individual counts
    console.log("Sorted Subadmins:", sortedSubadmins);
    sortedSubadmins.forEach((subadmin) => {
      console.log(
        `${subadmin.fullname}'s Pending Transaction Count:`,
        countPendingTransactions(subadmin)
      );
    });

    const subadminWithLowestPendingCount = sortedSubadmins[0];

    // Extract necessary information
    const subadminWithLowestPendingCountId =
      subadminWithLowestPendingCount?._id;
    const subadminWithLowestPendingCountAddress =
      subadminWithLowestPendingCount?.cashdeskAddress;

    console.log(
      "Subadmin with the lowest count id:",
      subadminWithLowestPendingCountId
    );
    console.log(
      "Subadmin with the lowest count address:",
      subadminWithLowestPendingCountAddress
    );

    const response = NextResponse.json({
      message: "successful",
      success: true,
      subadminWithLowestPendingCountId,
      subadminWithLowestPendingCountAddress,
    });

    // Set Cache-Control header to prevent client-side caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Vary", "Cookie");
    // Return the response or use it as needed
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();
