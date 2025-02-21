import React from 'react'

function useFetchCategoories() {

    const [categories, setCategories] = useState([]);

  
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/shop/get-category"
        );
        if (response.status === 200) {
          setCategories(response.data.result.shops);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
  
}

export default useFetchCategoories