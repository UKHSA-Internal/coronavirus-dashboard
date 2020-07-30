// @flow

import React from "react";
import { PrismLight as CodeBoxBase } from 'react-syntax-highlighter';

import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import r from 'react-syntax-highlighter/dist/esm/languages/prism/r';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

import { CodeBoxStyles } from "./CodeBox.styles"

import type { ComponentType } from "react";


CodeBoxBase.registerLanguage('bash', bash);
CodeBoxBase.registerLanguage('javascript', javascript);
CodeBoxBase.registerLanguage('python', python);
CodeBoxBase.registerLanguage('r', r);


const CodeBox: ComponentType<*> = ({ language=null, ...props }) => {

    return <CodeBoxBase style={ CodeBoxStyles }
                        language={ language }
                        showLineNumbers={ !!language }
                        { ...props }/>

};  // CodeBox


export default CodeBox;
