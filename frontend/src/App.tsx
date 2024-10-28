import React, { useState } from 'react';

const App: React.FC = () => {
  // State for user input and prediction response
  const [features, setFeatures] = useState<string>('');
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeatures(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Send data to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: JSON.parse(features) }), // Convert input to JSON
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction('Error making prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Data Center Job Success Forecaster</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Features (JSON format):
          <textarea
            value={features}
            onChange={handleInputChange}
            placeholder='e.g., [1.0, 2.3, 4.5]'
            rows={4}
            style={{ width: '100%', marginTop: '1rem' }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Loading...' : 'Predict'}
        </button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default App;
