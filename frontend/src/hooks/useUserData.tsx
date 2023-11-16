import { User } from "@/interface/Iuser";
import React, { useEffect, useState } from "react";

const useUserData = () => {
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const data = localStorage.getItem("userData");
		if (data) {
			setUserData(JSON.parse(data));
		}
	}, []);

	return userData;
};

export default useUserData