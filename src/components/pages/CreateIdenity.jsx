import React, {useState} from "react";

import avatar from "../../assests/avatar.svg";

export default function CreateIdenity({identity}) {
    const [userData, setUserData] = useState({
        name: identity.name && "",
        phone_number: identity.phone_number && "",
        email: identity.email && "",
        date_of_birth: identity.date_of_birth && "",
        country_of_birth: identity.country_of_birth && "",
        city_of_birth: identity.city_of_birth && "",
        postal_address: identity.postal_address && "",
        company: identity.company && "",
    });
    const onChangeHandler = (e) => {
        let values = e.target.value;
        let name = e.target.name;
        setUserData({...userData, [name]: values});
    };
    return (
        <div className="create">
            <div className="create-head">
                <span className="create-head-title">Create Idenity</span>
            </div>
            <div className="create-body">
                <div className="create-body-avatar">
                    <input type="file" id="avatar"/>
                    <label htmlFor="avatar">
                        <img src={avatar}/>
                        <span>Add Photo</span>
                    </label>
                </div>
                <div className="create-body-form">
                    <div className="create-body-form-input">
                        <div className="create-body-form-input-in">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                value={userData.name}
                                name="name"
                                onChange={onChangeHandler}
                                placeholder="Full Name"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="name">Company</label>
                            <input
                                id="company"
                                value={userData.company}
                                name="company"
                                onChange={onChangeHandler}
                                placeholder="Company"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input
                                id="phonenumber"
                                value={userData.phone_number}
                                name="phone_number"
                                onChange={onChangeHandler}
                                placeholder="Phone Number"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="emailaddress">Email Address</label>
                            <input
                                id="emailaddress"
                                value={userData.email}
                                name="email"
                                onChange={onChangeHandler}
                                placeholder="Email Address"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="dob">Date Of Birth</label>
                            <input
                                id="dob"
                                value={userData.date_of_birth}
                                name="date_of_birth"
                                onChange={onChangeHandler}
                                placeholder=""
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="create-body-form-input">
                        <div className="create-body-form-input-in">
                            <label htmlFor="countryofbirth">Country Of Birth</label>
                            <input
                                id="countryofbirth"
                                value={userData.country_of_birth}
                                name="country_of_birth"
                                onChange={onChangeHandler}
                                placeholder="Country Of Birth"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="cityofbirth">City Of Birth</label>
                            <input
                                id="cityofbirth"
                                value={userData.city_of_birth}
                                name="city_of_birth"
                                onChange={onChangeHandler}
                                placeholder="City Of Birth"
                                type="text"
                            />
                        </div>
                        <div className="create-body-form-input-in">
                            <label htmlFor="postal">Postal Address</label>
                            <input
                                id="postal"
                                value={userData.postal_address}
                                name="postal_address"
                                onChange={onChangeHandler}
                                placeholder="Postal Address"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <input className="create-body-btn" type="submit" value="SIGN"/>
            </div>
        </div>
    );
}
