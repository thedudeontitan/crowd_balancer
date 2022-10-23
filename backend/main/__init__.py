from flask import Flask
from extensions import DB_NAME,db,SECRET_KEY
import os
from main.models import (
        User,Location,Floor
)

def create_app():

    app = Flask(__name__)
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)

    from main.views import auth,views

    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(auth,url_prefix='/auth/')
       

    create_db(app)


    return app



def create_db(app):

    if not os.path.exists(DB_NAME):
        with app.app_context():
            db.create_all()
        print("database created...")