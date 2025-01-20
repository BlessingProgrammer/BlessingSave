import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {resetTiktokPostUrlState} from "../redux/slices/tiktokSlice";
import DownloadButton from "./DownloadButton";
import DownloadTitle from "./DownloadTitle";
import {randomFilename} from "../utils/randomFilename";
import axiosClient from "../network/axiosClient.ts";
import {resetInstagramPostUrlState} from "../redux/slices/instagramSlice.ts";
import {apiUrl} from "../utils/apiUrl.ts";

interface Props {
    page?: string
}

const handleDownload = async (
    page: string,
    url: string,
    filename: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setIsLoading(true);
        if (page === "ig") {
            const response = await axiosClient.get(`/download/${url}`, {
                responseType: 'blob'
            });

            if (response.status === 200) {
                const blob = new Blob([response.data], {type: response.data.type});

                const downloadUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            } else {
                console.error('Failed to download file:', response.status);
            }
        } else {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        }
    } catch (error) {
        console.error("Download failed:", error);
    } finally {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
};

interface DownloadItemProps {
    page: string;
    title: string;
    url: string;
    filename: string;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadItem: React.FC<DownloadItemProps> = ({page, title, url, filename, isLoading, setIsLoading}) => (
    <div className="h-full w-full flex justify-between items-center space-x-5">
        <div className={"w-full border-e-2 border-blue-500"}>
            <DownloadTitle title={title}/>
        </div>
        <DownloadButton
            isLoading={isLoading}
            onClick={async () => await handleDownload(page, url, filename, setIsLoading)}/>
    </div>
);

const DownloadContainer: React.FC<Props> = ({page}) => {
    const dispatch = useDispatch<AppDispatch>();

    const pageType = page || "";

    const [isLoadingThumbnail, setIsLoadingThumbnail] = useState<boolean>(false);
    const [isLoadingMusic, setIsLoadingMusic] = useState<boolean>(false);
    const [isLoadingHd, setIsLoadingHd] = useState<boolean>(false);
    const [isLoadingFullHd, setIsLoadingFullHd] = useState<boolean>(false);

    let data, resetUrlState;

    if (page === "ig") {
        data = useSelector((state: RootState) => state.instagram.data);
        resetUrlState = () => dispatch(resetInstagramPostUrlState());
    } else {
        data = useSelector((state: RootState) => state.tiktok.data);
        resetUrlState = () => dispatch(resetTiktokPostUrlState());
    }

    const handleDownloadMore = () => {
        resetUrlState();
        window.scrollTo(0, 0);
    }

    return (
        <div className={"mx-0.5 sm:mx-0 py-10 sm:px-4 md:px-6 lg:px-10"}>
            {data ? (
                <div
                    className="w-full h-[500px] flex flex-col md:flex-row items-center justify-center md:justify-between md:space-x-32">
                    <div className="w-full h-36 sm:h-56 shadow rounded-lg bg-gray-50 p-2.5">
                        <img
                            src={data?.thumbnail && page === "ig" ? `${apiUrl}/downloads/${data.thumbnail}` : data.thumbnail || ""}
                            alt={data?.thumbnail ? "Thumbnail" : "No Thumbnail Available"}
                            className="w-28 sm:w-48 h-full rounded-lg object-cover"
                        />
                    </div>

                    <div
                        className="w-full h-56 shadow rounded-lg bg-gray-50 p-2.5 flex flex-col items-center space-y-2.5 mt-8 md:mt-0">
                        {
                            data.thumbnail && <DownloadItem
                                page={pageType}
                                title="Thumbnail"
                                url={data.thumbnail}
                                filename={randomFilename("Thumbnail", "jpg")}
                                isLoading={isLoadingThumbnail}
                                setIsLoading={setIsLoadingThumbnail}
                            />
                        }
                        {
                            data.music && <DownloadItem
                                page={pageType}
                                title="Mp3 Music"
                                url={data.music}
                                filename={randomFilename("Mp3", "mp3")}
                                isLoading={isLoadingMusic}
                                setIsLoading={setIsLoadingMusic}
                            />
                        }
                        {
                            data.hd && <DownloadItem
                                page={pageType}
                                title="HD Video"
                                url={data.hd}
                                filename={randomFilename("Hd", "mp4")}
                                isLoading={isLoadingHd}
                                setIsLoading={setIsLoadingHd}
                            />
                        }
                        {
                            data.full_hd && <DownloadItem
                                page={pageType}
                                title="Full HD Video"
                                url={data.full_hd}
                                filename={randomFilename("FullHd", "mp4")}
                                isLoading={isLoadingFullHd}
                                setIsLoading={setIsLoadingFullHd}
                            />
                        }
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
            <button
                onClick={handleDownloadMore}
                className={"w-full mt-10"}>
                <a
                    href={page === "ig" ? "/ig" : "/"}
                    className={"h-full bg-gray-100 text-blue-500 rounded-full p-2 flex justify-center items-center shadow-sm hover:bg-blue-500 hover:text-white"}>
                    Download more
                </a>
            </button>
        </div>
    );
};

export default DownloadContainer;
