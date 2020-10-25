import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NoImage() {
    const styles = {
        height: '30rem'
    }
    return (
        <div className="flex flex-col justify-center items-center w-full" style={styles}>
            <FontAwesomeIcon icon="image" size="7x" className="text-custom-blue" />
            <p>NO IMAGE</p>
        </div>
    )
}