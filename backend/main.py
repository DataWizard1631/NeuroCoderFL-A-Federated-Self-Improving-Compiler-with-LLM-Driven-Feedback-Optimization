# backend/main.py

from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ast_parser import parse_js_logic
import joblib
import numpy as np
from collections import Counter

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ————— Load style model —————
model, vocab = joblib.load("style_model.pkl")

def featurize(code: str) -> Counter:
    """Extract AST-node‐type counts from JS code."""
    ast = parse_js_logic(code)
    def walk(node, counter):
        if isinstance(node, dict) and "type" in node:
            counter[node["type"]] += 1
            for v in node.values():
                walk(v, counter)
        elif isinstance(node, list):
            for elem in node:
                walk(elem, counter)
    ctr = Counter()
    walk(ast, ctr)
    return ctr

# ————— Endpoints —————

@app.post("/parse_js")
async def parse_js_endpoint(code: str = Body(..., media_type="text/plain")):
    return {"ast": parse_js_logic(code)}

@app.post("/score_style")
async def score_style(code: str = Body(..., media_type="text/plain")):
    # 1. Featurize
    ctr = featurize(code)
    # 2. Build feature vector
    x = np.array([[ctr.get(t, 0) for t in vocab]])
    # 3. Predict probability of “good” style
    try:
        prob_good = model.predict_proba(x)[0][1]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"style_score": float(prob_good)}
