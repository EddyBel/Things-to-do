from flask_pymongo import PyMongo, ObjectId


class MONGO:

    def __init__(self, app, reference):
        self.mongo = PyMongo(app)
        self.db = self.mongo.db.task

    def getTasks(self):
        tasks = []
        for task in self.db.find():
            tasks.append({
                "id": str(ObjectId(task['_id'])),
                "name": task['name'],
                "level": task['level'],
                "initiaDate": task['initialDate'],
                "deadline": task['deadline'],
                "status": task['status']
            })
        return tasks

    def addTask(self, data):
        self.db.insert({
            "name": data["name"],
            "level": data["lavel"],
            "status": data['status'],
            "initialDate": data['initialDate'],
            "deadline": data['deadline']
        })

    def updateTask(self, data):
        self.db.update_one({'_id': data['id']}, {
                           '$set': {'status': data['status']}})

    def removeTask(self, data):
        self.db.remove_one({'_id': ObjectId(data['id'])})
