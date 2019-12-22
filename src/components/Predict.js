import React from 'react';
import api from '../api';

class Predict extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        api.predictMajorScore({
            collegeCode: 'QSC',
            majorCode: '7480101',
            years: [2020, 2021]
        })
            .then(response => console.log(response.body))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 p-4">
                            <h3 className="m-0">Dự đoán điểm chuẩn</h3>
                        </div>
                    </div>
                    <div className="row"></div>
                </div>
            </div>
        );
    }
}

export default Predict;
