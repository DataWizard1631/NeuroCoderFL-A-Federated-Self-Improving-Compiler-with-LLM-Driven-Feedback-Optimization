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
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ————— Style Analysis Functions —————

def score_indentation(code: str) -> float:
    """Score code indentation consistency."""
    lines = code.split('\n')
    if len(lines) <= 1:
        return 0.7  # Default for single line
        
    # Check consistent indentation
    indentation_types = set()
    for line in lines:
        if line.strip() == '':
            continue
        leading_spaces = len(line) - len(line.lstrip())
        if leading_spaces > 0:
            indentation_types.add(leading_spaces)
    
    # Multiple indentation sizes is bad
    if len(indentation_types) > 2:
        return 0.3
    # Consistent indentation is good (1 is for non-indented lines)
    elif len(indentation_types) <= 2:
        return 0.9
    # Default middle score
    return 0.6

def score_naming_conventions(ast: dict) -> float:
    """Score variable and function naming conventions."""
    if not ast:
        return 0.5
        
    score = 0.5  # Default score
    camel_case_count = 0
    snake_case_count = 0
    bad_names_count = 0
    total_names = 0
    
    def walk_for_names(node):
        nonlocal camel_case_count, snake_case_count, bad_names_count, total_names
        
        if isinstance(node, dict):
            # Check function declarations
            if node.get('type') == 'FunctionDeclaration' and 'id' in node and 'name' in node['id']:
                name = node['id']['name']
                total_names += 1
                if name[0].islower() and '_' not in name:
                    camel_case_count += 1
                elif '_' in name and name.islower():
                    snake_case_count += 1
                elif len(name) <= 1:
                    bad_names_count += 1
            
            # Check variable declarations
            if node.get('type') == 'VariableDeclarator' and 'id' in node and 'name' in node['id']:
                name = node['id']['name']
                total_names += 1
                if name[0].islower() and '_' not in name:
                    camel_case_count += 1
                elif '_' in name and name.islower():
                    snake_case_count += 1
                elif len(name) <= 1:
                    bad_names_count += 1
            
            # Recursively walk children
            for key, value in node.items():
                walk_for_names(value)
        elif isinstance(node, list):
            for item in node:
                walk_for_names(item)
    
    walk_for_names(ast)
    
    if total_names == 0:
        return 0.5  # No names to score
    
    # Calculate consistency (prefer either camelCase or snake_case consistently)
    consistency = max(camel_case_count, snake_case_count) / total_names if total_names > 0 else 0.5
    bad_ratio = bad_names_count / total_names if total_names > 0 else 0.5
    
    # Final score: Reward consistency and penalize bad names
    score = 0.7 * consistency + 0.3 * (1 - bad_ratio)
    return min(max(score, 0.1), 0.95)  # Keep between 0.1 and 0.95

def score_complexity(ast: dict) -> float:
    """Score code complexity based on nesting levels and function length."""
    if not ast:
        return 0.5
        
    max_nesting = 0
    current_nesting = 0
    function_lengths = []
    current_function_nodes = 0
    
    def walk_complexity(node, in_function=False):
        nonlocal max_nesting, current_nesting, function_lengths, current_function_nodes
        
        if isinstance(node, dict):
            # Track nesting level for control structures
            is_nesting_structure = node.get('type') in ['IfStatement', 'ForStatement', 'WhileStatement', 'ForInStatement', 'ForOfStatement', 'SwitchStatement']
            
            if is_nesting_structure:
                current_nesting += 1
                max_nesting = max(max_nesting, current_nesting)
            
            # Track function length
            if node.get('type') == 'FunctionDeclaration' or node.get('type') == 'FunctionExpression' or node.get('type') == 'ArrowFunctionExpression':
                # We're starting a new function, save the previous one if we were tracking
                if in_function and current_function_nodes > 0:
                    function_lengths.append(current_function_nodes)
                
                current_function_nodes = 1  # Reset for new function
                in_function = True
            elif in_function:
                current_function_nodes += 1
            
            # Recursively walk children
            for key, value in node.items():
                walk_complexity(value, in_function)
            
            if is_nesting_structure:
                current_nesting -= 1
        elif isinstance(node, list):
            for item in node:
                walk_complexity(item, in_function)
    
    walk_complexity(ast)
    
    # Add the last function if we were tracking one
    if current_function_nodes > 0:
        function_lengths.append(current_function_nodes)
    
    # Calculate complexity score
    nesting_score = 1.0 if max_nesting == 0 else min(1.0, 3.0 / max_nesting)
    
    avg_function_length = sum(function_lengths) / len(function_lengths) if function_lengths else 0
    length_score = 1.0 if avg_function_length == 0 else min(1.0, 20.0 / avg_function_length)
    
    # Combine scores with weights
    final_score = 0.6 * nesting_score + 0.4 * length_score
    return min(max(final_score, 0.1), 0.95)  # Keep between 0.1 and 0.95

def score_documentation(ast: dict) -> float:
    """Score code documentation/comments quality."""
    if not ast:
        return 0.5
    
    # Look for comments in the AST
    comment_count = 0
    function_count = 0
    
    def walk_docs(node):
        nonlocal comment_count, function_count
        
        if isinstance(node, dict):
            # Count comments
            if 'comments' in node:
                comment_count += len(node['comments'])
            
            # Count functions
            if node.get('type') in ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression']:
                function_count += 1
            
            # Recursively walk children
            for key, value in node.items():
                walk_docs(value)
        elif isinstance(node, list):
            for item in node:
                walk_docs(item)
    
    walk_docs(ast)
    
    # If no functions, base score on just having some comments
    if function_count == 0:
        return min(0.7, 0.3 + 0.1 * comment_count)
    
    # Calculate ratio of comments to functions (ideal is at least 1:1)
    comment_ratio = min(2.0, comment_count / function_count)
    doc_score = 0.2 + (comment_ratio * 0.4)  # Scale to 0.2-1.0 range
    
    return min(max(doc_score, 0.1), 0.95)  # Keep between 0.1 and 0.95

# Legacy function kept for compatibility
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
    # Analyze multiple aspects of code style
    try:
        ast = parse_js_logic(code)
        if not ast:
            raise HTTPException(status_code=400, detail="Unable to parse JavaScript code")
        
        # Score different style aspects
        scores = {
            "indentation": score_indentation(code),
            "naming": score_naming_conventions(ast),
            "complexity": score_complexity(ast),
            "documentation": score_documentation(ast)
        }
        
        # Calculate weighted average
        weights = {"indentation": 0.25, "naming": 0.3, "complexity": 0.3, "documentation": 0.15}
        weighted_score = sum(scores[k] * weights[k] for k in scores) / sum(weights.values())
        
        return {
            "style_score": float(weighted_score),
            "detailed_scores": scores
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
