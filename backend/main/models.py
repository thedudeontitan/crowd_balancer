from extensions import db


class Floor(db.Model):
    
    id = db.Column(db.Integer,primary_key=True)
    floor_no = db.Column(db.String(100),nullable=False)
    total_people = db.Column(db.Integer,default=0) 
    total_capacity = db.Column(db.Integer,default=0)
    location = db.Column(db.Integer,db.ForeignKey('location.id'))

class Location(db.Model):

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(500),nullable=False) 
    floors = db.relationship('Floor',backref='location_floor')

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String(100),nullable=False) 
    last_name = db.Column(db.String(100),nullable=False)
    phone_number = db.Column(db.String(16),nullable=False)
    password = db.Column(db.String(16),nullable=False)