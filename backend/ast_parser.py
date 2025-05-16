# backend/ast_parser.py
from fastapi import Body
import esprima

def parse_js_logic(code: str):
    """
    Parse JS code into a JSON-serializable AST using Esprima.
    """
    # The parseScript function returns a Node with a `toDict()` method
    tree = esprima.parseScript(code, loc=True)
    return tree.toDict()
