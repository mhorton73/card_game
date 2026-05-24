
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import card_editor, deck_builder

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(card_editor.router)
app.include_router(deck_builder.router)
