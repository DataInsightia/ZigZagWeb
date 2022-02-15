import React,{useState} from 'react'
import API from '../api'
import axios from 'axios'

export default function CustomerRegister() {

    const [data,setData] = useState({
        name : "",
        mobile : "",
        email : "",
        address : "",
        city : "",
        pincode : "",
        password : ""
    });
    const [register,setRegister] = useState(false);

    const handleEvent = (e) => {
        var newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
        // console.log(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(API + '/api/customer_register/',data).then((res) => {
            if(res.data.status){
                alert(res.data.message);
                setRegister(true);
            }
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type={'text'} placeholder={'Name'} value={data.name} onChange={handleEvent} name={'name'}/>
                <input type={'text'} placeholder={'Mobile'} value={data.mobile} onChange={handleEvent} name={'mobile'} />
                <input type={'email'} placeholder={'Email'} value={data.email} onChange={handleEvent} name={'email'}/>
                <input type={'text'} placeholder={'Address'} value={data.address} onChange={handleEvent} name={'address'}/>
                <input type={'text'} placeholder={'City'} value={data.city} onChange={handleEvent} name={'city'}/>
                <input type={'text'} placeholder={'Pincode'} value={data.pincode} onChange={handleEvent} name={'pincode'}/>
                <input type={'password'} placeholder={'Password'} value={data.password} onChange={handleEvent} name={'password'}/>

                <input type={'submit'} className={'button rounded p-3 m-3 bg-green-400'} value={"Register"}/>
                <input type={'reset'} className={'button rounded p-3 m-3 bg-red-400'} value={"Reset"} />
            </form>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}