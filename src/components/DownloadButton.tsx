import React from "react";
import {MdOutlineFileDownload} from "react-icons/md";
import Loading from "./Loading";

interface Props {
    isLoading: boolean;
    onClick: () => void;
}

const DownloadButton: React.FC<Props> = ({isLoading, onClick}) => {
    return (
        <button
            className={`w-24 p-2 text-white flex justify-center shadow-sm bg-blue-500 sm:hover:bg-rose-600 rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700`}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? <Loading/> : <MdOutlineFileDownload className={"w-5 h-5 me-1"}/>}
        </button>
    )
}

export default DownloadButton;
