import React, {createContext, useEffect, useState} from "react";

const MainContext = createContext();

function MainProvider({ children }) {
  const [current, setCurrent] = useState("");
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState({
    show: false,
    content: "",
  });
  const [popUp2, setPopUp2] = useState({
    show: false,
    content: "",
  });
  const [amount, setAmount] = useState({ bill: 0, iou: 0, endors: 0 });
  const [currency, setCurrency] = useState("sat");
  const [bills_list, setBillsList] = useState([]);
  const [toast, setToast] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setToast("");
    }, 5000);
  }, [toast]);
  const handlePage = (page) => {
    setCurrent(page);
  };
  const showPopUp = (show, content) => {
    setPopUp({
      show: show,
      content: content,
    });
  };
  const showPopUpSecondary = (show, content) => {
    setPopUp2({
      show: show,
      content: content,
    });
  };
  const [peer_id, setPeerId] = useState({
    id: String,
  });

  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const [contacts, setContacts] = useState([]);
  // Set contacts
  useEffect(() => {
    fetch("http://localhost:8000/contacts/return", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    const form_data = new FormData();
    form_data.append("name", id);
    await fetch("http://localhost:8000/contacts/remove", {
      method: "POST",
      body: form_data,
      mode: "cors",
    })
      .then((response) => {
        // if (response.redirected) {
        let filtered = contacts?.filter((d) => d.name != id);
        setContacts(filtered);
        setToast("Contact Deleted");
        // } else {
        //   setToast("Oops! there is an error please try again later");
        // }
      })
      .catch((err) => console.log(err));
  };

  const handleEditContact = async (old_contact_id, newContact, hidePop) => {
    const form_data = new FormData();
    form_data.append("old_name", old_contact_id);
    form_data.append("name", newContact.name);
    form_data.append("node_id", newContact.node_id);
    await fetch("http://localhost:8000/contacts/edit", {
      method: "POST",
      body: form_data,
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        hidePop(false, "");
        setToast("Contact Changed");
      })
      .catch((err) => console.log(err));
  };

  const handleAddContact = async (newContact) => {
    const form_data = new FormData();
    form_data.append("name", newContact.name);
    form_data.append("node_id", newContact.peer_id);
    await fetch("http://localhost:8000/contacts/new", {
      method: "POST",
      body: form_data,
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 200) {
          setContacts((prev) => [
            ...prev,
            { name: newContact.name, peer_id: newContact.peer_id },
          ]);
          showPopUp(false, "");
          setToast("Your Contact is Added");
        } else {
          setToast("Oops there is an Error adding your contact");
        }
      })
      .catch((err) => console.log(err));
  };
  const [identity, setIdentity] = useState({
    name: "",
    date_of_birth: "",
    city_of_birth: "",
    country_of_birth: "",
    company: "",
    email: "",
    postal_address: "",
    public_key_pem: "",
    private_key_pem: "",
    bitcoin_public_key: "",
    bitcoin_private_key: "",
  });

  // Set identity
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/identity/return", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.name !== "" && response.email !== "") {
          setIdentity(response);
          handlePage("home");
          setLoading(false);
        } else {
          handlePage("identity");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        handlePage("identity");
        setLoading(false);
      });
  }, [refresh]);
  // Set bills
  useEffect(() => {
    fetch("http://localhost:8000/bills/return", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        let newData = data.sort(
          (a, b) => new Date(b.date_of_issue) - new Date(a.date_of_issue)
        );
        setBillsList(newData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refresh]);
  // Set peer id
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/identity/peer_id/return", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPeerId(data.id);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);

  const amountCalculation = (items) => {
    if (peer_id == items.drawee.peer_id) {
      //   name = `${items?.drawee?.name} has to pay ${items?.payee?.name}`;
      setAmount((prev) => ({
        ...prev,
        iou: prev.iou + items.amount_numbers,
      }));
    } else if (peer_id == items.payee.peer_id) {
      //   name = `${items.drawee.name} ${items.payee.name}`;
      setAmount((prev) => ({
        ...prev,
        bill: prev.bill + items.amount_numbers,
      }));
    } else if (peer_id == items.endorsee.peer_id) {
      //   name = `${items.drawee.name} ${items.payee.name}`;
      setAmount((prev) => ({
        ...prev,
        bill: prev.bill + items.amount_numbers,
      }));
    } else {
      //   name = `${items.drawee.name} ${items.payee.name}`;
      setAmount((prev) => ({
        ...prev,
        endors: prev.endors + items.amount_numbers,
      }));
    }
    setCurrency(items.currency_code);
  };
  useEffect(() => {
    if (peer_id && bills_list.length > 0) {
      bills_list.forEach((element) => {
        amountCalculation(element);
      });
    }
    return () => {};
  }, [peer_id, bills_list]);
  function copytoClip(copytext, text) {
    navigator.clipboard.writeText(copytext);
    setToast(text);
  }

  return (
    <MainContext.Provider
      value={{
        identity,
        loading,
        amount,
        toast,
        copytoClip,
        setToast,
        handleDelete,
        handleAddContact,
        handleEditContact,
        bills_list,
        refresh,
        contacts,
        handleRefresh,
        currency,
        peer_id,
        current,
        popUp,
        popUp2,
        showPopUp,
        showPopUpSecondary,
        handlePage,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };
