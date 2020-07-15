// @flow

import React, { useState, useEffect, useRef } from "react";
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
        [ modalStatus, setModalStatus ] = useState(false),
        modalRef = useRef(null);

    const handleKeyPressEvent = event => {

        // Escape key: 27
        if ( modalRef.current && event.keyCode === 27 )
            setModalStatus(false);

    };

    const onClickAway = ({ target }) => {

        if ( modalRef.current && target.className === modalRef.current.className && modalStatus )
            setModalStatus(false);

    }

    useEffect(() => {

        document.addEventListener("keyup", handleKeyPressEvent);
        document.addEventListener("click", onClickAway)

        return () => {
            document.removeEventListener("keyup", handleKeyPressEvent);
            document.removeEventListener("click", onClickAway);
        }

    });

    return <>
        <ModalOpener { ...props }
                     onClick={ () => setModalStatus(true) }
                     children={ children }/>

        {
            modalStatus &&
            <ModalContainer ref={ modalRef }
                            className={ 'modal' }
                            area-modal={ true }
                            tabIndex={ -1 }
                            aria-label={ "Additional information" }
                            role={ 'alertdialog' }>
                <ModalContent id={ "modal-body" }>
                    <Modal markdownPath={ markdownPath } replacements={ replacements }/>
                    <ModalCloser className={ "govuk-button" }
                                 onClick={ () => setModalStatus(false) }>
                        Continue
                    </ModalCloser>
                </ModalContent>
            </ModalContainer>
        }

    </>

}; // ModalTooltip


export default ModalTooltip;
