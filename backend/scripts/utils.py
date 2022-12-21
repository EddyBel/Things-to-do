def searchTheTask(tasks, taskOfReference):
    name = taskOfReference['name']
    id = taskOfReference['id']
    for task in tasks:
        if name == task['name'] and id == task['id']:
            return task


def removeTheTask(tasks, taskFilter):
    for task in taskFilter:
        tasks.remove(task)
    return tasks
