import React from 'react';
import Radio from './Radio';
import Select from './Select';
import api from '../api';

class EntranceScore extends React.Component {
    constructor(props) {
        super(props);

        this.controlProps = {
            radioName: 'radioScore',
            radioCollege: 'radioCollege',
            radioMajor: 'radioMajor',
            selectCollege: 'selectCollege',
            selectMajor: 'selectMajor',
            selectYear: 'selectYear'
        };

        this.handleRadioClick = this.handleRadioClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAddYear = this.handleAddYear.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);

        // Initial state for the component
        this.state = {
            radioChecked: {
                college: true,
                major: false
            },
            selectDisabled: {
                college: false,
                major: true
            },
            fetchedColleges: ['Select college', '1', '2', '3'],
            fetchedMajors: ['Select major', '4', '5', '6'],
            fetchedYears: ['Select year', '2015', '2016', '2017', '2018', '2019'],
            selectedCollege: null,
            selectedMajor: null,
            selectedYear: null,
            selectedYears: []
        };
    }

    handleRadioClick(radioId) {
        if (radioId === this.controlProps.radioCollege) {
            this.setState(
                {
                    radioChecked: {
                        college: true,
                        major: false
                    },
                    selectDisabled: {
                        college: false,
                        major: true
                    }
                }
            );
        } else if (radioId === this.controlProps.radioMajor) {
            this.setState(
                {
                    radioChecked: {
                        college: false,
                        major: true
                    },
                    selectDisabled: {
                        college: true,
                        major: false
                    }
                }
            );
        }
    }

    handleSelect(elementId, selectedValue) {
        const { selectCollege, selectMajor, selectYear } = this.controlProps;
        switch (elementId) {
            case selectCollege:
                this.setState({ selectedCollege: selectedValue });
                break;
            case selectMajor:
                this.setState({ selectedMajor: selectedValue });
                break;
            case selectYear:
                this.setState({ selectedYear: selectedValue });
                break;
            default:
        }
    }

    handleAddYear() {
        const yearToAdd = this.state.selectedYear;
        if (yearToAdd
            && !isNaN(yearToAdd)
            && this.state.selectedYears.findIndex(year => year === yearToAdd) === -1) {
            this.setState(
                oldState => ({ selectedYears: oldState.selectedYears.concat(yearToAdd) }),
                () => console.log('Successfully updated years!', this.state.selectedYears)
            );
        }
    }

    handleSubmitForm() { }

    componentDidMount() {
        //Data fetching is done here
        api.findCollegesByName('cntt')
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h6>Search</h6>
                    </div>
                    <div className="row" >
                        <div className="col-4 p-3" style={{ backgroundColor: '#9999ff' }}>
                            <div style={{ margin: '-8px' }}>
                                <form>
                                    <div className="form-row p-2">
                                        <div className="form-group col-6 d-flex align-items-center my-0">
                                            <Radio
                                                label="By college"
                                                name={this.controlProps.radioName}
                                                id={this.controlProps.radioCollege}
                                                checked={this.state.radioChecked.college}
                                                handleRadioClick={this.handleRadioClick}
                                            />
                                        </div>
                                        <div className="form-group col-6 d-flex align-items-center my-0">
                                            <Select
                                                id={this.controlProps.selectCollege}
                                                values={this.state.fetchedColleges}
                                                disabled={this.state.selectDisabled.college}
                                                handleSelect={this.handleSelect}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="form-group col-6 d-flex align-items-center my-0">
                                            <Radio
                                                label="By major"
                                                name={this.controlProps.radioName}
                                                id={this.controlProps.radioMajor}
                                                checked={this.state.radioChecked.major}
                                                handleRadioClick={this.handleRadioClick}
                                            />
                                        </div>
                                        <div className="form-group col-6 d-flex align-items-center my-0">
                                            <Select
                                                id={this.controlProps.selectMajor}
                                                values={this.state.fetchedMajors}
                                                disabled={this.state.selectDisabled.major}
                                                handleSelect={this.handleSelect}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="form-group col-8 d-flex align-items-center my-0">
                                            <Select
                                                id={this.controlProps.selectYear}
                                                values={this.state.fetchedYears}
                                                handleSelect={this.handleSelect}
                                            />
                                        </div>
                                        <div className="form-group col-4 d-flex align-items-center my-0">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                style={{ width: '100%' }}
                                                onClick={this.handleAddYear}
                                            >
                                                Add year
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <button className="btn btn-primary mx-auto" type="submit" style={{ width: '33%' }}>
                                            Go!
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-8" style={{ backgroundColor: '#ff6666' }}>
                            <div>
                                <p>sdsd</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default EntranceScore;
