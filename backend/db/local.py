from uuid import uuid4


class LOCAL:

    def __init__(self):
        self.content = []
        self.history = []

    def searchTask(self, data):
        name = data['name']
        id = data['id']
        for task in self.content:
            if task['name'] == name and task['id'] == id:
                return task

    def getTasks(self):
        return self.content

    def addTask(self, data):
        data['id'] = str(uuid4())
        data['status'] = False
        self.content.append(data)
        return self.content

    def removeTask(self, data):
        task = self.searchTask(data)
        if task:
            self.content.remove(task)
            return "Deleted successfully"
        else:
            return "Failed to delete"

    def updateTask(self, data):
        task = self.searchTask(data)
        if task:
            for property in data.keys():
                task[property] = data[property]
            return "Updated successfully"
        else:
            return "Failed to update"


if __name__ == '__main__':
    local = LOCAL()
    local.addTask({"name": "example"})
