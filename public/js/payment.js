// Get the card number input element
const cardNumberInput = document.getElementById("cardNumberInput");
// Get the card name input element
const cardNameInput = document.getElementById("cardNameInput");
// Get the expiry date input element
const expiryDateInput = document.getElementById("expiryDateInput");
// Get the CVV input element
const cvvInput = document.getElementById("cvvInput");
// Get the submit button element
const submitButton = document.getElementById("submitButton");
// Get the result container element
const resultContainer = document.getElementById("resultContainer");

// Function to validate the input fields
const validateInput = () => {
    // Check if card number is not empty
    if (cardNumberInput.value === "") {
        resultContainer.innerHTML = "Card number is required.";
        resultContainer.style.display = "block";
        return false;
    }
    // Check if card name is not empty
    if (cardNameInput.value === "") {
        resultContainer.innerHTML = "Card Name is required.";
        resultContainer.style.display = "block";
        return false;
    }
    // Check if expiry date is not empty
    if (expiryDateInput.value === "") {
        resultContainer.innerHTML = "Expiry date is required.";
        resultContainer.style.display = "block";
        return false;
    }
    // Check if CVV is not empty
    if (cvvInput.value === "") {
        resultContainer.innerHTML = "CVV is required.";
        resultContainer.style.display = "block";
        return false;
    }
    // If all fields have values, return true
    return true;
};

// Submit button click event
submitButton.addEventListener("click", () => {
    // Validate the input fields
    const isValid = validateInput();
    // If the fields are valid, show success message
    if (isValid) {
        resultContainer.innerHTML = "Payment Successful!!";
        resultContainer.style.display = "block";
        cardNumberInput.value = "";
        cardNameInput.value = "";
        expiryDateInput.value = "";
        cvvInput.value = "";
    }
});