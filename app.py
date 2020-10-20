from flask import Flask, jsonify
from sqlalchemy import inspect
import sqlalchemy
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData
from sqlalchemy.orm import Session
#Base = declarative_base()


engine = create_engine(f"sqlite:///sharkattacks_db")

Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)
​
# Save reference to the table
Shark_Attacks = Base.classes.shark_attacks
​
session = Session(engine)
###############################################################
​
# Flask Setup
app = Flask(__name__)
​
# Flask Routes


@app.route("/")
def homepage():
    print("Server received request for Home Page")
    return "Sharknadoes Home Page!"


# @app.route("/attack/activity")
# def attackActivity():
#     # Create session (link) from Python to the DB
#     session = Session(engine)
​
#     # Query all attacks
#     results = session.query(Shark_Attacks.Activity).all()
​
#     session.close()
​
​
if __name__ == '__main__':
    app.run(debug=True)


​

