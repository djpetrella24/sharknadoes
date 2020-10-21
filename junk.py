# engine = create_engine(f"sqlite:///sharkattacks_db")

Base = declarative_base()
# Create Database Connection
database_path = "sharkattacks_db"
engine = create_engine(f"sqlite:///{database_path}")
conn = engine.connect()
# Base.prepare(engine, reflect=True)

# Type = Base.classes.type


# Create Shark Attack Classes
# ----------------------------------
class Shark_Attacks (Base):
    __tablename__ = 'shark_attacks'
    year = Column(Integer, primary_key=True)
    type = Column(String(255))
    country = Column(String(255))
    area = Column(String(255))
    activity = Column(String(255))
    fatal = Column(String(1))
    species = Column(String(255))

# Reflect the tables
# Base.prepare(engine, reflect=True)


Base.metadata.create_all(engine)
session = Session(bind=engine)

app = Flask(__name__)

m = MetaData()
m.reflect(engine)
conn = engine.connect()
# Routes


@app.route("/")
def homepage():
    print("Server received request for Home Page")
    return "Sharknadoes Home Page!"
    engine = create_engine(db_uri)
    metadata = MetaData(engine)
    metadata.reflect()
    table = metadata.tables["events"]
    Session = sessionmaker(bind=engine)
    session = Session()
    session.query(table).all()


@app.route("/attack/activity")
def attackActivity():
    # Create session (link) from Python to the DB
    table = m.tables['shark_attacks']
    # results = session.query(Shark_Attacks.Activity).all()
    select_statement = select([table])
    res = conn.execute(select_statement)
    test_dict = []
    for index, year, type, country, area, Activity, Fatal, Species in res:
        dict = {}
        dict["index"] = index
        dict["year"] = year
        dict["type"] = type
        dict["country"] = country
        dict["area"] = area
        dict["Activity"] = Activity
        dict["Fatal"] = Fatal
        dict["Species "] = Species
        test_dict.append(dict)
        # Return the jsonified result.
        return jsonify(test_dict)

# @app.route("/type")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Type.type).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))

#     return jsonify(all_names)

        # return jsonify(res)
if __name__ == '__main__':
    app.run(debug=True)
