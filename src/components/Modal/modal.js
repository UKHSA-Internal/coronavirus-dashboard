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

    return <Markdown role={ "article" }
                     aria-label={ "Additional information" }
                     dangerouslySetInnerHTML={{ __html: strFormat(data, replacements) }}/>

}; // Modal


const  ModalTooltip = ({ markdownPath, children, replacements={}, ...props }) => {

    const
        [ modalStatus, setModalStatus ] = useState(false),
        modalRef = useRef(null);

    const handleKeyPressEvent = event => {

        // Escape key: 27
        if ( modalRef.current && event.keyCode === 27 )
            setModalStatus(false);

    };

    const onKeyUpOpener = event => {

        event.preventDefault();

        if ( event.key === 'Enter' || event.key === ' ' )
            setModalStatus(true);

    }

    const onClickAway = ({ target }) => {

        if ( modalRef.current && target.className === modalRef.current.className && modalStatus )
            setModalStatus(false);

    };

    useEffect(() => {

        document.addEventListener("keyup", handleKeyPressEvent);
        document.addEventListener("click", onClickAway);

        const htmlElm = document.querySelector('html').classList;

        modalStatus
            ? htmlElm.add('u-lock-scroll')
            : htmlElm.remove('u-lock-scroll');

        return () => {
            document.removeEventListener("keyup", handleKeyPressEvent);
            document.removeEventListener("click", onClickAway);
        }

    });

    return <>
        <ModalOpener aria-label={ "Open dialogue for additional information" }
                     onClick={ () => setModalStatus(true) }
                     onKeyPress={ onKeyUpOpener }
                     children={ children }
                     { ...props }/>
        {
            !modalStatus
                ? null
                : <ModalContainer>
                    <FocusTrap className={ 'modal' }>
                        <ModalContent id={ "modal-body" }
                                      aria-modal={ true }
                                      ref={ modalRef }
                                      role={ "alertdialog" }
                                      className={ 'modal' }
                                      aria-label={ "Modal dialogue" }>
                            <Modal markdownPath={ markdownPath }
                                   replacements={ replacements }/>
                            <ModalCloser className={ "govuk-button" }
                                         id={ "close-modal" }
                                         role={ "button" }
                                         aria-label={ "Close dialogue" }
                                         onClick={ () => setModalStatus(false) }>
                                Continue
                            </ModalCloser>
                        </ModalContent>
                    </FocusTrap>
                </ModalContainer>
        }
    </>

}; // ModalTooltip


export default ModalTooltip;
