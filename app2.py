from flask import Flask, jsonify
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

#################################################
# Database Setup
#################################################


# class Shark_Attacks(Base):
#     __tablename__ = 'shark_attacks'
#     Id = Column(primary_key=True)
#     Year = Column(Integer)
#     Type = Column(String(255))
#     Country = Column(String(255))
#     Area = Column(String(255))
#     Activity = Column(String(255))
#     Fatal = Column(String(1))
#     Species = Column(String(255))

database_path = "shark_attacks.sqlite"
engine = create_engine(f"sqlite:///{database_path}")
# Base.metadata.create_all(engine)
Base = automap_base()
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
SharkAttacks = Base.classes.shark_attacks


#################################################
# Flask Setup
#################################################

app = Flask(__name__)
# print all locations of shark attacks
# attacks = session.query(Sharks) 

@app.route("/")
def welcome():
    # Session = sessionmaker(bind=engine)
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


        # table = m.tables['shark_attacks']
        # select_statement = select([table])
        # conn = engine.connect()
        # res = conn.execute(select_statement)
        # arr = []
        # for row in res:
        #     arr.append(row)
        # # return jsonify(arr)
        # print(arr)
        # # json_arr = jsonify(arr)
        # # y = json.dumps(arr)
        # # print(y)

#################################################
# Flask Routes
#################################################

# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/names<br/>"
#         f"/api/v1.0/passengers"
#     )

# @app.route("/types")
# def types():

if __name__ == '__main__':
    app.run(debug=True)
