import React,{useState,useEffect} from 'react';
import axios from "axios";
import API from "../api";

function TakeOrder(props) {


    const [orderid,setOrderid] = useState('')
    const [works,setWorks] = useState([{}]);
    const [materials,setMaterials] = useState([{}]);
    const [tmpworks,setTmpworks] = useState([])
    const [tmpmaterials,setTmpmaterials] = useState([])

    const [customer,setCustomer] = useState({
        cust_id : ""
    });

    const [material,setMaterial] = useState({
        'material' : '',
        'qty' : '',
        'amount' : ''
    })

    const [work,setWork] = useState({
        'work' : '',
        'qty' : '',
        'amount' : ''
    })

    useEffect(() => {
        fetch_works()
        fetch_materials();

        axios.get(API + '/api/generate_orderid/')
            .then((res) => {
                setOrderid(res.data['order_id'])
                fetch_work_table();
                fetch_material_table();
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

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }


    const fetch_work_table = () =>  axios.post(API + '/api/tmp_works/',{'order_id' : orderid}).then((res) => {
            if ('status' in res.data){
                console.log(res.data);
                setTmpworks([])
            } else {
                setTmpworks(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });

    const fetch_material_table = () => axios.post(API + '/api/tmp_materials/',{'order_id' : orderid}).then((res) => {
            if ('status' in res.data){
                console.log(res.data);
                setTmpmaterials([])
            } else {
                setTmpmaterials(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });

    const fetch_materials = () => axios.get(API + '/api/materials/').then((res) => {
                setMaterials(res.data);
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })

    const fetch_works = () => axios.get(API + '/api/works/').then((res) => {
                setWorks(res.data);
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });

    const handleWorkEvent = (e) => setWork({...work,[e.target.name] : e.target.value});
    const handleMaterialEvent = (e) => setMaterial({...material,[e.target.name] : e.target.value});
    const handleCustomer = (e) => setCustomer({...customer,[e.target.name] : e.target.value});

    const getWorkAmount = (wn) => setWork({...work,['amount'] : works.find(e => e.work_id === wn)['amount']})
    const getMaterialAmount = (mn) => setMaterial({...material,['amount'] : materials.find(e => e.material_id === mn)['amount']})

    const addWork = (e) => {
        e.preventDefault()
        work['cust_id'] = 'ZC56733';
        work['order_id'] = orderid;
        work['total'] = parseInt(work['qty']) * parseInt(work['amount']);
        console.log(work)
        // Insert to tmp_work
        axios.post(API + '/api/tmp_work/',work).then((res) => {
            console.log(res.data);
            fetch_work_table();
        }).catch((err) => console.log(err));
    }
    const addMaterial = (e) => {
        e.preventDefault()
        material['cust_id'] = 'ZC56733';
        material['order_id'] = orderid;
        material['total'] = parseInt(material['qty']) * parseInt(material['amount']);
        // Insert to tmp_material
        axios.post(API + '/api/tmp_material/',material).then((res) => {
            console.log(res.data,'material_inserted');
            fetch_material_table();
        }).catch((err) => console.log(err));
    }

    const delTmpWork = (id) => {
        axios.post(API + '/api/del_tmpwork/',{'id' : id}).then((res) => {
            console.log(res.data);
            fetch_work_table();
        }).catch((err) => {
            console.log(err);
        });

    }

    const delTmpMaterial = (id) => {
        axios.post(API + '/api/del_tmpmaterial/',{'id' : id}).then((res) => {
            console.log(res.data);
            fetch_material_table();
        }).catch((err) => {
            console.log(err);
        });

    }
    const findCustomer = (e) => {
        e.preventDefault()
        axios.post(API + '/api/customer_details/',customer).then((res) => {
            if(res.status === 200){
                setCustomer(res.data[0])
                alert('Success')
            }
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div>
            <div>
                Order No : {orderid}
            </div>
            <div>
                <input type={'text'} placeholder={'Mobile or Customer ID'} value={customer.cust_id} onChange={handleCustomer} name={'cust_id'}/>
                <input type={'submit'} className={'button rounded p-3 m-3 bg-green-400'} value={"Check"} onClick={findCustomer}/>
            </div>
            <div>
                <select name={'work'} onChange={handleWorkEvent} required>
                    <option selected hidden>Work</option>
                    {
                        works.map(e => <option value={e.work_id}>{e.work_name}</option> )
                    }
                </select>
                <input type={'text'} name={'qty'} placeholder={'Qty'} onChange={handleWorkEvent} onBlur={() => getWorkAmount(work.work)} required/>
                <input type={'text'} name={'amount'} placeholder={'Amount'} onChange={handleWorkEvent} value={work.amount} required/>
                <input type={'submit'} value={'add work'} className={'button bg-pink-700 text-white p-2 rounded-2xl'} onClick={addWork}/>
            </div>

            <div>
                <select name={'material'} onChange={handleMaterialEvent} required>
                    <option selected hidden>Material</option>
                    {
                        materials.map(e => <option value={e.material_id}>{e.material_name}</option> )
                    }
                </select>
                <input type={'text'} name={'qty'} placeholder={'Qty'} onChange={handleMaterialEvent} onBlur={() => getMaterialAmount(material.material)} required/>
                <input type={'text'} name={'amount'} placeholder={'Amount'} onChange={handleMaterialEvent} value={material.amount} required/>
                <input type={'submit'} value={'add material'} className={'button bg-pink-700 text-white p-2 rounded-2xl'} onClick={addMaterial}/>
            </div>

            <div>
                <p>Booking Date : {current_date()}</p>
                <snap><p>Due Date</p> <input type={'date'} name={''}/></snap>
                <snap><p>Pickup Type : </p>
                    <select>
                        <option selected hidden>Choose Type</option>
                        <option value={'self'}>SELF</option>
                        <option value={'courier'}>COURIER</option>
                        <option value={'other'}>OTHER</option>
                    </select>
                </snap>
                <snap>
                    <input type={'text'} name={'courier_amount'}/>
                </snap>
            </div>

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
                    ) : ''
                }


            </table>
        </div>
    );
}

export default TakeOrder;