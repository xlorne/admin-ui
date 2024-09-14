import React from "react";

const NotFount = () => {
    window.document.title = '404 Not Found';

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '50px',
            }}
        >
            <h3>Error 404 ,Page Not Found</h3>
        </div>
    )
}

export default NotFount;
