import React, { ChangeEvent, FC, useRef } from 'react';

interface UploadFileProps {
    setFile: Function
    accept: string
}

export const UploadFile: FC<UploadFileProps> = ({ children, accept, setFile }) => {
    const input = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
    }

    return (
        <div onClick={() => input.current?.click()}>
            <input
                onChange={handleChange}
                type="file"
                accept={accept}
                ref={input}
                style={{ display: 'none' }}
            />
            {children}
        </div>
    )
}
