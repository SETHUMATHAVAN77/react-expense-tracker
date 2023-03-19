import React from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const List = ({ transactions, deleteTransaction, editTransaction }) => {
  return (
    <>
      {transactions.map((transaction) => {
        const { id, title, amount } = transaction;

        return (
          <ul className="lists" key={id}>
            <li className={amount > 0 ? "plus" : "minus"}>
              <span>{title}</span> <span> {amount}</span>
              <button
                className="update-btn btn"
                type="button"
                onClick={() => editTransaction(id)}
              >
                <AiFillEdit />
              </button>
              <button
                type="button"
                className="delete-btn btn"
                onClick={() => deleteTransaction(id)}
              >
                <MdDelete />
              </button>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default List;
