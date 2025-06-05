async function populateCountryCodes() {
    const select = document.getElementById("countryCode");
    select.innerHTML = ""; // Clear loading message

    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();

      // Sort alphabetically by name
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

      countries.forEach(country => {
        const name = country.name.common;
        const callingCode = country.idd?.root && country.idd?.suffixes?.[0]
          ? `${country.idd.root}${country.idd.suffixes[0]}`
          : null;

        if (callingCode) {
          const option = document.createElement("option");
          option.value = callingCode;
          option.textContent = `${name} (${callingCode})`;
          if (callingCode === "+1" && name === "United States") {
            option.selected = true; // Default selection
          }
          select.appendChild(option);
        }
      });
    } catch (err) {
      select.innerHTML = '<option value="">Error loading</option>';
      console.error("Failed to load country data:", err);
    }
  }

  populateCountryCodes();

  function validatePhoneNumber() {
    const phone = document.getElementById('phoneNumber').value;
    const isValid = /^\d{10}$/.test(phone);

    if (!isValid) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    const countryCode = document.getElementById('countryCode').value;
    alert("Full number: " + countryCode + " " + phone);
    return true;
  }