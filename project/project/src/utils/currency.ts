export const formatIndianRupees = (amount: number): string => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
    return formatter.format(amount);
};

// For displaying large numbers in Indian format (e.g., 1,00,000)
export const formatIndianNumber = (number: number): string => {
    return new Intl.NumberFormat('en-IN').format(number);
};
