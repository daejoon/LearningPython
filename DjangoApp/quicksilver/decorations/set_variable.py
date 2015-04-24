__author__ = 'kdj'

def setTplViewVariable(name, value):
    def decorator_func(func):
        def wrapper_func(*args, **kwargs):
            ret = func(*args, **kwargs)
            if isinstance(ret, dict):
                ret[name] = value
            return ret
        return wrapper_func
    return decorator_func

