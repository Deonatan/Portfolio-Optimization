# Flask modules import
from flask import Blueprint, request, make_response, jsonify

# Local modules import
from app.middleware import validate_file_upload
from app.extensions import db

# Other modules import
from http import HTTPStatus
import csv
import io

ingestor_bp = Blueprint('ingestor', __name__, url_prefix='/ingestor')

@ingestor_bp.route('/', methods=['POST'])
@validate_file_upload
def ingest():
    # Get uploaded file 
    f = request.files.get('file')

    try:
        # Read uploaded file using csv reader
        stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
        csv_input = csv.reader(stream)

        # Ingest data from csv to rds
        # datas = []
        for row in csv_input:
            print(row)
            # data.append(object)
        
        #db.session.bulk_save_objects(data)
        #db.session.commit()

    except Exception as e:
        return make_response(jsonify(
            {"message": e}
        ), HTTPStatus.BAD_REQUEST)

    return make_response(jsonify(
                {"message": "Success!"}
            ), HTTPStatus.OK)