def validate_dict(d):
    """
    Validates that the input is a dictionary.

    Parameters:
    - d (dict): the dictionary to be validated

    Returns:
    - bool: True if d is a dictionary, False otherwise
    """
    if not isinstance(d, dict):
        return False
    return True


def validate_props(d, properties):
    """
    Validates that the input dictionary contains all the properties in the list.

    Parameters:
    - d (dict): the dictionary to be validated
    - properties (list): the list of properties to be checked

    Returns:
    - bool: True if d contains all the properties, False otherwise
    """
    for prop in properties:
        if prop not in d:
            return False
    return True


def validate_data(d):
    """
    Validates that the input dictionary is valid data.

    A dictionary is considered valid data if it is a dictionary and contains the properties 'name' and 'level'.

    Parameters:
    - d (dict): the dictionary to be validated

    Returns:
    - bool: True if d is valid data, False otherwise
    """
    if validate_dict(d):
        if validate_props(d, ['name', 'id', 'level', 'status']):
            return True
    return False


if __name__ == "__main__":
    dataExample = {
        "name": "Correr",
        "level": "Important"
    }

    print(validate_data(dataExample))
    # print(validate_dict(dataExample))
    # print(validate_props(dataExample, ["name"]))
