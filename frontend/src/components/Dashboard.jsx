import { Appbar } from "./Appbar"
import { Balance } from "./Balance"
import { Users } from "./Users"
import axios from "axios"
import { useEffect, useState } from "react"



export default function Dashboard() {
    const [balance,setBalance]=useState(0);

    useEffect( ()=>{
            
                const fetchBalance = async ()=>{
                try{
                const response =await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                setBalance(response.data.balance);
            }catch(er){
                console.log(er);
            }
        };
        fetchBalance();
    },[])
    return (
    <div className="h-screen">
        <div>
            <Appbar />
        </div>
        <div className=" p-3">
            <Balance value={balance.toFixed(2)} />
            <Users />
        </div>
    </div>
    )
}