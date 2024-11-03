import pandas as pd
from flask_cors import CORS, cross_origin
from flask import Flask, request
from model import get_model
from utils.Response import Response

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
    data = request.get_json()

    max_memory_pct = float(
        data.get("max_memory_pct")
    )  # Max percentage of memory utilized
    cpus_requested = float(data.get("cpus_requested"))  # CPU cores requested
    exec_time_sec = float(data.get("exec_time_sec"))  # Execution time in seconds
    max_gpu_bytes = float(data.get("max_gpu_bytes"))  # Max GPU memory used in bytes

    if max_memory_pct and cpus_requested and exec_time_sec and max_gpu_bytes:
        model, label_encoder = get_model()

        X_pred = pd.DataFrame(
            {
                "memoryutilization_pct_max": [max_memory_pct],
                "cpus_req": [cpus_requested],
                "totalexecutiontime_sec": [exec_time_sec],
                "maxgpumemoryused_bytes": [max_gpu_bytes],
            }
        )

        y_pred_encoded = model.predict(X_pred)
        y_pred = label_encoder.inverse_transform(y_pred_encoded)

        return Response(200, y_pred[0]).to_json(), 200

    return Response(400, "Bad request").to_json(), 400
