import React, { useState } from "react";

const App: React.FC = () => {
    const [maxMemoryPct, setMaxMemoryPct] = useState("");
    const [cpusRequested, setCpusRequested] = useState("");
    const [execTimeSec, setExecTimeSec] = useState("");
    const [maxGpuBytes, setMaxGpuBytes] = useState("");
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    max_memory_pct: maxMemoryPct,
                    cpus_requested: cpusRequested,
                    exec_time_sec: execTimeSec,
                    max_gpu_bytes: maxGpuBytes,
                }),
            });

            if (!response.ok) {
                console.error(`Error: HTTP status ${response.status}`);
                setPrediction(`Error: HTTP status ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log("API Response:", data);
            // Set prediction based on API response structure
            setPrediction(
                data.success ? data.data : data.msg || "An error occurred"
            );
        } catch (error) {
            console.error("Error fetching prediction:", error);
            setPrediction("Error making prediction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <section
                style={{
                    width: "700px",
                    padding: "20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Data Center Job Success Forecaster
                </h1>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        gap: "1em",
                    }}
                >
                    <label>
                        Max Memory Percentage:
                        <input
                            type="number"
                            value={maxMemoryPct}
                            onChange={(e) => setMaxMemoryPct(e.target.value)}
                            required
                            min="0"
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "4px",
                            }}
                        />
                    </label>
                    <label>
                        CPUs Requested:
                        <input
                            type="number"
                            value={cpusRequested}
                            onChange={(e) => setCpusRequested(e.target.value)}
                            required
                            min="0"
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "4px",
                            }}
                        />
                    </label>
                    <label>
                        Execution Time (sec):
                        <input
                            type="number"
                            value={execTimeSec}
                            onChange={(e) => setExecTimeSec(e.target.value)}
                            required
                            min="0"
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "4px",
                            }}
                        />
                    </label>
                    <label>
                        Max GPU Bytes:
                        <input
                            type="number"
                            value={maxGpuBytes}
                            onChange={(e) => setMaxGpuBytes(e.target.value)}
                            required
                            min="0"
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "4px",
                            }}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "10px",
                            marginTop: "8px",
                            width: "100%",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? "Loading..." : "Predict"}
                    </button>
                </form>
                {prediction && (
                    <p style={{ marginTop: "20px" }}>
                        Prediction: {prediction}
                    </p>
                )}
            </section>
        </main>
    );
};

export default App;
