import { put } from "utils/api";
import FrinksButton from "./FrinksButton";

const UpdateDatabase = () => {
    const updateFunc = async () => {
        await put('/api/configuration/update-database');
        location.replace('/');
    }

    return (
        <div className="center">
            <p className="update-scope">
                Updates database values by fetching info from AWS and restarts necessary modules
            </p>
            <FrinksButton text="Update Database" onClick={updateFunc} />
        </div>
    )
}

export default UpdateDatabase;