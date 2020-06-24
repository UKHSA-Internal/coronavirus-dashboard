// @flow

import React, { useState, Fragment } from "react";
import { ModalContainer, ModalContent, ModalOpener, Markdown, ModalCloser } from "./modal.styles";
import useModalData from "hooks/useModalData";
import { strFormat } from "common/utils";
import Loading from "components/Loading";


const Modal = ({ markdownPath, replacements }) => {

    const data = useModalData(markdownPath);

    if ( !data ) return <Loading/>

    return <Markdown dangerouslySetInnerHTML={{ __html: strFormat(data, replacements) }}/>

}; // Modal


const ModalTooltip = ({ markdownPath, children, replacements={}, ...props }) => {

    const
        [ modalStatus, setModalStatus ] = useState(false);

    return <Fragment>
        <ModalOpener { ...props }
                     onClick={ () => setModalStatus(true) }
                     children={ children }/>

        {
            modalStatus && <ModalContainer>
                <ModalContent>
                    <Modal markdownPath={ markdownPath } replacements={ replacements }/>
                    <ModalCloser className={ "govuk-button" }
                                 onClick={ () => setModalStatus(false) }>
                        Continue
                    </ModalCloser>
                </ModalContent>
            </ModalContainer>
        }

    </Fragment>

}; // ModalTooltip


export default ModalTooltip;
