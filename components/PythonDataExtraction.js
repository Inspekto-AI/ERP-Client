import { put } from "utils/api";
import FrinksButton from "./FrinksButton";

const PythonDataExtraction = ({ dataExtractionStatus, setDataExtractionStatus }) => {
    const updateFunc = async () => {
        const res = await put('/api/configuration/data-extraction');
        setDataExtractionStatus(res?.data?.data["data-extraction"]);
    }

    return (
        <div className="center">
            <p className="update-scope">
                Enables data extraction in python for model training
            </p>
            {dataExtractionStatus && (<p className="update-scope" style={{ color: 'red' }} >
                ** Data extraction enabled **
            </p>)}
            <FrinksButton text={dataExtractionStatus ? ("Disable data extraction") : ("Enable data extraction")} onClick={updateFunc} />
        </div>
    )
}

export default PythonDataExtraction;