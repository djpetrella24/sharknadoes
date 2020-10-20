from flask import Flask, jsonify
from sqlalchemy import inspect
import sqlalchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import numpy as np
from sqlalchemy import create_engine, func
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import select

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///shark_attacks")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Shark_Attacks = Base.classes.shark_attacks
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )

@app.route("/types")
def types():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Shark_Attacks.type).all()

    session.close()

    # Convert list of tuples into normal list
    all_types = list(np.ravel(results))

    return jsonify(all_types)

if __name__ == '__main__':
    app.run(debug=True)