import type { LookupDataType } from "../components/DashboardHeader/DashboardHeader.types";
import axios from "axios";
import URLs from "common/urls";


const useLookupTable = (): LookupDataType | null => {

    const [ lookupTable, setLookupTable ] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(
                'lookupTable_bothWay_v2.json',
                { baseURL: URLs.lookups }
                );

            setLookupTable(data)
        }

        getData()

    }, []);

    return lookupTable

};  // GetLookup


export default useLookupTable;
