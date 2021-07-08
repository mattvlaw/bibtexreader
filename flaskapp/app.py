from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO,send,emit
from flask_cors import CORS
import os,sys
import pymongo
from flask_pymongo import PyMongo
import json
from bson import ObjectId, json_util

app = Flask(__name__, static_url_path='/static')
app.config.from_object('config.Config')
mongo = PyMongo(app)

CORS(app) #not secure; set up a whitelist?
socketio = SocketIO(app)


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/entries")
def entries():
    entries = list(mongo.db.entries.find())
    return json.dumps(entries, default=json_util.default)


if __name__ == "__main__":
    socketio.run(app,  host='0.0.0.0')
