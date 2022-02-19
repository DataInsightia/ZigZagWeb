import React,{useState,useEffect} from 'react'
import API from '../api'
import axios from 'axios'

export default function TakeOrderOld() {

    const [data,setData] = useState({
        cust_id : ""
    });

    const [orderWorks,setOrderWorks] = useState([])

    const current_date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

    const [work,setWork] = useState({
        work : '',
        qty : '',
        amount : '',
        total_amount : '',
    });

    const [material,setMaterial] = useState({
        material : '',
        qty : '',
        amount : '',
        total_amount : '',
    });

    const [customer,setCustomer] = useState({});

    const [works,setWorks] = useState([{}]);

    const [materials,setMaterials] = useState([{}]);

    const [isUser,setUser] = useState(false);

    const handleEvent = (e) => {
        var newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
        // console.log(newData);
    }

    const addWorkButton = (e) => {
        e.preventDefault()
        const new_work = [...orderWorks,work]
        setOrderWorks(new_work);
         console.log(new_work)

    }
    const handleWorkEvent = (e) => setWork({...work,[e.target.name] : e.target.value})
    const handleMaterialEvent = (e) => setMaterial({...material,[e.target.name] : e.target.value})

    useEffect(() => {
        axios.get(API + '/api/works/',data).then((res) => {
            setWorks(res.data);
            // console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })

        axios.get(API + '/api/materials/',data).then((res) => {
            setMaterials(res.data);
            // console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })

        const mat_amout = materials.map(e => e.amount)

    } ,[])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(API + '/api/customer_details/',data).then((res) => {
            if(res.status === 200){
                setUser(true);
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
            <form onSubmit={handleSubmit}>
                <input type={'text'} placeholder={'Mobile or Customer ID'} value={data.cust_id} onChange={handleEvent} name={'cust_id'}/>
                <input type={'submit'} className={'button rounded p-3 m-3 bg-green-400'} value={"Check"}/>
            </form>

            <div>
                <div className={'flex'}>
                    <select className={'mx-3'} onChange={handleWorkEvent} name={'work'}>
                        <option selected hidden>Work</option>
                        {
                            works.map(e => <option value={e.amount}>{e.work_name}</option>)
                        }
                    </select>
                    <select className={'mx-3'} onChange={handleWorkEvent} name={'qty'}>
                        <option selected hidden value={'0'}>Qty</option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                    </select>
                    <input type={'text'} name={'amount'} value={work.work} onChange={handleWorkEvent} />
                    <input type={'text'} name={'total_amount'} value={isNaN(parseInt(work.work) * parseInt(work.qty))? '0' : parseInt(work.work) * parseInt(work.qty)} onChange={handleWorkEvent} />
                    <button className={'mx-3 p-2 rounded bg-green-600'} onClick={addWorkButton}>+Work</button>
                </div>


                <div className={'flex'}>
                    <select className={'mx-3'} onChange={handleMaterialEvent} name={'material'}>
                        <option selected hidden>Material</option>
                        {
                            materials.map(e => <option value={e.amount}>{e.material_name}</option>)
                        }
                    </select>
                    <select className={'mx-3'} onChange={handleMaterialEvent} name={'qty'}>
                        <option selected hidden value={'0'}>Qty</option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                    </select>
                    <input type={'text'} name={'amount'} value={material.material} onChange={handleMaterialEvent} />
                    <input type={'text'} name={'total_amount'} value={isNaN(parseInt(material.material) * parseInt(material.qty)) ? '0' : (parseInt(material.material) * parseInt(material.qty))} onChange={handleMaterialEvent} />
                    <button className={'mx-3 p-2 rounded bg-green-600'}>+Material</button>
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

                <h1>Order Summary</h1>
                <table className={"border border-black border-collapse"}>
                    <tr>
                        <th>Work</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Work Total</th>
                    </tr>
                     {
                        orderWorks.map(e => <tr>
                            <td>{e.work}</td>
                            <td>{e.qty}</td>
                            <td>{e.work}</td>
                            <td>{e.work}</td>
                        </tr>)
                    }
                </table>




            </div>
        </div>
    );
}