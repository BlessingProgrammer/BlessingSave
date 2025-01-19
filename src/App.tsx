import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import Container from "./components/Container.tsx";

interface Props {
    lang: string;
    page?: string;
    formTitle: string;
    formDescription: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const App: React.FC<Props> = ({
                                  lang,
                                  page,
                                  formTitle,
                                  formDescription,
                                  formPlaceholder,
                                  formPasteButtonTitle,
                                  formClearButtonTitle,
                                  formSubmitButtonTitle,
                              }) => {
    return (
        <Provider store={store}>
            <div
                className="w-full overflow-hidden">
                    <Container
                        lang={lang}
                        formTitle={formTitle}
                        page={page}
                        formDescription={formDescription}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>

            </div>
        </Provider>
    );
};

export default App;
