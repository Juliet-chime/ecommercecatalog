const currencySymbol = {
    NAIRA_SYMBOL: "₦",
    DOLLAR_SYMBOL: "$",
  };

export const formatData = {
    capitalize: (string='', changeCase = false) => {
      const word = changeCase ? string.slice(1).toLowerCase() : string.slice(1);
  
      return string ? string.charAt(0).toUpperCase() + word : "";
    },
    prettyNumber: (number, noDecimal, decimals, uniformDecimal) => {
        number = typeof number === "number" ? number : Number(number);
        number = new RegExp(/-?\d+\.{1}\d+/).test(number)
          ? number.toFixed(noDecimal ? 0 : decimals || 2)
          : number;
        if (uniformDecimal) {
          number = Number(number).toFixed(decimals);
        }
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      },
    currencyAmount: (amount, currency = "NGN") => {
        let symbol = currencySymbol.NAIRA_SYMBOL;
        if (currency === "USD") {
          symbol = currencySymbol.DOLLAR_SYMBOL;
        }
        return amount?.toString() === "0" ? `0` : `${symbol}${amount}`;
      },
}