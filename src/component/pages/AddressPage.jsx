// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ApiService from "../../service/ApiService";
// import '../../style/addressPage.css';
//
// const AddressPage = () => {
//     const [address, setAddress] = useState({
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: ''
//     });
//
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     useEffect(() => {
//         if (location.pathname === '/edit-address') {
//             fetchUserInfo();
//         }
//     }, [location.pathname]);
//
//     const fetchUserInfo = async () => {
//         try {
//             const response = await ApiService.getLoggedInUserInfo();
//             if (response.user.address) {
//                 setAddress(response.user.address);
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || error.message || "Unable to fetch user information");
//         }
//     };
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress((prevAddress) => ({
//             ...prevAddress,
//             [name]: value
//         }));
//     };
//
//     const handSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await ApiService.saveAddress(address);
//             navigate("/profile");
//         } catch (error) {
//             setError(error.response?.data?.message || error.message || "Failed to save/update address");
//         }
//     };
//
//     return (
//         <div className="address-page">
//             <h2>{location.pathname === '/edit-address' ? 'Edit Address' : "Add Address"}</h2>
//             {error && <p className="error-message">{error}</p>}
//
//             <form onSubmit={handSubmit}>
//                 <label>
//                     Street:
//                     <input
//                         type="text"
//                         name="street"
//                         value={address.street}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     City:
//                     <input
//                         type="text"
//                         name="city"
//                         value={address.city}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     State:
//                     <input
//                         type="text"
//                         name="state"
//                         value={address.state}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//
//                 <label>
//                     Zip Code:
//                     <input
//                         type="text"
//                         name="zipCode"
//                         value={address.zipCode}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//
//                 <label>
//                     Country:
//                     <input
//                         type="text"
//                         name="country"
//                         value={address.country}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <button type="submit">
//                     {location.pathname === '/edit-address' ? 'Edit Address' : "Save Address"}
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default AddressPage;





//////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ApiService from "../../service/ApiService";
// import '../../style/addressPage.css';
// import MapComponent from "../future features/MapComponent";
//
// const AddressPage = () => {
//     const [address, setAddress] = useState({
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: ''
//     });
//
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     useEffect(() => {
//         if (location.pathname === '/edit-address') {
//             fetchUserInfo();
//         }
//     }, [location.pathname]);
//
//     const fetchUserInfo = async () => {
//         try {
//             const response = await ApiService.getLoggedInUserInfo();
//             if (response.user.address) {
//                 setAddress(response.user.address);
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || error.message || "Unable to fetch user information");
//         }
//     };
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress((prevAddress) => ({
//             ...prevAddress,
//             [name]: value
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await ApiService.saveAddress(address);
//             navigate("/cart", { state: { addressSaved: true } }); // Pass a flag to indicate that the address is saved
//         } catch (error) {
//             setError(error.response?.data?.message || error.message || "Failed to save/update address");
//         }
//     };
//
//     return (
//         <div className="address-page">
//             <h2>{location.pathname === '/edit-address' ? 'Edit Address' : "Add Address"}</h2>
//             {error && <p className="error-message">{error}</p>}
//
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Street:
//                     <input type="text"
//                            name="street"
//                            value={address.street}
//                            onChange={handleChange}
//                            required />
//                 </label>
//                 <label>
//                     City:
//                     <input type="text"
//                            name="city"
//                            value={address.city}
//                            onChange={handleChange}
//                            required />
//                 </label>
//                 <label>
//                     State:
//                     <input type="text"
//                            name="state"
//                            value={address.state}
//                            onChange={handleChange}
//                            required />
//                 </label>
//                 <label>
//                     Zip Code:
//                     <input type="text"
//                            name="zipCode"
//                            value={address.zipCode}
//                            onChange={handleChange}
//                            required />
//                 </label>
//                 <label>
//                     Country:
//                     <input type="text"
//                            name="country"
//                            value={address.country}
//                            onChange={handleChange}
//                            required />
//                 </label>
//                 <button type="submit">{location.pathname === '/edit-address' ? 'Edit Address' : "Save Address"}</button>
//             </form>
//
//             <MapComponent />
//         </div>
//     );
// };
//
// export default AddressPage;
//
//



//Map Integration Latest

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import MapComponent from "../future features/MapComponent";
import '../../style/addressPage.css';

const AddressPage = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }
    }, [location.pathname]);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            if (response.user.address) {
                setAddress(response.user.address);
                fetchCoordinates(response.user.address);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user information");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.saveAddress(address);
            fetchCoordinates(address);
            navigate("/cart", { state: { addressSaved: true } });
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to save/update address");
        }
    };

    const fetchCoordinates = async (address) => {
        const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`;
        const apiKey = "8f741c7ce35544609646455395ac00a9"; // OpenCage API Key

        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`);
            const data = await response.json();
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;
                setCoordinates({ lat, lng });
            } else {
                setError("Unable to find coordinates for this address.");
            }
        } catch (err) {
            setError("Failed to fetch coordinates.");
        }
    };

    return (
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : "Add Address"}</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Street:
                    <input type="text" name="street" value={address.street} onChange={handleChange} required />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={address.city} onChange={handleChange} required />
                </label>
                <label>
                    State:
                    <input type="text" name="state" value={address.state} onChange={handleChange} required />
                </label>
                <label>
                    Zip Code:
                    <input type="text" name="zipCode" value={address.zipCode} onChange={handleChange} required />
                </label>
                <label>
                    Country:
                    <input type="text" name="country" value={address.country} onChange={handleChange} required />
                </label>
                <button type="submit">{location.pathname === '/edit-address' ? 'Edit Address' : "Save Address"}</button>
            </form>


            {coordinates && <MapComponent coordinates={coordinates} />}
        </div>
    );
};

export default AddressPage;
