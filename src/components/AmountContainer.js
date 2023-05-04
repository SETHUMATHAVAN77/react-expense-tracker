import React, { useState, useEffect } from "react";
import { GiTakeMyMoney, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { UserAuth } from "../context/AuthContext";

const AmountContainer = ({ transactions }) => {
  const [balance, setBalance] = useState("0.00");
  const [income, setIncome] = useState("0.00");
  const [expense, setExpense] = useState("0.00");
  const { user } = UserAuth();

  useEffect(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      return user && transaction.userId === user.uid;
    });

    // positive value
    const plusAmount = filteredTransactions
      .map((val) => val.amount)
      .filter((val) => val > 0)
      .reduce((preval, val) => preval + val, 0);
    setIncome(plusAmount);

    // negative value
    const minusAmount = filteredTransactions
      .map((val) => val.amount)
      .filter((val) => val < 0)
      .reduce((preval, val) => preval + val, 0);
    setExpense(minusAmount);

    const totalAmt = filteredTransactions
      .map((val) => val.amount)
      .reduce((preval, val) => preval + val, 0);
    setBalance(totalAmt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);
  return (
    <>
      {/* balance amount */}
      <div className="balance-container">
        <h2 className="balance-title">
          Your Balance <GiTakeMyMoney />
        </h2>
        <h3 className="balance amount-zero" id="balance">
          ₹{balance}
        </h3>
      </div>

      {/* income & expense */}
      <div className="output-container">
        <div className="income-container">
          <h2 className="income">
            INCOME <GiReceiveMoney />{" "}
          </h2>
          <h3 className="income-amt amount-zero" id="income-amt">
            ₹{income}
          </h3>
        </div>
        <div className="expense-container">
          <h2 className="expense">
            EXPENSE <GiPayMoney />{" "}
          </h2>
          <h3 className="expense-amt amount-zero" id="expense-amt">
            ₹{expense}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AmountContainer;
