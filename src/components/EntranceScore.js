import React from 'react';
import { RadioGroup } from './common/RadioGroup';
import { DropDown } from './common/DropDown';
export class EntranceScore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{ backgroundColor: '#F10' }}>
                        <h4>Search</h4>
                    </div>
                    <div className="row" >
                        <div className="col-4" style={{ backgroundColor: '#9999ff' }}>
                            
                                <div className="d-flex">
                                    <div style={{flex:'0 0 50%'}}>
                                        <RadioGroup/>
                                    </div>
                                    <div>
                                        <DropDown/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div style={{flex:'0 0 50%'}}>
                                        <RadioGroup/>
                                    </div>
                                    <div>
                                        <DropDown/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div style={{flex:'0 0 50%'}}>
                                        <DropDown/>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary">Add year</button>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div style={{flex:'0 0 50%'}}>
                                        <label>Năm đã chọn: </label>
                                    </div>
                                    <div>
                                        
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary">OK</button>
                                
                            
                        </div>
                        <div className="col-8" style={{ backgroundColor: '#ff6666' }}>
                            <div>
                                <p>sdsd</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}