import { put } from "utils/api";
import FrinksButton from "./FrinksButton";

const UpdateTmate = () => {
    const updateFunc = async () => {
        await put('/api/configuration/update-tmate');
        location.replace('/');
    }

    return (
        <div className="center">
            <p className="update-scope">
                Updates tmate key
            </p>
            <FrinksButton text="Update Tmate" onClick={updateFunc} />
        </div>
    )
}

export default UpdateTmate;