import { User } from "@/interface/Iuser";
import React, { useEffect, useState } from "react";

const useUserRecharge = () => {
	const [userRecharge, setUserRecharge] = useState("");

	useEffect(() => {
		const data = localStorage.getItem("userRecharge");
		if (data) {
			setUserRecharge(JSON.parse(data));
		}
	}, []);

	return userRecharge;
};

export default useUserRecharge