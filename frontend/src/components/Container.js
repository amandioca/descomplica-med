import React from 'react';
import '../styles/Container.css'

const Container = ({ children }) => {
    return (
        <div className='container-forms'>
            <div className='scroll-content'>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container