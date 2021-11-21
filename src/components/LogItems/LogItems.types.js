export type LogType = {
    date : {
        id:            string,
        date:          string,
        type:          string,
        heading:       string,
        applicable_to: string[]
    }
};


export type LogItemsType = {
    data: LogType[]
};

