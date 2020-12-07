import yaml

def load_config(path):
    with open(path) as configuration_file:
        configuration = yaml.load(configuration_file,Loader=yaml.FullLoader)
    return configuration