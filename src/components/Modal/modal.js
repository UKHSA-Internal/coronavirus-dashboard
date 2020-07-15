// @flow
import 'react-app-polyfill/ie11';

import React, { useState, useEffect, useRef } from "react";
import FocusTrap from "react-focus-trap";

import useModalData from "hooks/useModalData";
import { strFormat } from "common/utils";
import Loading from "components/Loading";

import {
    ModalContainer,
    ModalContent,
    ModalOpener,
    Markdown,
    ModalCloser
} from "./modal.styles";


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
            setModalStatus(true);
    };

    const onClickAway = ({ target }) => {
        if ( modalRef.current && target.className === modalRef.current.className && modalStatus )
            setModalStatus(false);
    };

    useEffect(() => {

        document.addEventListener("keyup", handleKeyPressEvent);
        document.addEventListener("click", onClickAway);

        const htmlElm = document.querySelector('html').classList;

        modalStatus
            ? htmlElm.add(['u-lock-scroll'])
            : htmlElm.toggle('u-lock-scroll');

        return () => {
            document.removeEventListener("keyup", handleKeyPressEvent);
            document.removeEventListener("click", onClickAway);
        }

    });

    return <>
        <ModalOpener { ...props }
                     area-label={ "Open dialogue" }
                     onClick={ () => setModalStatus(true) }
                     children={ children }/>

        {
            modalStatus &&
            <FocusTrap activate initialFocus={ "#close-modal" }>
                <ModalContainer ref={ modalRef }
                                className={ 'modal' }
                                area-modal={ true }
                                tabIndex={ -1 }
                                aria-label={ "Additional information" }
                                role={ 'alertdialog' }>
                    <ModalContent id={ "modal-body" }>
                        <Modal markdownPath={ markdownPath } replacements={ replacements }/>
                        <ModalCloser className={ "govuk-button" }
                                     id={ "close-modal" }
                                     area-label={ "Close dialogue" }
                                     onClick={ () => setModalStatus(false) }>
                            Continue
                        </ModalCloser>
                    </ModalContent>
                </ModalContainer>
            </FocusTrap>
        }

    </>

}; // ModalTooltip


export default ModalTooltip;
