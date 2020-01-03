import React from 'react';
import { LineGraph } from './Chart';

const PredictPanel = ({ prediction, recentScores, chartData }) => {
    if (!prediction || !recentScores)
        return null;

    if (typeof prediction === 'string')
        return <div>{prediction}</div>;

    if (!chartData)
        return null;

    const { collegeName, majorName, groupCode, data } = chartData;
    return (
        <div className="predict-panel">
            <div>
                <LineGraph
                    data={data}
                    options={{
                        title: {
                            display: true,
                            text: `Kết quả dự đoán điểm chuẩn ngành ${majorName} của trường ${collegeName} theo khối thi ${groupCode}`,
                            fontSize: 18
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        suggestedMin: 0,
                                        suggestedMax: 30
                                    }
                                }
                            ]
                        },
                        plugins: {
                            datalabels: {
                                display: true,
                                color: 'rgba(0, 0, 0, 1)',
                                anchor: 'end',
                                align: '-45',
                                offset: '-1'
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default PredictPanel;
