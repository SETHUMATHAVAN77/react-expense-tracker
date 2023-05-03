import React from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const List = ({ transactions, deleteTransaction, editTransaction }) => {
  const { user } = UserAuth();

  const filteredTransactions = transactions.filter((transaction) => {
    return user && transaction.userId === user.uid;
  });

  return (
    <>
      <div>
        {filteredTransactions.length > 0 ? (
          <ul className="lists">
            {filteredTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className={transaction.amount > 0 ? "plus" : "minus"}
              >
                <span>{transaction.title}</span>{" "}
                <span> {transaction.amount}</span>
                <button
                  className="update-btn btn"
                  type="button"
                  onClick={() => editTransaction(transaction.id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn btn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-yellow-200 p-2 rounded-lg ">
            <small className="font-semibold">
              You don't have any transactions
            </small>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
