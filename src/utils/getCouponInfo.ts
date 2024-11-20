import { useEffect, useState } from "react";

// Custom hook to calculate coupon-related info
export const getCouponInfo = (
  days: number,
  discountRate: string,
  netAmount: string,
  sum: string,
  type: boolean
) => {
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null); // State to store the result
  const [markup, setMarkup] = useState<number | null>(null); // State to store the markup value
  const [grossAmount, setGrossAmount] = useState<number | null>(null); // State to store the gross amount
  const [isGross, setIsGross] = useState<boolean>(true); // State to toggle between gross/net calculation

  // Function to calculate the values based on gross/net calculation (type === true)
  const calculateValuesOne = () => {
    if (!days || !discountRate || !netAmount) {
      setCalculatedValue(null);
      setMarkup(null); // Reset markup when inputs are missing
      setGrossAmount(null); // Reset gross amount when inputs are missing
      return;
    }

    // Parse inputs as numbers
    const t0 = new Date();
    const t1 = new Date();
    t1.setDate(t0.getDate() + Number(days));

    const timeDiff =
      (t1.getTime() - t0.getTime()) / (365 * 24 * 60 * 60 * 1000); // Time difference in years
    const i = Number(discountRate) / 100; // Convert percentage to decimal
    const netAmountValue = Number(netAmount.slice(1));

    // Perform the calculation based on the mode (gross or net)
    let result;
    let calculatedMarkup: number | null = null; // Store markup here

    if (isGross) {
      result = timeDiff * Math.exp(i) * netAmountValue; // Gross amount formula
      setGrossAmount(result); // Set gross amount
      calculatedMarkup = result - netAmountValue; // Markup = gross amount - net amount
    } else {
      result = netAmountValue / (timeDiff * Math.exp(i)); // Net amount formula
      setGrossAmount(null); // Set gross amount to null for net calculation
      calculatedMarkup = 0; // No markup for net calculation
    }

    setCalculatedValue(result); // Set calculated value (gross or net)
    setMarkup(calculatedMarkup); // Set calculated markup
  };

  // Function to calculate the discount based on the discount rate & sum (type === false)
  const calculateValuesTwo = () => {
    if (!discountRate || !sum || !days) {
      setCalculatedValue(null);
      setMarkup(null); // Reset markup when inputs are missing
      return;
    }

    const discountRateValue = Number(discountRate) / 100; // Convert discount rate to decimal
    const sumValue = Number(sum.slice(1));

    // Adjust discount based on days (e.g., prorate the discount if it's based on time)
    // Example: Apply a different discount factor based on the number of days
    const timeFactor = days / 365; // For simplicity, adjust by days to years. You can adjust this logic as needed.
    const discount = sumValue * discountRateValue * timeFactor; // Adjusted discount
    const discountedValue = sumValue - discount; // Final discounted value after applying discount

    setCalculatedValue(discountedValue); // Set the discounted value
    setMarkup(discount); // Set the discount as markup
  };

  // Effect hook to recalculate whenever any of the inputs or 'isGross' changes
  useEffect(() => {
    if (type) {
      calculateValuesOne(); // Call the calculation function for gross/net when type is true
    } else {
      calculateValuesTwo(); // Call the calculation function for discount when type is false
    }
  }, [days, discountRate, netAmount, sum, isGross, type]); // Recalculate when inputs, mode, or type change

  // Return calculated values and the function to toggle between gross and net calculations
  return { calculatedValue, grossAmount, markup, setIsGross, isGross };
};
