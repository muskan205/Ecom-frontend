import axios from "axios";
import { useEffect, useState } from "react"

export const useGetCategories=async()=>{
      const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
          try {
           
            const response = await axios.get("http://localhost:3004/shop/get-category");
            if (response.status === 200) {
              setCategories(response.data.result.shops);
              console.log("response.data",response.data.result.shops)
            }
          } catch (error) {
            console.error("Error fetching categories", error);
          }
        };
        fetchCategories();
      }, []);
}
