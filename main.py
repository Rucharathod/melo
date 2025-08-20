from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib, json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

# Paths to model + labels
MODEL_PATH = "emotion_model_multilabel.joblib"
LABELS_PATH = "labels.json"

# Load model + labels
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print("❌ Error loading model:", e)

try:
    with open(LABELS_PATH, "r", encoding="utf-8") as f:
        labels = json.load(f)
except Exception as e:
    labels = None
    print("❌ Error loading labels:", e)

# Create app
app = FastAPI(title="Melo Emotion Detection API")

# Enable CORS (for future frontends)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextIn(BaseModel):
    text: str

@app.get("/")
def root():
    return {"ok": True, "labels": labels}

@app.post("/predict")
def predict(inp: TextIn):
    if not model:
        raise HTTPException(500, "Model not loaded")
    text = inp.text.strip()
    if not text:
        raise HTTPException(400, "Empty text")

    try:
        # Get probability predictions
        probas = model.predict_proba([text])[0]

        # Step 1: Apply threshold
        threshold = 0.3
        filtered = [
            {"label": label, "score": float(prob)}
            for label, prob in zip(labels, probas)
            if prob > threshold
        ]

        # Step 2: Always ensure at least top 3 predictions are shown
        sorted_probs = sorted(
            zip(labels, probas), key=lambda x: x[1], reverse=True
        )
        top3 = [
            {"label": label, "score": float(prob)}
            for label, prob in sorted_probs[:3]
        ]

        # Merge results (unique labels only)
        seen = set()
        final_result = []
        for item in filtered + top3:
            if item["label"] not in seen:
                final_result.append(item)
                seen.add(item["label"])

        result = final_result

    except AttributeError:
        # Fallback: if model only supports predict()
        pred = model.predict([text])[0]
        result = [label for label, val in zip(labels, pred) if val == 1]

    return {"text": text, "emotions": result}

# Serve index.html at /ui
@app.get("/ui", response_class=HTMLResponse)
def ui():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()