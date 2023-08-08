import ReactLoading from "react-loading";
import React from "react";
const Loading = () => {
    console.log("inside loading");
    return(
        <div  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={50}
            />
        </div>
    )
}

export default Loading;