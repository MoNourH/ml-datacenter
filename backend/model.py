import joblib
import os


def get_model():
    model = joblib.load(f"{os.getcwd()}/models/lgb_classifier_model.pkl")
    label_encoder = joblib.load(f"{os.getcwd()}/models/label_encoder.pkl")
    return model, label_encoder
