import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/bulk?filter=${search}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setUsers(response.data.user || []);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setUsers([]);
            }
        };
        fetchUsers();
    }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleMoneyTransfer = (user) => {
        navigate(`/sendmoney?user_id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`);
    };

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={handleSearch} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => (
                    <User 
                        key={user._id} 
                        user={user} 
                        onSendMoney={() => handleMoneyTransfer(user)}
                    />
                ))}
            </div>
        </>
    );
};

// User component
const User = ({ user, onSendMoney }) => {
    const [balance, setBalance] = useState(null);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/account/balance?userId=${user._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
            setBalance(null);
        }
    };

    return (
        <div className="flex justify-between">
            <div className="flex w-1/3">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap h-full">
                {/* <span className=""></span> */}
                <Button onClick={fetchBalance}> {balance && balance!=0?`Balance: ${balance.toFixed(2)}`:"Get Balance"}</Button>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button onClick={onSendMoney}>
                    Send Money
                </Button>
            </div>
        </div>
    );
};
