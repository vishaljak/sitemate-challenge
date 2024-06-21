from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

staticJson = {
  "id": 1,
  "title": 'Test Title',
  "description": 'Test Description',
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create")
def create(json_object: dict):
    return json_object

@app.get("/read")
def read():
    return staticJson

@app.put("/update")
def update(json_object: dict):
    return json_object

@app.delete("/delete/{id}")
def delete(id: int):
    return id

if __name__ == "__main__":
  uvicorn.run(app, host="127.0.0.1")