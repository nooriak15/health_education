import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load posts from JSON file
with open("posts.json", "r") as f:
    SAMPLE_POSTS = json.load(f)

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

