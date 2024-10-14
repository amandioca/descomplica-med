import React from 'react';
import '../styles/FileMessageBox.css'
import mockFile from '../tests/__mocks__/files/file-mock.jpg';
import fileText from '../assets/svgs/file-text.svg'

const FileMessageBox = ({ file }) => {
    const fileType = file.type;

    return (
        <div>

            {file.type === 'application/pdf' && (
                <div className='container-file text-file'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='box-icon'>
                            <img src={fileText} alt='ícone de clipe de papel' height='32'></img>
                        </div>
                        <div className='file-details'>
                            <span>
                                {file.name}
                            </span>
                            <span>
                                {file.type.split('/').pop().toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            {(fileType.startsWith('image/')) && (
                <div className='container-file'>
                    <div style={{ overflow: 'hidden' }}>
                        <div className='image-file'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={URL.createObjectURL(file)} alt={file.name} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default FileMessageBox;