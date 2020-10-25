# Import dependencies
from flask import Flask, jsonify, render_template
from sqlalchemy import inspect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import select
import json

#Create DB path

database_path = "shark_attacks.sqlite"
engine = create_engine(f"sqlite:///{database_path}")
Base = automap_base()
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
SharkAttacks = Base.classes.shark_attacks

# Flask Setup

app = Flask(__name__)

@app.route("/")
def init():
    return render_template("index.html")

@app.route("/data")
def data():

    session = Session(engine)
    results = session.query(SharkAttacks.id, SharkAttacks.year, SharkAttacks.type, SharkAttacks.country, 
    SharkAttacks.area, SharkAttacks.activity, SharkAttacks.fatal, SharkAttacks.species).all()
    session.close()
    # for result in results:
    #     print(result.species)
    # data = list(np.ravel(results))
        # Create a dictionary from the row data and append to a list of all_passengers
    all_sharks = []
    for id, year, type, country, area, activity, fatal, species in results:
        shark_dict = {}
        shark_dict["id"] = id
        shark_dict["year"] = year
        shark_dict["type"] = type
        shark_dict["country"] = country
        shark_dict["area"] = area
        shark_dict["activity"] = activity
        shark_dict["fatal"] = fatal
        shark_dict["species"] = species
        all_sharks.append(shark_dict)
        
    return jsonify(all_sharks)


if __name__ == '__main__':
    app.run(debug=True)
