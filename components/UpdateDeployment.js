import FrinksButton from "./FrinksButton";

const UpdateAll = () => {
    const updateFunc = async () => {
        console.log('UpdateAll');
    }

    return (
        <div className="center">
            <p className="update-scope">
                Updates all values by fetching info from AWS and form and restarts necessary modules
            </p>
            <FrinksButton text="Update All" onClick={updateFunc} />
        </div>
    )
}

export default UpdateAll;