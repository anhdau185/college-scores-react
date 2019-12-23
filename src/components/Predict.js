import React from 'react';
import CustomTypeahead from './CustomTypeahead';
import MessageBox from './MessageBox';
import api from '../api';
import { currentYear, futureYears } from '../values';

class Predict extends React.Component {
    constructor(props) {
        super(props);

        this.controlProps = {
            selectCollege: 'selectCollegePredict',
            selectMajor: 'selectMajorPredict',
            selectYear: 'selectYearPredict'
        };
        this.nameSeparator = ' - ';
        this.inputChangeTimer = 0;
        this.inputChangeTimeout = 800;

        this.handleCollegeInputChange = this.handleCollegeInputChange.bind(this);
        this.handleSelectCollege = this.handleSelectCollege.bind(this);
        this.handleSelectMajor = this.handleSelectMajor.bind(this);
        this.handleSelectYear = this.handleSelectYear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMessageBoxClose = this.handleMessageBoxClose.bind(this);

        // Initial state for the component
        this.state = {
            selectDisabled: {
                college: false,
                major: true
            },
            fetchedColleges: [],
            fetchedMajors: [],
            fetchedYears: futureYears,
            selectedCollege: null,
            selectedMajor: null,
            selectedYears: [],
            prediction: [],
            errorMessageBox: {
                show: false,
                message: ''
            }
        };
    }

    processData(raw) {
        console.log(raw.body);
        return raw.body;
    }

    handleCollegeInputChange(input) {
        clearTimeout(this.inputChangeTimer);
        this.inputChangeTimer = setTimeout(
            () => {
                if (input.length >= 3) {
                    api.findCollegesByName(input)
                        .then(response => {
                            const fetchedColleges = response.body.slice(0, 15);
                            this.setState({ fetchedColleges });
                        })
                        .catch(error => console.log(error));
                }
            },
            this.inputChangeTimeout
        );
    }

    handleSelectCollege(collegeArray) {
        if (collegeArray.length) {
            const selectedString = collegeArray[0];
            const separatorPosition = selectedString.indexOf(this.nameSeparator);
            const collegeCode = selectedString.substring(0, separatorPosition);
            const selectedCollege = this.state.fetchedColleges.find(item => item.code === collegeCode);

            //fetch latest majors of the selected college
            api.getMajorScoresFromCollege({
                collegeCode: selectedCollege.code,
                years: [currentYear]
            })
                .then(response => {
                    const fetchedMajors = response.body.majors[0].majors.map(
                        ({ majorCode: code, majorName: name, groupCode }) => ({ code, name, groupCode })
                    );

                    this.setState({
                        selectDisabled: {
                            college: false,
                            major: false
                        },
                        selectedCollege,
                        fetchedMajors
                    });
                })
                .catch(error => console.log(error));
        } else {
            this.setState({
                selectDisabled: {
                    college: false,
                    major: true
                },
                selectedCollege: null,
                fetchedMajors: [],
                selectedMajor: null
            });
        }
    }

    handleSelectMajor(majorArray) {
        let selectedMajor;

        if (majorArray.length) {
            const selectedString = majorArray[0];
            const separatorPosition = selectedString.indexOf(this.nameSeparator);
            const majorCode = selectedString.substring(0, separatorPosition);
            selectedMajor = this.state.fetchedMajors.find(item => item.code === majorCode);
        } else {
            selectedMajor = null;
        }

        this.setState({ selectedMajor });
    }

    handleSelectYear(selectedYears) {
        this.setState({ selectedYears: selectedYears.map(item => parseInt(item)) });
    }

    handleSubmit() {
        const { selectedCollege, selectedMajor, selectedYears } = this.state;

        if (!selectedCollege) {
            this.setState({
                errorMessageBox: {
                    show: true,
                    message: 'Vui lòng chọn một trường.'
                }
            });
            return;
        }

        if (!selectedMajor) {
            this.setState({
                errorMessageBox: {
                    show: true,
                    message: 'Vui lòng chọn một ngành của trường đã chọn.'
                }
            });
            return;
        }

        if (!selectedYears.length) {
            this.setState({
                errorMessageBox: {
                    show: true,
                    message: 'Vui lòng chọn ít nhất một năm.'
                }
            });
            return;
        }

        const guessDTO = {
            collegeCode: selectedCollege.code,
            majorCode: selectedMajor.code,
            years: selectedYears
        };

        api.predictMajorScore(guessDTO)
            .then(response => {
                const prediction = this.processData(response);
                this.setState({ prediction });
            })
            .catch(error => console.log(error));
    }

    handleMessageBoxClose() {
        this.setState({
            errorMessageBox: {
                show: false,
                message: ''
            }
        });
    }

    componentDidMount() {
        api.getAllColleges()
            .then(response => {
                const fetchedColleges = response.body.slice(0, 10);
                this.setState({ fetchedColleges });
            })
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
                    <div className="row">
                        <div className="col-12 p-4">
                            <div style={{ margin: '-8px' }}>
                                <form>
                                    <div className="form-row p-2">
                                        <div className="form-group col-4 d-flex align-items-center my-0">
                                            Chọn trường ĐH-CĐ:
                                        </div>
                                        <div className="form-group col-8 d-flex align-items-center my-0">
                                            <CustomTypeahead
                                                id={this.controlProps.selectCollege}
                                                options={this.state.fetchedColleges.map(({ code, name }) => code + this.nameSeparator + name)}
                                                disabled={this.state.selectDisabled.college}
                                                handleInputChange={this.handleCollegeInputChange}
                                                handleSelect={this.handleSelectCollege}
                                                placeholder="Chọn một trường..."
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="form-group col-4 d-flex align-items-center my-0">
                                            Chọn ngành:
                                        </div>
                                        <div className="form-group col-8 d-flex align-items-center my-0">
                                            <CustomTypeahead
                                                id={this.controlProps.selectMajor}
                                                options={this.state.fetchedMajors.map(({ code, name }) => code + this.nameSeparator + name)}
                                                disabled={this.state.selectDisabled.major}
                                                handleSelect={this.handleSelectMajor}
                                                placeholder="Chọn một ngành..."
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="form-group col-4 d-flex align-items-center my-0">
                                            Chọn năm trong tương lai:
                                        </div>
                                        <div className="form-group col-8 d-flex align-items-center my-0">
                                            <CustomTypeahead
                                                id={this.controlProps.selectYear}
                                                options={this.state.fetchedYears.map(item => item.toString())}
                                                multiple={true}
                                                handleSelect={this.handleSelectYear}
                                                placeholder="Chọn một hoặc nhiều năm..."
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <button
                                            className="btn btn-primary mx-auto"
                                            type="button"
                                            style={{ width: '20%' }}
                                            onClick={this.handleSubmit}
                                        >
                                            Tra cứu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <MessageBox
                    show={this.state.errorMessageBox.show}
                    message={this.state.errorMessageBox.message}
                    handleClose={this.handleMessageBoxClose}
                />
            </div>
        );
    }
}

export default Predict;
