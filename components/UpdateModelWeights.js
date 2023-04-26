import { put } from "utils/api";
import FrinksButton from "./FrinksButton";

const UpdateAll = () => {
    const updateFunc = async () => {
        await put('/api/configuration/update-weights');
        location.replace('/');
    }

    return (
        <div className="center">
            <p className="update-scope">
                Updates all weight files
            </p>
            <FrinksButton text="Update Weights" onClick={updateFunc} />
        </div>
    )
}

export default UpdateAll;