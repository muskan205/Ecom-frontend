// formConstants.js

export const FORM_FEILDS = {
    shop: [
      { name: "shopName", label: "Shop Name", type: "text", required: true },
      { name: "ownerId", label: "Owner ID", type: "text", required: true },
    ],
    category: [
      { name: "categoryName", label: "Category Name", type: "text", required: true },
    ],
    subcategory: [
      { name: "subcategoryName", label: "Subcategory Name", type: "text", required: true },
      { name: "categoryId", label: "Category", type: "select", required: true, options: [] },  
    ],
    product: [
      { name: "productName", label: "Product Name", type: "text", required: true },
      { name: "price", label: "Price", type: "number", required: true },
      { name: "shopId", label: "Shop", type: "select", required: true, options: [] }, 
      { name: "categoryId", label: "Category", type: "select", required: true, options: [] }, 
      { name: "subcategoryId", label: "Subcategory", type: "select", required: true, options: [] }, 
      { name: "description", label: "Description", type: "text", required: true },
      { name: "image", label: "Image", type: "file", required: true },
      { name: "quantiy", label: "Quantity", type: "number", required: true },
      { name: "size", label: "Size", type: "number", required: true },

    ],
  };
  