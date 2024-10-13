import React from "react";
import '../styles/FileMessageBox.css'
import mockFile from '../tests/__mocks__/files/file-mock.jpg';
import fileText from '../assets/svgs/file-text.svg'

const FileMessageBox = ({ file }) => {

    const mock = new File([mockFile], 'file-mock.jpg', {
        // type: 'image/png',
        // type: 'image/jpeg',
        type: 'image/jpg',
        // type: 'application/pdf',
    });

    return (
        <div>

            {mock.type === 'application/pdf' && (
                <div className='container-file teste'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='box-icon text-file'>
                            <img src={fileText} alt='ícone de clipe de papel' height='32'></img>
                        </div>
                        <div className='file-details'>
                            <span>
                                {mock.name}
                            </span>
                            <span>
                                {mock.type.split('/').pop().toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            {(mock.type === 'image/png' || mock.type === 'image/jpeg' || mock.type === 'image/jpg') && (
                <div className='container-file image-file'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img className='' src={mockFile} alt="teste" />
                        <img src={URL.createObjectURL(mock)} alt={mock.name} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default FileMessageBox;