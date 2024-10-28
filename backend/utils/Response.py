import json


class Response:
    def __init__(self, status_code, payload):
        self.success = 200 <= status_code < 300
        self.msg = None
        self.data = None

        if self.success:
            self.data = payload
        else:
            self.msg = payload

    def to_dict(self):
        response_dict = {
            "success": self.success,
        }
        if self.msg is not None:
            response_dict["msg"] = self.msg
        if self.data is not None:
            response_dict["data"] = self.data
        return response_dict

    def to_json(self):
        return json.dumps(self.to_dict())
