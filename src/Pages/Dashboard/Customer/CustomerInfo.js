import React, {useEffect, useState} from 'react';
import axios from "axios";
import API from "../../../api";
import {convertLength} from "@mui/material/styles/cssUtils";

function CustomerInfo() {
    const mobile = "9600410883"
    const [customer,setCustomer] = useState({})
    useEffect(() => {
        axios.post(`${API}/api/customer_details/`,{"cust_id" : mobile}).then(res => {
            setCustomer(res.data[0])
        }).catch(err => console.log(err))
    },[])
    return (
        <div>
            <div className="text-center">
                <div>asdffs</div>
                <div>
                    <input
                    type="submit"
                    value="Explore"
                    className="rounded w-full py-2 px-3 bg-rose-500 text-white font-bold hover:shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerInfo;