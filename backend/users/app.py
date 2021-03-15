import json
import boto3
from flask_lambda import FlaskLambda
from flask import request


app = FlaskLambda(__name__)
ddb = boto3.resource('dynamodb')
table = ddb.Table('users')


@app.route('/users', methods=['GET', 'POST'])
def put_list_users():
    if request.method == 'GET':
        users = table.scan()['Items']
        return json_response(users)
    else:
        # if you need from form
        # table.put_item(Item=request.form.to_dict())
        # return json_response({"message": "user entry created"})

        # request given in body
        print(json.loads(request.data.decode('utf-8')))
        table.put_item(Item=json.loads(request.data.decode('utf-8')))


@app.route('/users/<id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_user(id):
    key = {'id': id}
    if request.method == 'GET':
        user = table.get_item(Key=key).get('Item')
        if user:
            return json_response(user)
        else:
            return json_response({"message": "user not found"}, 404)
    elif request.method == 'PATCH':
        attribute_updates = {key: {'Value': value, 'Action': 'PUT'}
                             for key, value in request.form.items()}
        table.update_item(Key=key, AttributeUpdates=attribute_updates)
        return json_response({"message": "user entry updated"})
    else:
        table.delete_item(Key=key)
        return json_response({"message": "user entry deleted"})


def json_response(data, response_code=200):
    return json.dumps(data), response_code, {'Content-Type': 'application/json'}