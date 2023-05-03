import React, { useState, useEffect } from "react";
import List from "./List";
import AmountContainer from "./AmountContainer";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase";
import { UserAuth } from "../context/AuthContext";

const FormControl = ({ showAlert }) => {
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setisEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [selectedOption, setSelectedOption] = useState("positive");
  const { user } = UserAuth();

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("created", "desc"));

    onSnapshot(q, (querySnapShot) => {
      setTransactions(
        querySnapShot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          return {
            id: doc.id,
            ...data,
          };
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.uid, transactions]);

  // radio button
  function radioButton(amount) {
    if (selectedOption === "positive") {
      if (amount < 0) {
        return (amount = amount * -1);
      } else {
        return (amount = amount * 1);
      }
    }

    if (selectedOption === "negative") {
      if (amount < 0) {
        return (amount = amount * 1);
      } else {
        return (amount = amount * -1);
      }
    }
  }

  // delete transaction
  const deleteTransaction = async (id) => {
    try {
      const itemToEditRef = await doc(db, "transactions", id);
      await deleteDoc(itemToEditRef);
    } catch (err) {
      console.log(err);
    }
    showAlert({
      msg: "Transaction Deleted Successfully !",
      type: "transaction",
    });
  };

  // edit transaction
  const editTransaction = (id) => {
    const itemToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setisEditing(true);
    setEditId(id);
    setTransactionName(itemToEdit.title);
    setAmount(itemToEdit.amount);
  };

  // radio button
  const handleRadio = (e) => {
    setSelectedOption(e.target.value);
    radioButton();
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionName || !amount) {
      showAlert({
        msg: "Please Enter A Transaction !",
        type: "transaction",
      });
    } else if (transactionName && amount && isEditing) {
      try {
        const itemToEditRef = await doc(db, "transactions", editId);
        await updateDoc(itemToEditRef, {
          title: transactionName,
          amount: radioButton(amount),
        });
      } catch (err) {
        console.log(err);
      }
      showAlert({
        msg: "Transaction Updated Successfully !",
        type: "transaction",
      });
      setTransactionName("");
      setAmount("");
      setisEditing(false);
      setEditId("");
    } else {
      try {
        await addDoc(collection(db, "transactions"), {
          title: transactionName,
          amount: radioButton(amount),
          created: Timestamp.now(),
          userId: user?.uid,
        });
        setTransactionName("");
        setAmount("");
        showAlert({
          msg: "Transaction Added Successfully !",
          type: "transaction",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="main">
        <AmountContainer transactions={transactions} />
        {transactions.length > 0 && (
          <div className="history-container">
            <div className="history-title">
              <h2>History</h2>
            </div>
            <List
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          </div>
        )}

        <h2 className="input-title">Add New Transaction</h2>

        <form className="input-container" onSubmit={handleSubmit}>
          {/* <!-- radio --> */}

          <div className="radio-container">
            <div className="income-radio">
              <input
                className="capitalize"
                type="radio"
                id="income-radio"
                name="radio"
                value="positive"
                checked={selectedOption === "positive"}
                onChange={handleRadio}
              />
              <label htmlFor="income-radio" className="income-radio">
                Income
              </label>
            </div>
            <div className="expense-radio">
              <input
                type="radio"
                id="expense-radio"
                name="radio"
                value="negative"
                checked={selectedOption === "negative"}
                onChange={handleRadio}
              />
              <label htmlFor="expense-radio" className="expense-radio">
                Expense
              </label>
            </div>
          </div>

          <label htmlFor="transaction">Transaction</label>
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            id="transaction"
            placeholder="Enter Transaction..."
            name="rents"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="amount-input">Amount</label>
          <input
            type="number"
            id="amount-input"
            placeholder="Enter Amount (₹)"
            autoComplete="off"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            name="amount"
            required
          />
          <button className="button" type="submit">
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormControl;
