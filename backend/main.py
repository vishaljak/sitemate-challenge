from fastapi import FastAPI, HTTPException
import uvicorn

app = FastAPI()

staticJson = {
  "id": 1,
  "title": 'Test Title',
  "description": 'Test Description',
}

@app.post("/create")
def create(json_object: dict):
    return json_object

@app.get("/read")
def read():
    return staticJson

@app.put("/update")
def update(json_object: dict):
    return json_object

@app.delete("/delete")
def delete(id: int):
    return id

if __name__ == "__main__":
  uvicorn.run(app, host="127.0.0.1")