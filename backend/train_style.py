# backend/train_style.py
import json
import glob
from collections import Counter
import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib
from ast_parser import parse_js_logic

# 1. Load and label your snippets
DATA = [
    ("function add(a,b){return a+b;}", 0),
    ("function add(a, b) { return a + b; }", 1),
    # …add more examples
]

# 2. Featurizer: count node types
def featurize(code):
    ast = parse_js_logic(code)
    # Walk the AST dict recursively
    def walk(node, counter):
        if isinstance(node, dict) and "type" in node:
            counter[node["type"]] += 1
            for v in node.values():
                walk(v, counter)
        elif isinstance(node, list):
            for elem in node:
                walk(elem, counter)
    counter = Counter()
    walk(ast, counter)
    return counter

# 3. Build feature matrix
all_feats = []
labels   = []
vocab    = set()
for code, label in DATA:
    cnt = featurize(code)
    vocab.update(cnt.keys())
    all_feats.append(cnt)
    labels.append(label)

vocab = sorted(vocab)
X = np.array([[f.get(t, 0) for t in vocab] for f in all_feats])
y = np.array(labels)

# 4. Train
model = LogisticRegression()
model.fit(X, y)

# 5. Save
joblib.dump((model, vocab), "style_model.pkl")
print("✅ Trained style scorer and saved to style_model.pkl")
