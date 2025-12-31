import React, { useState } from 'react';

const RetirementPlanner = () => {
    const [currentAge, setCurrentAge] = useState(0);
    const [retirementAge, setRetirementAge] = useState(0);
    const [currentSavings, setCurrentSavings] = useState(0);
    const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [futureValue, setFutureValue] = useState(0);

    const calculateRetirement = () => {
        const yearsToRetirement = retirementAge - currentAge;
        const totalSavings = (monthlyContribution * 12 * yearsToRetirement) + currentSavings;
        setFutureValue(totalSavings);
    };

    return (
        <div>
            <h2>Retirement Planner</h2>
            <input type="number" placeholder="Current Age" onChange={(e) => setCurrentAge(e.target.value)} />
            <input type="number" placeholder="Retirement Age" onChange={(e) => setRetirementAge(e.target.value)} />
            <input type="number" placeholder="Current Savings" onChange={(e) => setCurrentSavings(e.target.value)} />
            <input type="number" placeholder="Monthly Contribution" onChange={(e) => setMonthlyContribution(e.target.value)} />
            <button onClick={calculateRetirement}>Calculate Future Savings</button>
            <h3>Total Savings at Retirement: {futureValue}</h3>
        </div>
    );
};

export default RetirementPlanner;
