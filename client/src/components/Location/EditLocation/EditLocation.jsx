import React, { useState } from "react";
import "./styles.scss";

const EditLocation = ({ stock, locationList, stocks, setStocks }) => {
  const [location, setLocation] = useState(stock.location);

  const updateStock = async e => {
    e.preventDefault();
    try {
      const body = { name };
      await fetch(`http://localhost:5000/stocks/${stock.stock_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      getLocationList();
      // setVisible(false);
      // setName(name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const closeModal = () => {
    // setName(stock.name);
    // setLocation(stock.location);
    // setQuantity(stock.quantity);
    // setExpiration(stock.expiration);
    // setVisible(false);
  };

  return (
    <>
      {/* <button
        type="button"
        className="open-modal"
        onClick={() => setVisible(true)}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`modal${stock.stock_id}`}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none"
        }}
      >
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Stock: "{stock.name}"</h4>
            </div>

            <div className="modal-body">
              <div className="modal-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="location">Location</label>
                <select
                  value={location}
                  onChange={e => {
                    setLocation(e.target.value);
                  }}
                >
                  {locationList.map((location, key) => {
                    return (
                      <option
                        key={key}
                        value={
                          location.charAt(0).toUpperCase() + location.slice(1)
                        }
                      >
                        {location}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="modal-input">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={e => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="expiration">Expiration</label>
                <input
                  type="date"
                  className="form-control"
                  name="expiration"
                  value={expiration}
                  onChange={e => setExpiration(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn" onClick={updateStock}>
                Edit
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </form>
        <div className="modal-background" onClick={closeModal}></div>
      </div> */}
    </>
  );
};

export default EditLocation;