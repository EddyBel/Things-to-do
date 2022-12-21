from flask import Flask, request, jsonify
from flask_cors import CORS
from settings import PORT, MONGO_URL, DEBUG, DATABASE
from scripts.files import getContentFile
from db.index import DB
import sys

app = Flask(__name__)
app.config['MONGO_URI'] = MONGO_URL
CORS(app)
db = DB(DATABASE, app)


@app.route('/tasks', methods=['GET'])
def getTasks():
    """
    Endpoint for retrieving a list of tasks.

    Returns:
    - dict: a dictionary with the following keys:
        - 'msg': a message indicating that the request was successful
        - 'data': the list of tasks
    """
    content = db.getTask()
    return jsonify({"msg": "Get Tasks", "data": content})


@app.route('/tasks', methods=['POST'])
def addTasks():
    """
    Endpoint for adding a new task.

    Returns:
    - dict: a dictionary with the following keys:
        - 'msg': a message indicating that the task was added successfully
        - 'data': the updated list of tasks
    """
    try:
        response = request.json
        content = db.addItem(response)
        return jsonify({"msg": "Tasks added", "data": content})
    except:
        e = sys.exc_info()[1]
        return jsonify({"msg": "Error Server", "content": e.args[0]})


@app.route('/tasks', methods=['PUT'])
def updateTask():
    """
    This function updates the status of a task in the `content` list.
    It receives a JSON object as input via a PUT request, which should contain a `status` field.
    The function searches for the task in the `content` list using the `searchTheTask` function.
    If the task is found, its status is updated to the new value.
    The updated task and the original request are returned in the response as a JSON object.
    If an error occurs, a JSON object with an error message is returned instead.
    """
    try:
        response = request.json
        db.updateItem(response)
        content = db.getTask()
        return jsonify({"msg": "Task Updated", "data": content})
    except:
        e = sys.exc_info()[1]
        return jsonify({"msg": "Error Server", "content": e.args[0]})


@app.route('/tasks', methods=['DELETE'])
def deleteTask():
    """
    This function deletes a task from the `content` list.
    It receives a JSON object as input via a DELETE request, which should contain an `id` field.
    The function searches for the task in the `content` list using the `searchTheTask` function.
    If the task is found, it is removed from the list.
    The updated list of tasks is returned in the response as a JSON object.
    If an error occurs, a JSON object with an error message is returned instead.
    """
    try:
        response = request.json
        db.removeItem(response)
        content = db.getTask()
        return jsonify({"msg": "Tasks deleted", "data": content})
    except:
        e = sys.exc_info()[1]
        return jsonify({"msg": "Error Server", "content": e.args[0]})


@app.route('/about', methods=['GET'])
def getAbout():
    """
    Endpoint for retrieving the 'About' content.

    Returns:
    - dict: a dictionary with the following keys:
        - 'msg': a message indicating that the request was successful
        - 'content': a dictionary with the following keys:
            - 'title': the title of the 'About' content
            - 'body': the body of the 'About' content, as a list of paragraphs
    """
    text = getContentFile("./content/About.md")
    return jsonify({"msg": "About text", "content": {
        "title": text['title'],
        "body": text['content']
    }})


if __name__ == "__main__":
    print("Run server at http://localhost:{}".format(PORT))
    app.run(debug=DEBUG, port=PORT)
