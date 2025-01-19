import React from 'react'
import SubmitForm from "./SubmitForm";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import DownloadContainer from "./DownloadContainer.tsx";

interface Props {
    lang: string;
    formTitle: string;
    page?: string;
    formDescription: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const Container: React.FC<Props> = ({
                                        lang,
                                        formTitle,
                                        page,
                                        formDescription,
                                        formPlaceholder,
                                        formPasteButtonTitle,
                                        formClearButtonTitle,
                                        formSubmitButtonTitle,
                                    }) => {
    let data;
    if (page === "ig") {
        data = useSelector((state: RootState) => state.instagram.data);
    } else {
        data = useSelector((state: RootState) => state.tiktok.data);
    }

    return (
        <div>
            {
                data ? <DownloadContainer page={page}/>
                    : <SubmitForm
                        lang={lang}
                        title={formTitle}
                        page={page}
                        instructions={formDescription}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>
            }
        </div>
    )
}

export default Container;
