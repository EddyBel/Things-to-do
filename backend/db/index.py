from .local import LOCAL
from .mongo import MONGO


class DB:
    def __init__(self, method, app):
        if method == "LOCAL":
            self.stance = LOCAL()
        elif method == "MONGO":
            self.stance = MONGO(app, "tasks")

    def getTask(self):
        return self.stance.getTasks()

    def addItem(self, data):
        self.stance.addTask(data)

    def removeItem(self, data):
        self.stance.removeTask(data)

    def updateItem(self, data):
        self.stance.updateTask(data)
