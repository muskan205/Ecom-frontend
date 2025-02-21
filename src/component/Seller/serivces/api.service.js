import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3004/shop/get-category');
      if (response.status === 200) {
        setCategories(response.data.result.shops);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error };
};