from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data - using simple dictionaries instead of Pydantic models for data
SAMPLE_POSTS = [
    {
        "id": 1,
        "image_url": "https://placehold.co/600x400/e2e8f0/475569?text=Health+Claim+1",
        "interaction_type": "drag_drop",
        "claims": [
            {
                "text": "This natural supplement can cure all types of cancer in just 2 weeks!",
                "is_red_flag": True,
                "explanation": "Be skeptical of any product claiming to cure all types of cancer. Cancer treatments are specific to the type and stage of cancer. If something sounds too good to be true, it probably is."
            }
        ],
        "options": None
    },
    {
        "id": 2,
        "image_url": "https://placehold.co/600x400/e2e8f0/475569?text=Health+Claim+2",
        "interaction_type": "multiple_choice",
        "claims": None,
        "options": [
            {
                "text": "This post makes scientifically proven claims",
                "is_correct": False,
                "explanation": "The post makes broad claims without citing specific scientific studies or evidence."
            },
            {
                "text": "This post uses fear tactics to sell products",
                "is_correct": True,
                "explanation": "Good catch! The post uses fear about health issues to promote a product without scientific backing."
            },
            {
                "text": "This information comes from medical experts",
                "is_correct": False,
                "explanation": "The post doesn't cite any medical experts or credible health organizations."
            }
        ]
    }
]

@app.get("/")
def read_root() -> Dict[str, str]:
    return {"message": "Welcome to Sift - Learn to spot health misinformation"}

@app.get("/posts")
def get_posts() -> List[Dict[str, Any]]:
    return SAMPLE_POSTS

@app.get("/posts/{post_id}")
def get_post(post_id: int) -> Dict[str, Any]:
    post = next((p for p in SAMPLE_POSTS if p["id"] == post_id), None)
    if post is None:
        raise HTTPException(status_code=404, detail=f"Post {post_id} not found")
    return post

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001) 