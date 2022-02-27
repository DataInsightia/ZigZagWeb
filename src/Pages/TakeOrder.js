import React,{useState,useEffect} from 'react';
import axios from "axios";
import API from "../api";
import QRCode from "react-qr-code";

function TakeOrder() {


    const [orderid,setOrderid] = useState('');
    const [cust,setCust] = useState(false);
    const [works,setWorks] = useState([{}]);
    const [materials,setMaterials] = useState([{}]);
    const [tmpworks,setTmpworks] = useState([])
    const [tmpmaterials,setTmpmaterials] = useState([])
    let [total,setTotal] = useState(0);
    let [balance,setBalance] = useState(0);
    const [advance,setAdvance] = useState(0);
    const [customer,setCustomer] = useState({
        cust_id : ""
    });

    const [customer_details,SetCustomerDetails] = useState({});

    const [others,setOthers] = useState({
        pickup_type : '',
        due_date : '',
        courier_amount : '0',
        advance_amount : '0',
        balance_amount : '0',
    });

    const [material,setMaterial] = useState({
        'material_id' : '',
        'qty' : '',
        'amount' : ''
    })

    const [work,setWork] = useState({
        'work_id' : '',
        'qty' : '',
        'amount' : ''
    })

       const fetch = async  () => {
        var materials = await axios.post(API + '/api/tmp_materials/',{'order_id' : orderid});
        var works = await axios.post(API + '/api/tmp_works/',{'order_id' : orderid});
        var total = ((works.data.status === undefined) ? works.data.total.total__sum : 0)   + ((materials.data.status === undefined) ? materials.data.total.total__sum : 0);
        setTotal(total);
        setBalance(total);
    }

    useEffect(() => {

        fetch_works()
        fetch_materials();
        axios.get(API + '/api/generate_orderid/')
            .then((res) => {
                setOrderid(res.data['order_id']);

                fetch_work_table();
                fetch_material_table();
                fetch();
                // console.log(res.data['order_id']);
            }).catch((err) => {
                console.log(err);
            });
    },[orderid]);

    const current_date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today
    }

    const yyyymmdd =(dateIn) => {
        var parts = dateIn.split('-')
        return (parts[0]+"-"+parts[1]+"-"+parts[2])
    }


    const update_advance_amount = () => setAdvance(parseInt(others.advance_amount));
    const fetch_work_table = () =>  axios.post(API + '/api/tmp_works/',{'order_id' : orderid}).then((res) => {
            if ('status' in res.data){
                console.log(res.data);
                setTmpworks([])
            } else {
                setTmpworks(res.data['data'])
            }
        }).catch((err) => {
            console.log(err);
        });

    const fetch_material_table = () => axios.post(API + '/api/tmp_materials/',{'order_id' : orderid}).then((res) => {
            if ('status' in res.data){
                console.log(res.data);
                setTmpmaterials([]);
            } else {
                setTmpmaterials(res.data['data']);
            }
        }).catch((err) => {
            console.log(err);
        });



    const fetch_materials = async  () => {
        var materials = await axios.get(API + '/api/materials/');
        setMaterials(materials.data)
    }

    const fetch_works = async  () => {
        var works = await axios.get(API + '/api/works/');
        setWorks(works.data)
    }

    const handleWorkEvent = (e) => setWork({...work,[e.target.name] : e.target.value});
    const handleMaterialEvent = (e) => setMaterial({...material,[e.target.name] : e.target.value});
    const handleCustomer = (e) => setCustomer({...customer,[e.target.name] : e.target.value});
    const handleOther = (e) => setOthers({...others,[e.target.name] : e.target.value})


    const getWorkAmount = (wn) => setWork({...work,['amount'] : works.find(e => e.work_id === wn)['amount']})
    const getMaterialAmount = (mn) => setMaterial({...material,['amount'] : materials.find(e => e.material_id === mn)['amount']})

    const addWork = (e) => {
        e.preventDefault()
        work['cust_id'] = 'ZC83498';
        work['order_id'] = orderid;
        work['total'] = parseInt(work['qty']) * parseInt(work['amount']);
        console.log(work)
        // Insert to tmp_work
        axios.post(API + '/api/tmp_work/',work).then((res) => {
            console.log(res.data);
            fetch_work_table();
            fetch();
        }).catch((err) => console.log(err));
        fetch_work_table();
        fetch()
    }

    const addMaterial = (e) => {
        e.preventDefault()
        material['cust_id'] = 'ZC83498';
        material['order_id'] = orderid;
        material['total'] = parseInt(material['qty']) * parseInt(material['amount']);
        // Insert to tmp_material
        axios.post(API + '/api/tmp_material/',material).then((res) => {
            fetch_material_table();
            fetch()
        }).catch((err) => console.log(err));
        fetch_material_table();
        fetch()
    }

    const delTmpWork = (id) => {
        axios.post(API + '/api/del_tmpwork/',{'id' : id}).then((res) => {
            console.log(res.data);
             fetch_work_table();
             fetch()
        }).catch((err) => {
            console.log(err);
        });
        fetch_work_table()
        fetch()
    }

    const delTmpMaterial = (id) => {
        axios.post(API + '/api/del_tmpmaterial/',{'id' : id}).then((res) => {
            console.log(res.data);
            fetch_material_table();
            fetch()
        }).catch((err) => {
            console.log(err);
        });
        fetch_material_table();
        fetch()
    }
    const findCustomer = (e) => {
        e.preventDefault()
        axios.post(API + '/api/customer_details/',customer).then((res) => {
            if(res.status === 200){
                SetCustomerDetails(res.data[0]);
                setCust(true);
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const update_balance = (e) => {
        var adv = parseInt(e.target.value);
        setAdvance(adv);
         setBalance(total - adv);
    };

    const printOrder = (e) => {
        e.preventDefault();
        if (others.due_date !== "")
        { 
            const order_payload = {...{'order_id' : orderid, 'cust_id' : customer_details['cust_id'],'due_date' : yyyymmdd(others.due_date),'pickup_type' : others.pickup_type,'total_amount' : total,'advance_amount' : advance, 'balance_amount' : balance}}

            axios.post(API + '/api/add_order/',order_payload).then(res => {
                console.log('add_order',res.data);
                for(var i=0;i<tmpworks.length;i++) {
                    const tmpwork_payload = {...{'order_id' : orderid,'work_id' : tmpworks[i].work_id,'qty' : tmpworks[i].quantity,'work_amount' : tmpworks[i].amount}};
                    axios.post(API + '/api/add_order_work/',tmpwork_payload)
                        .then(res => console.log('tmpworks',res.data))
                        .catch(err => console.log(err))
                    console.log(tmpwork_payload)
                }

                for(var j=0;j<tmpmaterials.length;j++) {
                    const tmpmaterial_payload = {...{'order_id' : orderid,'material_id' : tmpmaterials[j].material_id,'qty' : tmpmaterials[j].quantity,'material_amount' : tmpmaterials[j].amount}};
                    axios.post(API +'/api/add_order_material/',tmpmaterial_payload)
                        .then(res => console.log('tmpmaterials',res.data))
                        .catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
        }else{
            alert("DueDate Required!")
        }
        
        console.log("cust_id",customer_details['cust_id'])
        console.log(typeof(others.due_date))

    }

    return (
        <div>
            <div>
                Order No : {orderid}
            </div>
            <div>
                <QRCode value={orderid} />
            </div>
            <div>
                <input type={'text'} placeholder={'Mobile or Customer ID'} value={customer.cust_id} onChange={handleCustomer} name={'cust_id'}/>
                <input type={'submit'} className={'button rounded p-3 m-3 bg-green-400'} value={"Check"} onClick={findCustomer}/>
            </div>

            { cust ? (
                <div>
                    <div>
                        <select name={'work_id'} onChange={handleWorkEvent} required>
                            <option selected hidden>Work</option>
                            {
                                works.map(e => <option value={e.work_id}>{e.work_name}</option> )
                            }
                        </select>
                        <input type={'text'} name={'qty'} placeholder={'Qty'} onChange={handleWorkEvent} onBlur={() => getWorkAmount(work.work_id)} required/>
                        <input type={'text'} name={'amount'} placeholder={'Amount'} onChange={handleWorkEvent} value={work.amount} required/>
                        <input type={'submit'} value={'add work'} className={'button bg-pink-700 text-white p-2 rounded-2xl'} onClick={addWork}/>
                    </div>

                    <div>
                        <select name={'material_id'} onChange={handleMaterialEvent} required>
                            <option selected hidden>Material</option>
                            {
                                materials.map(e => <option value={e.material_id}>{e.material_name}</option> )
                            }
                        </select>
                        <input type={'text'} name={'qty'} placeholder={'Qty'} onChange={handleMaterialEvent} onBlur={() => getMaterialAmount(material.material_id)} required/>
                        <input type={'text'} name={'amount'} placeholder={'Amount'} onChange={handleMaterialEvent} value={material.amount} required/>
                        <input type={'submit'} value={'add material'} className={'button bg-pink-700 text-white p-2 rounded-2xl'} onClick={addMaterial}/>
                    </div>

                    <div>
                        <p>Booking Date : {current_date()}</p>
                        <snap><p>Due Date</p> <input type={'date'} name={'due_date'} onChange={handleOther}/></snap>
                        <snap><p>Pickup Type : </p>
                            <select name={'pickup_type'} onChange={handleOther}>
                                <option selected hidden>Choose Type</option>
                                <option value={'self'}>SELF</option>
                                <option value={'courier'}>COURIER</option>
                                <option value={'other'}>OTHER</option>
                            </select>
                        </snap>
                        {
                            others.pickup_type === 'courier' ? (<snap>
                            <input type={'text'} name={'courier_amount'} placeholder={'Courier Charge'} onChange={handleOther} onBlur={() => {update_advance_amount();fetch();}}/>
                        </snap>) : ''
                        }
                        <input type={'text'} value={others.advance_amount} name={'advance_amount'} onChange={(e) => {handleOther(e);update_balance(e);}} placeholder={'Advance Amount'}/>
                    </div>

                    <div className={'justify-center'} >
                        <table className={'border-collapse text-center'}>
                        <tr>
                            <th className={'border border-slate-600 p-3'}>Work Name</th>
                            <th className={'border border-slate-600 p-3'}>Quantity</th>
                            <th className={'border border-slate-600 p-3'}>Amount</th>
                            <th className={'border border-slate-600 p-3'}>Total</th>
                            <th className={'border border-slate-600 p-3'}>Options</th>
                        </tr>
                        {
                            tmpworks !== [] ? tmpworks.map(e => <tr>
                                <td className={'border border-slate-600'}>{e.work_name}</td>
                                <td className={'border border-slate-600'}>{e.quantity}</td>
                                <td className={'border border-slate-600'}>{e.amount}</td>
                                <th className={'border border-slate-600'}>{e.total}</th>
                                <td className={'border border-slate-600'}><button className={'m-2 bg-green-800 rounded p-2 text-white'}>edit</button><button className={'m-2 bg-red-800 rounded p-2 text-white'} onClick={() => {delTmpWork(e.id)}}>delete</button></td>
                            </tr>
                            ) : ''
                        }

                        {
                            tmpmaterials !== [] ? tmpmaterials.map(e => <tr>
                                    <td className={'border border-slate-600'}>{e.material_name}</td>
                                    <td className={'border border-slate-600'}>{e.quantity}</td>
                                    <td className={'border border-slate-600'}>{e.amount}</td>
                                    <th className={'border border-slate-600'}>{e.total}</th>
                                    <td className={'border border-slate-600'}><button className={'m-2 bg-green-800 rounded p-2 text-white'}>edit</button><button className={'m-2 bg-red-800 rounded p-2 text-white'} onClick={()=> delTmpMaterial(e.id)}>delete</button></td>
                                </tr>
                            ): ''
                        }

                        <tr>
                            <td className={'border border-slate-600 p-3'} colSpan={'3'}>Total</td>
                            <td className={'border border-slate-600 p-3'}><b>{total}</b></td>
                        </tr>

                        <tr>
                            <td className={'border border-slate-600 p-3'} colSpan={'3'}>Advance Amount</td>
                            <td className={'border border-slate-600 p-3'} ><b>{advance}</b></td>
                        </tr>

                        <tr>
                            <td className={'border border-slate-600 p-3'} colSpan={'3'}>Balance Amount</td>
                            <td className={'border border-slate-600 p-3'} ><b>{balance}</b></td>
                        </tr>


                    </table>
                    </div>

                    <div className={'flex'} >
                        <button className={'text-white text-lg rounded bg-amber-600 m-3 p-2'}>Add Voice Instruction</button>
                        <button className={'text-white text-lg rounded bg-amber-600 m-3 p-2'}>Add Material Image</button>
                        <button className={'text-white text-lg rounded bg-amber-600 m-3 p-2'} onClick={printOrder}>Print Order</button>
                        <button className={'text-white text-lg rounded bg-amber-600 m-3 p-2'}>Add Instruction Image</button>
                    </div>
                </div>
                ) : '' }
        </div>
    );
}

export default TakeOrder;