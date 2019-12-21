import React from 'react';

class ScorePanel extends React.Component {
    renderTable() {
        const { scores } = this.props;

        if (scores && scores.collegeCode) {
            return this.renderMajorScores();
        } else if (scores && scores.majorCode) {
            return this.renderCollegeScores();
        }

        return <div>No valid data to display.</div>;
    }

    renderMajorScores() {
        const { collegeCode, collegeName, majors } = this.props.scores;
        console.log(collegeCode, collegeName, majors);

        return (
            <div>Displaying major scores of the college...</div>
        );
    }

    renderCollegeScores() {
        const { majorCode, majorName, colleges } = this.props.scores;
        console.log(majorCode, majorName, colleges);

        return (
            <div>Displaying scores of the major across colleges...</div>
        );
    }

    render() {
        return (
            <div className="score-panel">
                {this.renderTable()}
            </div>
        );
    }
}

export default ScorePanel;
