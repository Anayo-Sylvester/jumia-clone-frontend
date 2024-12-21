import { apiBaseUrl } from "../../../../../App";

// Function to disable all buttons within the cart items container
const disableCartButtons = () => {
  const allButtons = document.querySelectorAll("#cartItemsContainer button");

  allButtons.forEach((button) => {
    button.disabled = true;
    button.style.cursor = "not-allowed";

    if (!button.classList.contains("remove-button")) {
      button.style.backgroundColor = "grey";
    }
  });

};

// Function to enable all buttons within the cart items container
export const enableCartButtons = () => {
  const allButtons = document.querySelectorAll("#cartItemsContainer button");

  allButtons.forEach((button) => {
    button.disabled = false;
    button.style.cursor = "pointer"; // Reset cursor

    if (!button.classList.contains("remove-button")) {
      button.style.backgroundColor = ""; // Reset background color to default
    }
  });

};



// Function to handle the deletion of an item
export const handleDeleteCartItem = async (itemId) => {
  try{
    if (window.confirm("Are you sure you want to delete this item?")) {

      disableCartButtons();  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jumiaCloneToken')}`,
        },
      });
      if (response.ok && response.status === 200) {
        return true;
      } else {
        return false;
      }
    }
  }catch(err){
    return false;
  }
};


export const fetchCart = async () => {
  const response = await fetch(`${apiBaseUrl}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jumiaCloneToken')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
};

// Function to update an item's quantity or details
export const handleUpdateCartItem = async (e, itemId, quantity) => {
  try {
    disableCartButtons();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jumiaCloneToken')}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok && response.status === 200) {
      return true;
    }
    return false;

  } catch (err) {
    return false;
  } finally {
    enableCartButtons();
  }
};
