import React from 'react';
import '../styles/FileMessageBox.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import mockFile from '../tests/__mocks__/files/file-mock.jpg';
import fileText from '../assets/svgs/file-text.svg'

const FileMessageBox = ({ file, preview, onClose}) => {
    const fileType = file.type;

    return (
        <div>
            {file.type === 'application/pdf' && (
                <div id='txt' className='container-file text-file'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='box-icon padding'>
                            <img src={fileText} alt='ícone de clipe de papel' height='32'></img>
                        </div>
                        <div className={`file-details ${preview ? 'expanded-preview' : ''}`}>
                            <span>
                                {file.name}
                            </span>
                            <span>
                                {file.type.split('/').pop().toUpperCase()}
                            </span>
                        </div>
                        {preview && (
                            <div onClick={onClose} className='close-icon' style={{ alignSelf: 'flex-start' }}>
                                <i class='fa-solid fa-xmark'></i>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {(fileType.startsWith('image/')) && (
                <div id='img' className={`container-file ${preview ? 'gradient-preview' : ''}`}>
                    <div style={{ overflow: 'hidden' }}>
                        <div className='image-file'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {preview && (
                                    <div  onClick={onClose} className='close-icon'>
                                        <i class='fa-solid fa-xmark'></i>
                                    </div>
                                )}
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