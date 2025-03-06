# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load trained models and scaler
# best_gb = joblib.load("best_gb_model.pkl")
# best_ab = joblib.load("best_ab_model.pkl")
# best_rf = joblib.load("best_rf_model.pkl")
# scaler = joblib.load("scaler1.pkl")

# # Function for ensemble prediction
# def ensemble_predict(X):
#     pred_gb = best_gb.predict(X)
#     pred_ab = best_ab.predict(X)
#     pred_rf = best_rf.predict(X)
#     return (pred_gb + pred_ab + pred_rf) / 3  # Averaging predictions

# @app.route("/api/predict-risk", methods=["POST"])
# def predict_risk():
#     try:
#         data = request.json

#         # Convert request data into a NumPy array
#         features = np.array([
#             data["totalArea"],
#             data["numFloors"],
#             data["occupancyType"],
#             data["height"],
#             data["fireSafetyMeasures"],
#             data["waterStorage"],
#             data["nearestFireStation"]
#         ]).reshape(1, -1)

#         # Scale the input data
#         features_scaled = scaler.transform(features)

#         # Predict risk score using ensemble model
#         risk_score = ensemble_predict(features_scaled)[0]

#         return jsonify({"riskScore": float(risk_score)})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5001, debug=True)

from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    # Load trained models and scaler
    best_gb = joblib.load("best_gb_model.pkl")
    best_ab = joblib.load("best_ab_model.pkl")
    best_rf = joblib.load("best_rf_model.pkl")
    scaler = joblib.load("scaler1.pkl")
    print("✅ Models and scaler loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    best_gb = best_ab = best_rf = scaler = None  # Prevent crashes

# Function for ensemble prediction
def ensemble_predict(X):
    try:
        if not best_gb or not best_ab or not best_rf:
            raise ValueError("One or more models are not loaded properly.")
        
        pred_gb = best_gb.predict(X)
        pred_ab = best_ab.predict(X)
        pred_rf = best_rf.predict(X)
        
        return (pred_gb + pred_ab + pred_rf) / 3  # Averaging predictions
    except Exception as e:
        print(f"❌ Error in model prediction: {e}")
        return np.array([0])  # Default to 0 if prediction fails

@app.route("/api/predict-risk", methods=["POST"])
def predict_risk():
    try:
        data = request.json
        print(f"📩 Received Data: {data}")  # Debugging input

        required_keys = [
            "totalArea", "numFloors", "occupancyType", 
            "height", "fireSafetyMeasures", "waterStorage", "nearestFireStation"
        ]

        # Check for missing or invalid data
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({"error": f"Missing fields: {', '.join(missing_keys)}"}), 400

        # Convert request data into a NumPy array (ensure float conversion)
        try:
            features = np.array([float(data[key]) for key in required_keys]).reshape(1, -1)
        except ValueError:
            return jsonify({"error": "Invalid data format. All values must be numeric."}), 400

        print(f"🔢 Features Before Scaling: {features}")  # Debugging

        if scaler is None:
            return jsonify({"error": "Scaler not loaded"}), 500

        # Scale the input data
        features_scaled = scaler.transform(features)
        print(f"📊 Features After Scaling: {features_scaled}")  # Debugging

        # Predict risk score using ensemble model
        risk_score = ensemble_predict(features_scaled)[0]
        print(f"🔥 Predicted Risk Score: {risk_score}")  # Debugging

        return jsonify({"riskScore": float(risk_score)})
    
    except Exception as e:
        print(f"❌ Error in predict_risk: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)




