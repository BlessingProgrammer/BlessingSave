import React from "react";

interface Props {
    title: string;
}

const DownloadTitle: React.FC<Props> = ({title}) => {
    return (
        <h2 className={`text-blue-500 font-bold text-sm xl:text-xl`}>{title}</h2>
    )
}

export default DownloadTitle;
