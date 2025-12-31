import React, { useState } from 'react';

const InvestmentPlanner = () => {
    const [amount, setAmount] = useState(0);
    const [years, setYears] = useState(0);
    const [rate, setRate] = useState(0);
    const [futureValue, setFutureValue] = useState(0);

    const calculateInvestment = () => {
        const fv = amount * Math.pow(1 + rate / 100, years);
        setFutureValue(fv);
    };

    return (
        <div>
            <h2>Investment Planner</h2>
            <input type="number" placeholder="Investment Amount" onChange={(e) => setAmount(e.target.value)} />
            <input type="number" placeholder="Years" onChange={(e) => setYears(e.target.value)} />
            <input type="number" placeholder="Expected Rate of Return (%)" onChange={(e) => setRate(e.target.value)} />
            <button onClick={calculateInvestment}>Calculate Future Value</button>
            <h3>Future Value: {futureValue}</h3>
        </div>
    );
};

export default InvestmentPlanner;
