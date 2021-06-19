// @flow

import React  from 'react';

import useGenericAPI from 'hooks/useGenericAPI';

import Loading from "components/Loading";
import ChangeLogComponent from "components/ChangeLogComponent";


const WhatsNew = () => {

    const data = useGenericAPI("changeLogData", [], "json");

    return !data
        ? <Loading/>
        : <ChangeLogComponent data={data?.changeLog ?? []} colours={ data?.colours ?? [] }/>;

}; // ChangeLog


export default WhatsNew;
