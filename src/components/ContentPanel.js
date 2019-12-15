import React from 'react';

const ContentPanel = (props) => {
    return (
        <div>
            Here's the content
            {props.children}
        </div>
    );
};

export default ContentPanel;