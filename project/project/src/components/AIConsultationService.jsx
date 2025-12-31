import React, { useState } from 'react';

const AIConsultationService = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [topic, setTopic] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/consultation/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    date,
                    time,
                    topic
                })
            });

            const data = await response.json();
            setAiResponse(data.ai_response);
            setSubmitted(true);
        } catch (error) {
            console.error('Error scheduling consultation:', error);
        }
    };

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM",
        "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="ml-4 text-2xl font-bold text-white">AI Consultation Service</h2>
            </div>
            <p className="text-gray-300 mb-6">Schedule a 1-on-1 consultation with our AI financial experts</p>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Preferred Date</label>
                        <input
                            type="date"
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Preferred Time</label>
                        <select
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <label className="block text-gray-300 mb-2">Consultation Topic</label>
                        <textarea
                            className="w-full bg-gray-600 text-white rounded-lg p-3"
                            rows="4"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Briefly describe what you'd like to discuss..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Schedule Consultation
                    </button>
                </form>
            ) : (
                <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Consultation Scheduled!</h3>
                    {aiResponse && (
                        <div className="space-y-4">
                            <p className="text-gray-300">{aiResponse.message}</p>
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-white mb-2">Preparation Tips:</h4>
                                <ul className="list-disc list-inside text-gray-300">
                                    {aiResponse.preparation_tips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-gray-700 p-6 rounded-lg text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="text-xl font-bold text-white mb-2">Consultation Scheduled!</h3>
                    <p className="text-gray-300">
                        Thank you for scheduling a consultation. We'll send a confirmation email to {email} with further details.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Schedule Another Consultation
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIConsultationService;
