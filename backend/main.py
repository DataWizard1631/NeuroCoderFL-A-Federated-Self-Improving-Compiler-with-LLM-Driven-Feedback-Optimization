# backend/main.py
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from ast_parser import parse_js_logic

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/parse_js")
async def parse_js_endpoint(code: str = Body(..., media_type="text/plain")):
    return {"ast": parse_js_logic(code)}
