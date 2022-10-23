import json
import uuid
import os
import datetime

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask import Blueprint, make_response, jsonify, request
from main.models import Location, User, Floor
from extensions import db

auth = Blueprint("auth",__name__)
views = Blueprint("views",__name__)

@auth.route('/register',methods=["POST"])
def register():

    user_info = request.json
    
    user = User(**user_info)
    
    db.session.add(user)
    db.session.commit()
    
    return make_response({"message":"user created"},200)


@views.route("/data",methods=["GET"])
def get_data():
    
    locations = []

    for location in Location.query.all():
        location_ = {
            "id":location.id,
            "name":location.name,
            "floors":[]
        }
        
        for floor in Floor.query.filter_by(location=location.id):
            location_["floors"].append({
                "id":floor.id,
                "floor_no":floor.floor_no,
                "total_capacity":floor.total_capacity,
                "total_peoplr":floor.total_people
            })

        locations.append(location_)
    
    return make_response(locations,200)

@views.route("/populate",methods=["GET"])
def populate():

    library = Location(name="Library")
    mess = Location(name="MESS")
    db.session.add(library)
    db.session.add(mess)
    db.session.commit()

    lib_floor_1 = Floor(floor_no="LIB_NO1",total_capacity=200,location=library.id)
    mess_floor_1 = Floor(floor_no="MESS_NO1",total_capacity=100,location=mess.id)

    db.session.add(lib_floor_1)
    db.session.add(mess_floor_1)

    db.session.commit()

    return make_response("done",200) 


@views.route("/update_crowd/",methods=["GET"])
def update_crowd(location=None):

    location = request.args.get("location")
    floor = request.args.get("floor")
    val = request.args.get("count")

    location = Location.query.filter_by(name=location).first()

    if location==None:
        return make_response("invalid location",400)
    floor = Floor.query.filter_by(location=location.id,floor_no=floor).first()

    if floor==None:
        return make_response("invalid floor",400)

    floor.total_people = val
    db.session.add(floor)
    db.session.commit()

    return make_response("Updated",200)